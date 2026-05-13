const API_BASE_URL = 'http://localhost:3000';

// Check if user is authenticated
const token = localStorage.getItem('token');

// If no token, redirect to login page
if (!token) {
    // Redirect to login page if not authenticated
    window.location.href = './login.html';
} else {
    // Show dashboard if authenticated
    document.body.style.display = 'block';
}

async function createAnnotation(event) {
    // Get token from local storage
    const token = localStorage.getItem('token');

    // Get annotation input value
    const title = document.getElementById('annotationTitle').value;
    const annotation = document.getElementById('annotationInput').value;

    // 
    const response = await fetch(`${API_BASE_URL}/api/annotations/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, annotation })
    });

    // If login fails, show error message
    if (!response.ok) {
        // Get error message element
        const errorMessage = document.getElementById('annotationError');

        // Changing the style from none to block 
        errorMessage.style.display = 'block';
        return;

    } else {
        alert(`Annotation ${title} created successfully!`);
    }
}