// Hien thi dropdown
const userBox = document.getElementById('user');
const userInfor = document.getElementById('user-infor');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');

userBox.addEventListener('click', () => {
    userInfor.classList.toggle('show');
    userName.textContent = `${user.first_name + " " + user.last_name}`;
    userEmail.textContent = `${user.email}`;
});

document.addEventListener('click', (e) => {
    if (!userBox.contains(e.target)) {
        userInfor.classList.remove('show');
    }
});

// Dang xuat
const confirmQues = document.getElementById('confirm-ques');
const confirmBtn = document.getElementById('confirm-btn');

function logOut() {
    showModal();
    delId = null;
    confirmQues.textContent = 'Bạn có muốn đăng xuất không ?';
    confirmBtn.textContent = 'Đăng xuất';
}

function confirmLogOut() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    window.location.href = './login.html';
}

// Xu li pop-up
const overlayPop = document.getElementById('overlay-pop-up');

function showPopUp() {
    resetForm();
    radios.forEach(radio => {
        if (radio.value === "active") {
            radio.checked = true;
        }
    })
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

// Hien thi thong bao
const toastBox = document.getElementById('toastBox');
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
            <div class="toastHeader">
                    <div class="toast-left">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM10 14.17L16.59 7.58L18 9L10 17L6 13L7.41 11.59L10 14.17Z"
                                fill="#02EE6A" />
                        </svg>
                        <p>Thành công</p>
                    </div>
                    <div class="toast-right">
                        <button class = "close-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <rect width="24" height="24" rx="12" fill="white" fill-opacity="0.35" />
                                <path
                                    d="M16.6666 8.27337L15.7266 7.33337L11.9999 11.06L8.27325 7.33337L7.33325 8.27337L11.0599 12L7.33325 15.7267L8.27325 16.6667L11.9999 12.94L15.7266 16.6667L16.6666 15.7267L12.9399 12L16.6666 8.27337Z"
                                    fill="white" />
                            </svg></button>
                    </div>
                </div>

                <div class="toast-content">
                    <p id="text-toast">${msg}</p>
                </div>
        `;

    toastBox.appendChild(toast);

    const closeBtn = toast.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Lay du lieu
let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
let lessons = JSON.parse(localStorage.getItem('lessons')) || [];
let editingId = null;
let delId = null;

// subjects = [
//     { id: "SUB_" + Date.now() + "_1", subject: "Toán học", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_2", subject: "Ngữ văn", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_3", subject: "Tiếng Anh", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_4", subject: "Vật lý", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_5", subject: "Hóa học", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_6", subject: "Sinh học", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_7", subject: "Lịch sử", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_8", subject: "Địa lý", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_9", subject: "Tin học", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_10", subject: "Công nghệ", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },

//     { id: "SUB_" + Date.now() + "_11", subject: "Giáo dục công dân", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_12", subject: "Thể dục", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_13", subject: "Âm nhạc", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_14", subject: "Mỹ thuật", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_15", subject: "Khoa học tự nhiên", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_16", subject: "Khoa học xã hội", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_17", subject: "Kỹ năng sống", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_18", subject: "Lập trình JavaScript", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_19", subject: "Lập trình Python", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_20", subject: "Lập trình Java", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },

//     { id: "SUB_" + Date.now() + "_21", subject: "Cấu trúc dữ liệu", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_22", subject: "Thuật toán", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_23", subject: "Mạng máy tính", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_24", subject: "Cơ sở dữ liệu", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_25", subject: "Trí tuệ nhân tạo", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_26", subject: "Machine Learning", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_27", subject: "Deep Learning", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_28", subject: "Phát triển Web", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_29", subject: "Frontend", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_30", subject: "Backend", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },

//     { id: "SUB_" + Date.now() + "_31", subject: "DevOps", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_32", subject: "Docker", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_33", subject: "Kubernetes", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_34", subject: "Cloud Computing", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_35", subject: "AWS", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_36", subject: "Azure", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_37", subject: "Google Cloud", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_38", subject: "An toàn thông tin", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_39", subject: "Blockchain", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_40", subject: "IoT", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },

//     { id: "SUB_" + Date.now() + "_41", subject: "Phân tích dữ liệu", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_42", subject: "Big Data", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_43", subject: "Excel nâng cao", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_44", subject: "Power BI", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_45", subject: "Thiết kế UI/UX", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_46", subject: "Photoshop", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_47", subject: "Illustrator", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_48", subject: "After Effects", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_49", subject: "Marketing", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_50", subject: "Digital Marketing", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },

//     { id: "SUB_" + Date.now() + "_51", subject: "SEO", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_52", subject: "Content Marketing", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_53", subject: "Quản trị kinh doanh", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_54", subject: "Kế toán", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_55", subject: "Tài chính", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_56", subject: "Quản lý dự án", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_57", subject: "Startup", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_58", subject: "Kỹ năng thuyết trình", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_59", subject: "Kỹ năng giao tiếp", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_60", subject: "Kỹ năng lãnh đạo", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_60", subject: "Kỹ năng lãnh đạo", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_51", subject: "SEO", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_52", subject: "Content Marketing", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_53", subject: "Quản trị kinh doanh", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_54", subject: "Kế toán", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_55", subject: "Tài chính", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_56", subject: "Quản lý dự án", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_57", subject: "Startup", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_58", subject: "Kỹ năng thuyết trình", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_59", subject: "Kỹ năng giao tiếp", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_60", subject: "Kỹ năng lãnh đạo", status: "active", create_At: new Date().toLocaleDateString('vi-VN') },
//     { id: "SUB_" + Date.now() + "_60", subject: "Kỹ năng lãnh đạo", status: "active", create_At: new Date().toLocaleDateString('vi-VN') }
// ];

// saveData();

const title = document.getElementById('pop-up-title');
const subjectsInput = document.getElementById('subject');
const errorSubject = document.getElementById('error-subject');
const radios = document.querySelectorAll('input[name="status"]');
const errorStatus = document.getElementById('error-status');
const addBtn = document.getElementById('add-btn');
const tbody = document.getElementById('tbody');
const searchInput = document.getElementById('search-box');
const sortValue = document.getElementById('sortValue');


// Kiem tra validate
function validate() {

    errorSubject.textContent = '';

    const subject = subjectsInput.value.trim();
    let status;

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
    })

    if (!isValid) return null;

    return { subject, status };
}

// Luu data
function saveData() {
    localStorage.setItem('subjects', JSON.stringify(subjects));
    localStorage.setItem('lessons', JSON.stringify(lessons));
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
                            <p id = "none-text">Chưa có môn học nào</p>
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

    editingId = null;

    subjects.push(newSubject);
    saveData();
    showToast("Thêm bài học thành công");
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

    showToast("Sửa bài học thành công");
    saveData();
    closePopUp();
}

// Xoa
function delSubject(id) {
    const subject = subjects.find(s => s.id === id);
    if (!subject) return;

    delId = id;

    showModal();

    confirmQues.innerHTML = `Bạn có chắc chắn muốn xóa môn học <strong>${subject.subject}</strong> khỏi hệ thống không ?`;
    confirmBtn.textContent = 'Xóa';
}

function confirmDel() {

    if (!delId) return;

    subjects = subjects.filter(s => s.id !== delId);
    lessons = lessons.filter(l => l.subjectId !== delId);
    saveData();
    renderList(subjects);

    delId = null;

    showToast("Xóa bài học thành công");
    applyAll();
    closeModal();
}

// Loc tim kiem sap xep
let isSorted = false

function searchSubject(list, key) {
    return list.filter(i => {
        return i.subject.toLowerCase().includes(key)
    });
}

function filterSubject(list) {
    const status = sortValue.value;
    if (status !== '') {
        return [...list].filter(item => item.status === status);
    }
    return list
}

function sortSubject(list) {
    if (isSorted) {
        return list.sort((a, b) => a.subject.localeCompare(b.subject));
    }
    return list;
}

function applyAll() {
    let result = [...subjects];
    const key = searchInput.value.toLowerCase();

    result = searchSubject(result, key);
    result = filterSubject(result);
    result = sortSubject(result);


    const pageData = getCurrentPageData(result);

    renderList(pageData);
    renderPagination(result);
}

function toggleSort() {
    isSorted = !isSorted;
    currentPage = 1;
    applyAll();
}


// Xu li logic them va cap nhat
function handleSumit() {
    if (editingId === null) {
        addSubject();
    } else {
        updateSubject(editingId);
    }

    applyAll();
    saveData();
}

function handleConfirm() {
    if (delId !== null) {
        confirmDel();
    } else {
        confirmLogOut();
    }
}


// Phan trang

const pagination = document.getElementById('pagination');

let currentPage = 1;
let perPage = 5;
let totalPage;

function getPagination(currentPage, totalPage) {

    let pages = [];

    if (totalPage <= 5) {
        for (let i = 1; i <= totalPage; i++) {
            pages.push(i);
        }

        return pages;
    }

    pages.push(1);

    if (currentPage >= 5) {
        pages.push('...');
    }

    let start = currentPage - 2;
    let end = currentPage + 2;

    if (currentPage < 5) {
        start = 2;
        end = 5;
    }

    if (currentPage >= totalPage - 2) {
        start = totalPage - 3;
        end = totalPage - 1;
    }


    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < totalPage - 1) {
        pages.push('...');
    }

    pages.push(totalPage)

    return pages;
}

function getCurrentPageData(list) {
    totalPage = Math.ceil(list.length / perPage);


    if (currentPage > totalPage) {
        currentPage = 1;
    }

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return list.slice(start, end);
}


function renderPagination(list) {
    if (list.length === 0 || totalPage === 1) {
        pagination.innerHTML = '';
        return;
    }

    const pages = getPagination(currentPage, totalPage);

    pagination.innerHTML = `
    <button onclick = "prevPage()" style = "display: ${currentPage === 1 ? "none" : "block"}"><-</button`;

    pages.forEach(p => {
        if (p === '...') {
            pagination.innerHTML += `
                <button disabled>...</button>
            `;
        } else {
            pagination.innerHTML += `
                <button onclick = "changePage(${p})" class = "${p === currentPage ? "active" : ""}">${p}</button>
            `;
        }
    })

    pagination.innerHTML += `
    <button onclick = "nextPage()" style = "display: ${currentPage === totalPage ? "none" : "block"}">-></button`;
}

function changePage(page) {
    currentPage = page;
    applyAll();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

function nextPage() {
    if (currentPage < totalPage) {
        currentPage++;
        changePage(currentPage);
    }
}

function init() {
    searchInput.addEventListener('input', applyAll);
    sortValue.addEventListener('change', applyAll)

    applyAll();
}

init();

