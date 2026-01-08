// REGISTRATION
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    if (document.getElementById("password").value !== document.getElementById("confirmPassword").value) {
        alert("Passwords do not match");
        return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful! Please login.");

    window.location.href = "login.html";
});

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("User not registered. Please register first.");
        window.location.href = "register.html";
        return;
    }

    if (
        loginEmail.value === storedUser.email &&
        loginPassword.value === storedUser.password
    ) {
        alert("Login successful!");
        window.location.href = "profile.html";
    } else {
        alert("Invalid email or password");
    }
});
