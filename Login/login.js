// ฟังก์ชันสลับฟอร์ม Login <-> Register
function toggleForm() {
    const loginBox = document.getElementById("login-box");
    const registerBox = document.getElementById("register-box");

    if (registerBox.style.display === "none") {
        // แสดง Register Box พร้อมอนิเมชั่น
        registerBox.style.display = "block";
        setTimeout(() => registerBox.classList.add("show"), 10);
        loginBox.style.display = "none";
    } else {
        // กลับไปหน้า Login
        registerBox.classList.remove("show");
        setTimeout(() => {
            registerBox.style.display = "none";
            loginBox.style.display = "block";
        }, 500);
    }
}


// ฟังก์ชันสมัครสมาชิก
function register() {
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (!username || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Registration successful! You can now log in.");
    toggleForm(); // กลับไปที่หน้า Login
}

// ฟังก์ชันล็อกอิน
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
        alert("Login successful!");
    } else {
        alert("Invalid email or password!");
    }
}
