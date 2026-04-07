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
    renderSelect();
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
const text = document.getElementById('text-toast');
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


function saveLessons() {
    localStorage.setItem('lessons', JSON.stringify(lessons));
}


let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
let lessons = JSON.parse(localStorage.getItem('lessons')) || [];

// lessons = [
//     { id: Date.now() + 1, subjectId: "1", name: "Biến và kiểu dữ liệu", time: "30", status: "uncompleted" },
//     { id: Date.now() + 2, subjectId: "2", name: "Câu điều kiện if-else", time: "45", status: "uncompleted" },
//     { id: Date.now() + 3, subjectId: "1", name: "Vòng lặp for", time: "40", status: "uncompleted" },
//     { id: Date.now() + 4, subjectId: "3", name: "Hàm trong JavaScript", time: "50", status: "uncompleted" },
//     { id: Date.now() + 5, subjectId: "2", name: "Array cơ bản", time: "35", status: "uncompleted" },
//     { id: Date.now() + 6, subjectId: "1", name: "Object cơ bản", time: "45", status: "uncompleted" },
//     { id: Date.now() + 7, subjectId: "3", name: "DOM manipulation", time: "60", status: "uncompleted" },
//     { id: Date.now() + 8, subjectId: "2", name: "Event trong JS", time: "55", status: "uncompleted" },
//     { id: Date.now() + 9, subjectId: "1", name: "Arrow function", time: "30", status: "uncompleted" },
//     { id: Date.now() + 10, subjectId: "3", name: "Callback function", time: "45", status: "uncompleted" },

//     { id: Date.now() + 11, subjectId: "2", name: "Promise cơ bản", time: "50", status: "uncompleted" },
//     { id: Date.now() + 12, subjectId: "1", name: "Async/Await", time: "60", status: "uncompleted" },
//     { id: Date.now() + 13, subjectId: "3", name: "Fetch API", time: "40", status: "uncompleted" },
//     { id: Date.now() + 14, subjectId: "2", name: "LocalStorage", time: "35", status: "uncompleted" },
//     { id: Date.now() + 15, subjectId: "1", name: "SessionStorage", time: "30", status: "uncompleted" },
//     { id: Date.now() + 16, subjectId: "3", name: "JSON xử lý dữ liệu", time: "45", status: "uncompleted" },
//     { id: Date.now() + 17, subjectId: "2", name: "ES6 Modules", time: "50", status: "uncompleted" },
//     { id: Date.now() + 18, subjectId: "1", name: "Spread Operator", time: "25", status: "uncompleted" },
//     { id: Date.now() + 19, subjectId: "3", name: "Destructuring", time: "35", status: "uncompleted" },
//     { id: Date.now() + 20, subjectId: "2", name: "Optional Chaining", time: "20", status: "uncompleted" },

