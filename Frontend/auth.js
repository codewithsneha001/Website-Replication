window.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loginForm");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;
            const remember = document.getElementById("rememberMe").checked;

            // Hardcoded login check
            if (email === "training@jalaacademy.com" && password === "jobprogram") {
                if (remember) {
                    localStorage.setItem("session", email);
                } else {
                    sessionStorage.setItem("session", email);
                }
                alert("Login successful!");
                window.location.href = "home.html";
            } else {
                alert("Invalid email or password!");
            }
        });
    }
});