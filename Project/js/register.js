let users = JSON.parse(localStorage.getItem('users')) || [];

const midleNameInput = document.getElementById('midle-name');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const checkBox = document.getElementById('check-box');
const errorMidleName = document.getElementById('error-midle-name');
const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorPassword = document.getElementById('error-password');
const toastBox = document.getElementById('toastBox');

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPassword(password) {
    const regex = /^\S{8}$/;
    return regex.test(password)
}

function clearError() {
    errorMidleName.textContent = '';
    errorName.textContent = '';
    errorEmail.textContent = '';
    errorPassword.textContent = '';
    midleNameInput.style.border = "";
    nameInput.style.border = "";
    emailInput.style.border = "";
    passwordInput.style.border = "";
}


function validate() {
    let midleName = midleNameInput.value.trim();
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value;

    clearError();
    
    let isValid = true;
    if (!midleName) {
        errorMidleName.textContent = 'Không được để trống';
        midleNameInput.style.border = "2px solid red";
        isValid = false;
    }

    if (!name) {
        errorName.textContent = 'Không được để trống';
        nameInput.style.border = "2px solid red";
        isValid = false;
    }

    if (!email) {
        errorEmail.textContent = 'Không được để trống';
        emailInput.style.border = "2px solid red";
        isValid = false;
    } else if (!isValidEmail(email)) {
        errorEmail.textContent = 'Sai định dạng email';
        emailInput.style.border = "2px solid red";
        isValid = false;
    }

    const isDuplicateEmail = users.some(u => u.email === email);
    if (isDuplicateEmail) {
        errorEmail.textContent = 'Email đã tồn tại. Vui lòng sử dụng email khác';
        emailInput.style.border = "2px solid red";
        isValid = false;
    }

    if (!password) {
        errorPassword.textContent = "Không được để trống";
        passwordInput.style.border = "2px solid red";
        isValid = false;
    } else if (!isValidPassword(password)) {
        errorPassword.textContent = 'Mật khẩu phải có độ dài tối thiếu 8 kí tự và không được chứa khoảng trắng';
        passwordInput.style.border = "2px solid red";
        isValid = false;
    }



    if (!checkBox.checked) {
        showToast('Hãy đồng ý với chính sách và điều khoản')
        isValid = false;
    }

    if (!isValid) {
        return null;
    }

    return {
        midleName, name, email, password
    }

}

function createAccount() {
    const data = validate();
    if (!data) return;

    let newAccount = {
        id: Date.now(),
        first_name: data.midleName,
        last_name: data.name,
        email: data.email,
        password: data.password
    }

    users.push(newAccount);
    localStorage.setItem('users', JSON.stringify(users));

    window.location.href = './login.html';

}



function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toastBox.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}