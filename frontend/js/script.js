// Check if user is authenticated
const token = localStorage.getItem('token');

if (!token) {
    // Redirect to login page if not authenticated
    window.location.href = './login.html';
} else {
    // Show dashboard if authenticated
    document.body.style.display = 'block';
}

// Logout function
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Redirect to login page
    window.location.href = './login.html';
}

function openCalculator() {
    window.location.href = './calculator.html';
    // window.open('./calculator.html', '_blank');
}