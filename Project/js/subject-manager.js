// Truy cap trang

const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

if (!user) {
    window.location.href = './login.html';
}

// Hien thi dropdown
const userBox = document.getElementById('user');
const userInfor = document.getElementById('user-infor');

userBox.addEventListener('click', (e) => {
    if (userBox.contains(e.target)) {
        userInfor.classList.add('show');
    }
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
    overlayPop.classList.remove('hidden');
}

function closePopUp() {
    overlayPop.classList.add('hidden');
}

overlayPop.addEventListener('click', (e) => {
    if (e.target === overlayPop) {
        overlayPop.classList.add('hidden');
    }
});

// Lay du lieu
let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
let editingId = null;


const title = document.getElementById('pop-up-title');
const subjectsInput = document.getElementById('subject');
const errorSubject = document.getElementById('error-subject');
const radios = document.querySelectorAll('input[name="status"]');
const addBtn = document.getElementById('add-btn');
const tbody = document.getElementById('tbody');


// Kiem tra validate
function validate() {
    const subject = subjectsInput.value.trim();
    let status = null;

    let isValid = true;
    if (!subject) {
        errorSubject.textContent = "Không được để trống";
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
    radios.forEach(radio => radio.checked = false);
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
            <button class="edit-btn" onclick = "editSubject(${s.id})"><img src="../assets/icons/edit-2.png" alt=""></button>
            <button class="del-btn"><img src="../assets/icons/trash-2.png" alt=""></button>
        </td>
    `;
    return tr;
}

function renderList(subjects) {
    tbody.innerHTML = '';
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
    title.textContent = 'Cập nhật môn học';
    addBtn.textContent = 'Lưu';

    radios.forEach(radio => {
        if (radio.checked) {
            radio.value === subject.status;
        }
    });

    editingId = id;
}

function updateSubject() {
    const subject = subjects.find(s => s.id === editingId);
    if (!subject) return;

    const data = validate();
    if (!data) return;

    subject.subject = data.subject;
    subject.status = data.status;

    editingId = null;

    closePopUp();
}


// Xu li logic them va cap nhat
function handleSumit() {
    if (editingId === null) {
        addSubject();
    } else {
        updateSubject(editingId);
    }

    renderList(subjects);
    saveData();
    resetForm();
}


renderList(subjects);