//     { id: Date.now() + 21, subjectId: "1", name: "Nullish Coalescing", time: "25", status: "uncompleted" },
//     { id: Date.now() + 22, subjectId: "3", name: "Class trong JS", time: "55", status: "uncompleted" },
//     { id: Date.now() + 23, subjectId: "2", name: "Prototype", time: "50", status: "uncompleted" },
//     { id: Date.now() + 24, subjectId: "1", name: "Hoisting", time: "30", status: "uncompleted" },
//     { id: Date.now() + 25, subjectId: "3", name: "Closure", time: "45", status: "uncompleted" },
//     { id: Date.now() + 26, subjectId: "2", name: "Debounce & Throttle", time: "40", status: "uncompleted" },
//     { id: Date.now() + 27, subjectId: "1", name: "Event Loop", time: "60", status: "uncompleted" },
//     { id: Date.now() + 28, subjectId: "3", name: "Error Handling", time: "35", status: "uncompleted" },
//     { id: Date.now() + 29, subjectId: "2", name: "Clean Code JS", time: "45", status: "uncompleted" },
//     { id: Date.now() + 30, subjectId: "1", name: "Mini Project", time: "90", status: "uncompleted" },
//     { id: Date.now() + 101, subjectId: "2", name: "Git cơ bản", time: "40", status: "uncompleted" },
//     { id: Date.now() + 102, subjectId: "3", name: "Git nâng cao", time: "50", status: "uncompleted" },
//     { id: Date.now() + 103, subjectId: "1", name: "HTML cơ bản", time: "30", status: "uncompleted" },
//     { id: Date.now() + 104, subjectId: "2", name: "CSS cơ bản", time: "45", status: "uncompleted" },
//     { id: Date.now() + 105, subjectId: "3", name: "Flexbox", time: "35", status: "uncompleted" },
//     { id: Date.now() + 106, subjectId: "1", name: "Grid Layout", time: "40", status: "uncompleted" },
//     { id: Date.now() + 107, subjectId: "2", name: "Responsive Design", time: "50", status: "uncompleted" },
//     { id: Date.now() + 108, subjectId: "3", name: "Bootstrap", time: "45", status: "uncompleted" },
//     { id: Date.now() + 109, subjectId: "1", name: "Tailwind CSS", time: "60", status: "uncompleted" },
//     { id: Date.now() + 110, subjectId: "2", name: "DOM nâng cao", time: "55", status: "uncompleted" },

//     { id: Date.now() + 111, subjectId: "3", name: "Event delegation", time: "35", status: "uncompleted" },
//     { id: Date.now() + 112, subjectId: "1", name: "Form validation", time: "40", status: "uncompleted" },
//     { id: Date.now() + 113, subjectId: "2", name: "Regex cơ bản", time: "30", status: "uncompleted" },
//     { id: Date.now() + 114, subjectId: "3", name: "Regex nâng cao", time: "45", status: "uncompleted" },
//     { id: Date.now() + 115, subjectId: "1", name: "Date & Time JS", time: "35", status: "uncompleted" },
//     { id: Date.now() + 116, subjectId: "2", name: "Math object", time: "25", status: "uncompleted" },
//     { id: Date.now() + 117, subjectId: "3", name: "Set & Map", time: "50", status: "uncompleted" },
//     { id: Date.now() + 118, subjectId: "1", name: "WeakMap & WeakSet", time: "40", status: "uncompleted" },
//     { id: Date.now() + 119, subjectId: "2", name: "Web Storage API", time: "30", status: "uncompleted" },
//     { id: Date.now() + 120, subjectId: "3", name: "Session vs Local Storage", time: "35", status: "uncompleted" },

//     { id: Date.now() + 121, subjectId: "1", name: "REST API cơ bản", time: "45", status: "uncompleted" },
//     { id: Date.now() + 122, subjectId: "2", name: "HTTP methods", time: "30", status: "uncompleted" },
//     { id: Date.now() + 123, subjectId: "3", name: "Status code", time: "25", status: "uncompleted" },
//     { id: Date.now() + 124, subjectId: "1", name: "Axios", time: "40", status: "uncompleted" },
//     { id: Date.now() + 125, subjectId: "2", name: "CORS", time: "35", status: "uncompleted" },
//     { id: Date.now() + 126, subjectId: "3", name: "Authentication cơ bản", time: "50", status: "uncompleted" },
//     { id: Date.now() + 127, subjectId: "1", name: "JWT", time: "45", status: "uncompleted" },
//     { id: Date.now() + 128, subjectId: "2", name: "Debugging JS", time: "40", status: "uncompleted" },
//     { id: Date.now() + 129, subjectId: "3", name: "Performance JS", time: "55", status: "uncompleted" },
//     { id: Date.now() + 130, subjectId: "1", name: "Deploy project", time: "60", status: "uncompleted" }
// ];

// saveLessons();

let editId = null;
let delId = null;


