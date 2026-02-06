// Function to fetch and display projects
async function loadProjects() {
    const grid = document.getElementById('project-grid');
    if (!grid) return; // Exit if not on projects page

    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();

        grid.innerHTML = data.map(item => `
            <a href="${item.link}" class="card">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <span class="tag">${item.tag}</span>
            </a>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        grid.innerHTML = '<p>Could not load projects. Please run on a local server.</p>';
    }
}

// Function to fetch and display blog posts
async function loadPosts() {
    const list = document.getElementById('blog-list');
    if (!list) return; // Exit if not on blog page

    try {
        const response = await fetch('data/posts.json');
        const data = await response.json();

        list.innerHTML = data.map(item => `
            <div class="list-item" onclick="window.location.href='${item.link}'">
                <span class="list-title">${item.title}</span>
                <span class="list-date">${item.date}</span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading posts:', error);
        list.innerHTML = '<p>Could not load posts. Please run on a local server.</p>';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadPosts();
});