const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

if (!user) {
    window.location.href = './login.html';
}