const select = document.getElementById('subject-select');
const lessonInput = document.getElementById('lesson-name');
const subjectSelect = document.getElementById('subject-select');
const timeInput = document.getElementById('time');
const errorName = document.getElementById('error-name');
const errorSubject = document.getElementById('error-subject');
const errorTime = document.getElementById('error-time');
const tBody = document.getElementById('tbody-lesson');
const popUpTitle = document.getElementById('pop-up-title');
const addBtn = document.getElementById('add-btn');


// Render
function renderSelect() {
    select.innerHTML = `<option value="" disabled selected>Lập trình cơ bản C</option>`;

    subjects.forEach(s => {
        select.innerHTML += `
            <option value = "${s.id}">${s.subject}</option>
        `
    });
}

function renderLesson(lesson) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>
            <input type="checkbox" class = "item" ${lesson.status === 'completed' ? 'checked' : ''}>
        </td>
        <td>${lesson.name}</td>
        <td>${lesson.time}</td>
        <td>
            <div class="status ${lesson.status}-status">
                <span class="dot"></span>
                ${lesson.status === 'completed' ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
            </div>
        </td>
        <td class="actions-btn">
            <button class="edit-btn" onclick="editLesson(${lesson.id})"><img src="../assets/icons/edit-2.png" alt=""></button>
            <button class="del-btn" onclick="delLesson(${lesson.id})"><img src="../assets/icons/trash-2.png" alt=""></button>
        </td>
    `;

    const checkbox = tr.querySelector(`.item`);
    checkbox.addEventListener('change', () => {
        lesson.status = checkbox.checked ? 'completed' : 'uncompleted';
        saveLessons();
        applyFilter();
    });
    return tr;
}

function renderList(lessons) {
    tBody.innerHTML = '';

    if (lessons.length === 0) {
        tBody.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    <div class="empty-box">
                        <p id = "none-text">Chưa có bài học nào</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }


    lessons.forEach(lesson => {
        const tr = renderLesson(lesson);
        tBody.appendChild(tr);
    });
}

// Kiem tra du lieu
function validate() {
    const name = lessonInput.value.trim();
    const subjectName = subjectSelect.value;
    const time = timeInput.value;

    let isValid = true;
    if (!name) {
        errorName.textContent = 'Không được để trống';
        lessonInput.style.border = '2px solid red';
        isValid = false;
    }

    const find = lessons.find(l => l.name.trim().toLowerCase() === name.toLowerCase() && l.id !== editId);
    if (find) {
        errorName.textContent = 'Bài học đã tồn tại';
        lessonInput.style.border = '2px solid red';
        isValid = false;
    }

    if (!subjectName) {
        errorSubject.textContent = 'Vui lòng chọn môn học';
        subjectSelect.style.border = '2px solid red';
        isValid = false;
    }

    if (!time) {
        errorTime.textContent = 'Không được để trống';
        timeInput.style.border = '2px solid red';
        isValid = false;
    }

    if (!isValid) return null;
    return {
        name, subjectName, time
    }

}

function resetForm() {
    lessonInput.value = '';
    subjectSelect.value = '';
    timeInput.value = '';
    errorName.textContent = '';
    errorSubject.textContent = '';
    errorTime.textContent = '';
    lessonInput.style.border = '';
    subjectSelect.style.border = '';
    timeInput.style.border = '';
}

// Xu li them, sua, xoa
function addLesson() {
    const data = validate();
    const subjectId = subjectSelect.value;
    if (!data) return;

    const newLesson = {
        id: Date.now(),
        subjectId: subjectId,
        name: data.name,
        time: data.time,
        status: 'uncompleted'
    }

    editId = null;
    currentPage = 1;

    lessons.push(newLesson);

    applyFilter();
    saveLessons();
    closePopUp();

    showToast('Thêm bài học thành công');
}

function editLesson(id) {
    showPopUp();
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) return;

    lessonInput.value = lesson.name;
    subjectSelect.value = lesson.subjectId;
    timeInput.value = lesson.time;

    editId = id;

    popUpTitle.textContent = 'Cập nhật bài học';
    addBtn.textContent = 'Lưu';

}

function updateLesson() {
    const data = validate();
    const subjectId = subjectSelect.value;
    if (!data) return;

    const lesson = lessons.find(l => l.id === editId);
    if (!lesson) return;

    lesson.name = data.name;
    lesson.subjectId = subjectId;
    lesson.time = data.time;

    editId = null;
    currentPage = 1;

    applyFilter();
    saveLessons();
    closePopUp();

    showToast('Cập nhật bài học thành công');
}

function delLesson(id) {
    showModal();
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) return;
    delId = id;
    confirmQues.textContent = 'Bạn có muốn xóa bài học này không ?';
    confirmBtn.textContent = 'Xóa';
}

function confirmDel() {

    if (!delId) return;
    lessons = lessons.filter(l => l.id !== delId);

    delId = null;

    showToast('Xóa bài học thành công');
    applyFilter();
    saveLessons();
    closeModal();
}

function handleSubmit() {
    if (editId === null) {
        addLesson();
    } else {
        updateLesson();
    }
}

function handleConfirm() {
    if (delId === null) {
        confirmLogOut();
    } else {
        confirmDel();
    }
}

const filterValue = document.getElementById('filterValue');
function renderFilterSelect() {

    filterValue.innerHTML = `<option value="">Lọc theo môn học</option>`;

    subjects.forEach(subject => {
        filterValue.innerHTML += `<option value="${subject.id}">${subject.subject}</option>`;
    });


}

let isSort = false

function filterLesson(list) {
    const subjecId = filterValue.value;
    if (!subjecId) return list;

    return list.filter(l => l.subjectId === subjecId);
}

function sortLesson(list) {
    if (!isSort) return list;
    return list.sort((a, b) => a.name.localeCompare(b.name));
}


function applyFilter() {
    let result = [...lessons];

    result = filterLesson(result);
    result = sortLesson(result);

    if (result.length === 0) {
        const noneText = document.getElementById('none-text');
        if (noneText) {
            noneText.textContent = 'Không tìm thấy bài học';
        }
    }

    const pageData = paginate(result);

    renderList(pageData);
    renderPagination(result);
}


function toggleSort() {
    isSort = !isSort;
    applyFilter();
}

let currentPage = 1;
let perPage = 5;
let totalPage;

function getPagination(currentPage, totalPage) {
    let pages = [];

    if (totalPage <= 6) {
        for (let i = 1; i <= totalPage; i++) {
            pages.push(i)
        }
        return pages
    }

    pages.push(1);

    if (currentPage >= 5) {
        pages.push('...');
    }

    let start = currentPage - 1;
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

    pages.push(totalPage);

    return pages;
}

function paginate(list) {
    totalPage = Math.ceil(list.length / perPage);
    if (currentPage > totalPage) {
        currentPage = 1;
    }
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return list.slice(start, end);
}

function renderPagination(list) {
    const pagination = document.getElementById('pagination');
    totalPage = Math.ceil(list.length / perPage);
    if (list.length === 0 || totalPage === 1) {
        pagination.innerHTML = '';
        return;
    }

    const pages = getPagination(currentPage, totalPage);

    pagination.innerHTML = `
    <button onclick = "prevPage()" style = "display: ${currentPage === 1 ? "none" : "block"}"><-</button>`;

    pages.forEach(p => {
        if (p === '...') {
            pagination.innerHTML += `
                <button disabled>...</button>
            `;
        } else {
            pagination.innerHTML += `
                <button class = "${p === currentPage ? "active" : ""}" onclick = "changePage(${p})">${p}</button>
            `;
        }
    });

    pagination.innerHTML += `
    <button onclick = "nextPage()" style = "display: ${currentPage === totalPage ? "none" : "block"}">-></button>`;
}

function changePage(page) {
    currentPage = page;
    applyFilter();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        applyFilter();
    }
}

function nextPage() {
    if (currentPage < totalPage) {
        currentPage++;
        applyFilter();
    }
}

filterValue.addEventListener('change', applyFilter);


renderFilterSelect();
applyFilter();
