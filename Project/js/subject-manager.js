// Truy cap trang

const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

if (!user) {
    window.location.href = './login.html';
}

// Hien thi dropdown
const userBox = document.getElementById('user');
const userInfor = document.getElementById('user-infor');

userBox.addEventListener('click', () => {
    userInfor.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!userBox.contains(e.target)) {
        userInfor.classList.remove('show');
    }
});

// Dang xuat
function logOut() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    window.location.href = './login.html';
}


// Xu li pop-up
const overlayPop = document.getElementById('overlay-pop-up');

function showPopUp() {
    resetForm();
    overlayPop.classList.remove('hidden');
}

function closePopUp() {
    overlayPop.classList.add('hidden');
}

// Xu li modal

const modal = document.getElementById('overlay-modal');

function showModal() {
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}


// Lay du lieu
let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
let editingId = null;
let delId = null;
let isSorted = false;


const title = document.getElementById('pop-up-title');
const subjectsInput = document.getElementById('subject');
const errorSubject = document.getElementById('error-subject');
const radios = document.querySelectorAll('input[name="status"]');
const addBtn = document.getElementById('add-btn');
const tbody = document.getElementById('tbody');
const searchInput = document.getElementById('search-box');
const sortValue = document.getElementById('sortValue');


// Kiem tra validate
function validate() {

    errorSubject.textContent = '';

    const subject = subjectsInput.value.trim();
    let status = null;

    let isValid = true;
    if (!subject) {
        errorSubject.textContent = "Không được để trống";
        subjectsInput.style.border = '2px solid red';
        isValid = false;
    }

    const isDuplicate = subjects.some(s =>
        s.subject === subject && s.id !== editingId
    );

    if (isDuplicate) {
        errorSubject.textContent = "Tên môn học không được trùng";
        subjectsInput.style.border = '2px solid red';
        isValid = false;
    }

    radios.forEach(radio => {
        if (radio.checked) {
            status = radio.value;
        }
    });

    if (!status) {
        alert('Vui lòng chọn trạng thái');
        isValid = false;
    }

    if (!isValid) return null;

    return { subject, status };
}

// Luu data
function saveData() {
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

// Reset
function resetForm() {
    subjectsInput.value = "";
    subjectsInput.style.border = '';
    radios.forEach(radio => radio.checked = false);
    title.textContent = 'Thêm mới môn học';
    addBtn.textContent = 'Thêm';
}

// Render
function renderRow(s) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${s.subject}</td>
        <td>
            <div class="status ${s.status}-status">
                <span class="dot"></span>
                ${s.status === 'active' ? "Đang hoạt động" : "Ngừng hoạt động"}
            </div>
        </td>
        <td class="actions-btn">
            <button class="edit-btn" onclick = "editSubject('${s.id}')"><img src="../assets/icons/edit-2.png" alt=""></button>
            <button class="del-btn" onclick = "delSubject('${s.id}')"><img src="../assets/icons/trash-2.png" alt=""></button>
        </td>
    `;
    return tr;
}

function renderList(subjects) {
    tbody.innerHTML = '';

    if (subjects.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="empty">
                    <div class="empty-box">
                        <img src="../assets/images/empty.png" alt="">
                        <p>Chưa có môn học nào</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    subjects.forEach(s => {
        const row = renderRow(s);
        tbody.appendChild(row);
    });
}

// Them mon hoc
function addSubject() {
    let data = validate();
    if (!data) return;

    const newSubject = {
        id: "SUB_" + Date.now(),
        subject: data.subject,
        status: data.status,
        create_At: new Date().toLocaleDateString('vi-VN')
    }

    subjects.push(newSubject);
    closePopUp();
}

// Sua mon hoc
function editSubject(id) {
    showPopUp();
    const subject = subjects.find(s => s.id === id);
    if (!subject) return;

    subjectsInput.value = subject.subject;

    for (let radio of radios) {
        if (subject.status === radio.value) {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    }
    title.textContent = 'Cập nhật môn học';
    addBtn.textContent = 'Lưu';

    editingId = id;

    subjectsInput.focus();
    subjectsInput.select();
}

function updateSubject(id) {
    const subject = subjects.find(s => s.id === id);
    if (!subject) return;

    const data = validate();
    if (!data) return;

    subject.subject = data.subject;
    subject.status = data.status;

    editingId = null;

    closePopUp();
}

function delSubject(id) {
    const subject = subjects.find(s => s.id === id);
    if (!subject) return;

    delId = id;

    showModal();
}

function confirmDel() {

    if (!delId) return;

    subjects = subjects.filter(s => s.id !== delId);
    saveData();
    renderList(subjects);

    delId = null;

    closeModal();
}

function applyFilter() {
    const key = searchInput.value.toLowerCase();
    const status = sortValue.value;

    let result = subjects;

    if (key) {
        result = result.filter(s =>
            s.subject.toLowerCase().includes(key)
        );
    }

    if (status === 'active') {
        result = result.filter(s => s.status === 'active');
    } else if (status === 'inactive') {
        result = result.filter(s => s.status === 'inactive');
    }

    renderList(result);
}


// Xu li logic them va cap nhat
function handleSumit() {
    if (editingId === null) {
        addSubject();
    } else {
        updateSubject(editingId);
    }

    renderList(subjects);
    resetForm();
    saveData();
}


renderList(subjects);
searchInput.addEventListener('input', applyFilter);
sortValue.addEventListener('change', applyFilter);