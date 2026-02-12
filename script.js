// Set current date
document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    loadProjects();
    loadPosts();
});

// Load Projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        const projectsGrid = document.getElementById('projects-grid');
        
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = '';
        
        data.projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.animationDelay = `${index * 0.1}s`;
            
            projectCard.innerHTML = `
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-meta">
                        <span>${formatDate(project.date)}</span>
                        ${project.tags.map(tag => `<span>•</span><span>${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="project-content">
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="color-accent-bar" style="background-color: ${project.color}"></div>
            `;
            
            // Add click handler for links
            if (project.link && project.link !== '#') {
                projectCard.style.cursor = 'pointer';
                projectCard.addEventListener('click', () => {
                    window.open(project.link, '_blank');
                });
            }
            
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = '<p style="color: var(--color-secondary);">Projects loading... Check GitHub for latest work.</p>';
        }
    }
}

// Load Blog Posts from JSON
async function loadPosts() {
    try {
        const response = await fetch('data/posts.json');
        const posts = await response.json();
        const postsGrid = document.getElementById('posts-grid');
        
        if (!postsGrid) return;
        
        postsGrid.innerHTML = '';
        
        posts.forEach((post, index) => {
            const postCard = document.createElement('a');
            postCard.className = 'post-card';
            postCard.href = post.link || 'https://github.com/mishraxharshit/portfolio/wiki';
            postCard.target = '_blank';
            postCard.style.animationDelay = `${index * 0.1}s`;
            
            postCard.innerHTML = `
                <div class="post-date">${post.date}</div>
                <div>
                    <h3 class="post-title">${post.title}</h3>
                </div>
            `;
            
            postsGrid.appendChild(postCard);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
        const postsGrid = document.getElementById('posts-grid');
        if (postsGrid) {
            postsGrid.innerHTML = '<p style="color: var(--color-secondary);">Notes and documentation available on the Wiki.</p>';
        }
    }
}

// Helper function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.project-card, .gallery-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
// AI Co-Lab Logic
document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('ai-output');
    const commandElement = document.getElementById('ai-command');
    const buttons = document.querySelectorAll('.ai-btn');
    
    if (!outputElement) return;

    // Data for different modes
    const aiData = {
        analyze: {
            command: "run analysis --target=current_project",
            text: "Scanning repository structures...\n> Detected stack: HTML5, CSS3, Vanilla JS\n> Performance: Optimized for low-latency rendering.\n> Insight: The 'grain-overlay' technique adds unique visual texture without heavy asset loading. Codebase is clean and modular."
        },
        generate: {
            command: "generate concept --type=haiku",
            text: "Processing creative parameters...\n\nCode flows like water,\nLogic builds a bridge of light,\nWorld connects in bits.\n\n> Ready for deployment."
        },
        optimize: {
            command: "initiate system_optimization",
            text: "Analyzing DOM reflow patterns...\n> Reducing layout thrashing in 'script.js'.\n> Compressing assets...\n> Implementing intersection observers for lazy loading.\n> System operating at 99.9% efficiency."
        }
    };

    let typingTimeout;

    // Typewriter function
    function typeWriter(text, element, speed = 30) {
        let i = 0;
        element.innerHTML = ''; // Clear previous text
        
        function type() {
            if (i < text.length) {
                // Handle newlines properly
                if (text.charAt(i) === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML += text.charAt(i);
                }
                i++;
                typingTimeout = setTimeout(type, speed);
            }
        }
        clearTimeout(typingTimeout);
        type();
    }

    // Event Listeners for buttons
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Get mode
            const mode = this.getAttribute('data-mode');
            const data = aiData[mode];

            // Update terminal
            commandElement.textContent = data.command;
            
            // Start typing effect
            outputElement.innerHTML = ''; // Clear immediately
            typeWriter(data.text, outputElement);
        });
    });

    // Initial load
    typeWriter(aiData.analyze.text, outputElement);
});
document.addEventListener('DOMContentLoaded', () => {
    const avatarContainer = document.querySelector('.hero-image-container');
    const insightText = document.getElementById('insight-text');
    
    const insights = [
        "Subject: Harshit. Traits: High-level curiosity detected.",
        "Encoding Style: Pixel Perfect. Status: Building the future.",
        "Location: Indore Node. Neural Network: Optimized.",
        "Activity: Documenting Wildlife & Distributed Systems.",
        "Gemini Note: Subject likes clean code and sharp pixels."
    ];

    if (avatarContainer) {
        avatarContainer.addEventListener('mouseenter', () => {
            // Randomly select an insight on each hover
            const randomInsight = insights[Math.floor(Math.random() * insights.length)];
            insightText.textContent = randomInsight;
        });
    }
});
// AI Vision Logic
document.addEventListener('DOMContentLoaded', () => {
    const visual = document.querySelector('.hero-visual');
    const insightText = document.querySelector('.insight-data');
    const aiStatus = document.getElementById('ai-status');

    const profileInsights = [
        "Core: Researcher. Focus: Scalability.",
        "Detected: High Proficiency in JS/Python.",
        "Mode: Creative Explorer. Status: Active.",
        "Tech Stack: Modern. Vibe: Minimalist.",
        "Indore Node: Online. Latency: 5ms."
    ];

    if (visual) {
        visual.addEventListener('mouseenter', () => {
            aiStatus.textContent = "Analyzing Metadata...";
            const randomInsight = profileInsights[Math.floor(Math.random() * profileInsights.length)];
            
            // Text change effect
            setTimeout(() => {
                insightText.textContent = randomInsight;
                aiStatus.textContent = "Scan Complete";
            }, 500);
        });

        visual.addEventListener('mouseleave', () => {
            aiStatus.textContent = "Neural Link Active";
        });
    }
});
// AI Avatar Interaction
const avatarZone = document.querySelector('.avatar-container');
const statusDisplay = document.getElementById('status-text');

if (avatarZone) {
    const dataInsights = [
        "ANALYSING DATA...",
        "PATTERN: EXPLORER",
        "BIO: DEVELOPER",
        "LOCATION: INDORE",
        "READY TO BUILD"
    ];

    let currentIdx = 0;

    avatarZone.addEventListener('mouseenter', () => {
        // Change status text on hover
        const cycleText = setInterval(() => {
            statusDisplay.textContent = dataInsights[currentIdx];
            currentIdx = (currentIdx + 1) % dataInsights.length;
        }, 1000);

        avatarZone.addEventListener('mouseleave', () => {
            clearInterval(cycleText);
            statusDisplay.textContent = "SYSTEM ACTIVE";
        }, { once: true });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const portal = document.querySelector('.ai-avatar-portal');
    const nodeText = document.getElementById('node-text');

    if (portal) {
        portal.addEventListener('mouseenter', () => {
            nodeText.textContent = "EXTRACTING_METADATA...";
        });
        portal.addEventListener('mouseleave', () => {
            nodeText.textContent = "AI_LINK_ESTABLISHED";
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    const poetryContents = document.querySelectorAll('.poetry-content');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.dataset.lang;

            // Update Buttons
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update Content
            poetryContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `poetry-${selectedLang}`) {
                    content.classList.add('active');
                }
            });
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Reveal Timeline Nodes on Scroll
    const nodes = document.querySelectorAll('.journey-node-mature');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    nodes.forEach(node => observer.observe(node));

    // Logical Logic: Uncertainty Factor (0 to 1)
    // Randomly pulsating the last node's light to show life's uncertainty
    const activeMarker = document.querySelector('.active-node .node-marker-inner');
    if (activeMarker) {
        setInterval(() => {
            activeMarker.style.opacity = Math.random() > 0.5 ? "1" : "0.3";
        }, 1000);
    }
});