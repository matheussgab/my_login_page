async function login() {
    // Get email and password from form
    const email = document.getElementById('email').value;
    const password = document.getElementById('loginPasswordId').value;

    // Send login request to backend
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    // If login fails, show error message
    if (!response.ok) {
        // Get error message element
        const errorMessage = document.getElementById('loginError');

        // Changing the style from none to block 
        errorMessage.style.display = 'block';
        return;
    }

    // Store token in localStorage
    const data = await response.json();
    localStorage.setItem('token', data.token);

    // Redirect to main page
    window.location.href = './index.html';
}

async function register() {
    // Get name, email and password from form
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPasswordId').value;

    // Send registration request to backend
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
        alert('Registration failed');
        return;
    }

    // Redirect to login page after successful registration
    window.location.href = './login.html';
}

// Show register form
function showRegister() {
    // Change header text to "Register"
    document.getElementById('headerText').textContent = 'Register';
    
    // Toggle form visibility
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// Show login form
function showLogin() {
    // Change header text to "Login"
    document.getElementById('headerText').textContent = 'Login';
    
    // Toggle form visibility
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Toggle Login password visibility
function togglePassword(passwordId, checkboxId) {
    // Get password field and checkbox
    const whichPassword = passwordId;
    const whichCheckbox = checkboxId;

    // Toggle password visibility based on checkbox state
    if (whichCheckbox.checked) {
        whichPassword.type = 'text';
    } else {
        whichPassword.type = 'password';
    }
}
