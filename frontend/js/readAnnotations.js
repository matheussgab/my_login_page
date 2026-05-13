const API_BASE_URL = 'http://localhost:3000';

async function getAnnotations() {
    // token
    const token = localStorage.getItem('token');

    // Fetch annotations
    const response = await fetch(`${API_BASE_URL}/api/annotations/read`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        console.error('Failed to fetch annotations:', response.statusText);
        return;
    }

    const annotations = await response.json();

    console.log(annotations);

    const annotationsList = document.getElementById('annotationsList');
    annotationsList.innerHTML = ''; 

    annotations.forEach(annotation => {
        annotationsList.innerHTML += `
           <div class="annotationCard" class="card">
               <h3>${annotation.title}</h3>
               <p>${annotation.content}</p>
           </div>
        `;
    });
}

getAnnotations();