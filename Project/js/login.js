let users = JSON.parse(localStorage.getItem('users')) || [];


const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberBox = document.getElementById('remember-box');
const errorEmail = document.getElementById('error-email');
const errorPassword  = document.getElementById(`error-password`);
const rememberLogin = document.getElementById('remember-box');

function clearError() {
    errorEmail.textContent = '';
    errorPassword.textContent = '';
    emailInput.style.border = '';
    passwordInput.style.border = '';
}

function login() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const user = users.find(u => u.email === email);

    clearError();

    let isValid = true;
    if (!email) {
        errorEmail.textContent = 'Hãy nhập email của bạn';
        emailInput.style.border = '2px solid red';
        isValid = false;
    } else if (!user) {
        errorEmail.textContent = 'Email không tồn tại. Vui lòng đăng kí tài khoản';
        emailInput.style.border = '2px solid red';
        isValid = false;
    }

    if (user && !password) {
        errorPassword.textContent = 'Hãy nhập mật khẩu của bạn';
        passwordInput.style.border = '2px solid red';
        isValid = false;
    } else if (user && password !== user.password) {
        errorPassword.textContent = 'Mật khẩu không đúng. Vui lòng nhập lại';
        passwordInput.style.border = '2px solid red';
        isValid = false;
    }

    if (!isValid) return null;

    if (rememberLogin.checked) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    window.location.href = './subjects-manager.html';

}
