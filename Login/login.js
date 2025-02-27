document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let defaultUser = { email: "admin", password: "1234" };//บัญชีหลักไว้ล็อคอินเข้าใช้งาน

    // ถ้ายังไม่มีบัญชีหลัก ให้เพิ่ม
    if (!users.some(user => user.email === defaultUser.email)) {
        users.push(defaultUser);
        localStorage.setItem("users", JSON.stringify(users));
    }

    checkLoggedInUser();

    // Google Login
    // document.getElementById("google-login").addEventListener("click", function () {
    //     google.accounts.id.initialize({
    //         client_id: "YOUR_GOOGLE_CLIENT_ID",
    //         callback: handleGoogleLogin
    //     });
    //     google.accounts.id.prompt();
    // });

    // Facebook Login
    // window.fbAsyncInit = function () {
    //     FB.init({
    //         appId: "YOUR_FACEBOOK_APP_ID",
    //         cookie: true,
    //         xfbml: true,
    //         version: "v18.0"
    //     });
    // };

    document.getElementById("facebook-login").addEventListener("click", function () {
        FB.login(function (response) {
            if (response.authResponse) {
                FB.api('/me', { fields: 'name,email' }, function (userInfo) {
                    handleSocialLogin(userInfo.email);
                });
            } else {
                alert("Facebook login failed!");
            }
        }, { scope: 'email' });
    });
});

function login() {
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", email);
        checkLoggedInUser();
        alert("Login Successful!");
    } else {
        alert("Invalid email or password!");
    }
}

function handleGoogleLogin(response) {
    let credential = JSON.parse(atob(response.credential.split('.')[1]));
    handleSocialLogin(credential.email);
}

function handleSocialLogin(email) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!users.some(user => user.email === email)) {
        users.push({ email, password: "Google/Facebook User" });
        localStorage.setItem("users", JSON.stringify(users));
    }

    localStorage.setItem("loggedInUser", email);
    checkLoggedInUser();
    alert(`Login Successful: ${email}`);
}

function checkLoggedInUser() {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        document.getElementById("user-info").style.display = "block";
        document.getElementById("user-email").innerText = loggedInUser;
        document.getElementById("logout-btn").style.display = "block";
    } else {
        document.getElementById("user-info").style.display = "none";
        document.getElementById("logout-btn").style.display = "none";
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    checkLoggedInUser();
    alert("Logged out successfully!");
}
// function register() {
//     alert("ไปที่หน้าสมัครสมาชิก");
//     // สามารถเปลี่ยนให้ลิงก์ไปยังหน้าสมัครสมาชิกได้ เช่น:
//     window.location.href = "register.html";
// }

