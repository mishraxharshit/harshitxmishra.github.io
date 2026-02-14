// ==========================================
// LEARN PAGE INTERACTIVE FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // SIDEBAR NAVIGATION
    // ==========================================
    
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.learn-sidebar');
    const topicHeaders = document.querySelectorAll('.topic-header');
    const topicItems = document.querySelectorAll('.topic-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Toggle sidebar on mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // Topic group expand/collapse
    topicHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            const items = document.getElementById(`${topic}-items`);
            
            // Toggle active state
            this.classList.toggle('active');
            items.classList.toggle('active');
        });
    });
    
    // Topic item navigation
    topicItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (!targetSection) return;
            
            // Remove active class from all items
            topicItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            targetSection.classList.add('active');
            
            // Scroll to top of content
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetId}`);
        });
    });
    
    // ==========================================
    // LOAD CONTENT ON PAGE LOAD
    // ==========================================
    
    // Check if there's a hash in URL
    const hash = window.location.hash;
    if (hash) {
        const targetSection = document.querySelector(hash);
        const targetLink = document.querySelector(`a[href="${hash}"]`);
        
        if (targetSection && targetLink) {
            // Hide all sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            targetSection.classList.add('active');
            
            // Activate link
            topicItems.forEach(i => i.classList.remove('active'));
            targetLink.classList.add('active');
            
            // Expand parent topic group
            const parentTopic = targetLink.closest('.topic-items');
            const parentHeader = parentTopic ? parentTopic.previousElementSibling : null;
            
            if (parentHeader && parentTopic) {
                parentHeader.classList.add('active');
                parentTopic.classList.add('active');
            }
        }
    }
    
    // ==========================================
    // CODE EXECUTION (PLACEHOLDER)
    // ==========================================
    
    const runCodeButtons = document.querySelectorAll('.run-code-btn');
    
    runCodeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Placeholder for code execution
            alert('Code execution coming soon! This will run the code in an interactive environment.');
        });
    });
    
    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ==========================================
    // LOAD ML VISUAL MAP CONTENT
    // ==========================================
    
    loadMLVisualMap();
    
    // ==========================================
    // SEARCH FUNCTIONALITY (FUTURE)
    // ==========================================
    
    // TODO: Add search bar in sidebar
    // TODO: Implement fuzzy search across all content
    
    // ==========================================
    // PROGRESS TRACKING (FUTURE)
    // ==========================================
    
    // TODO: Track which topics user has visited
    // TODO: Show completion percentage
    // TODO: Add checkmarks to completed topics
    
});

// ==========================================
// LOAD ML VISUAL MAP CONTENT
// ==========================================

function loadMLVisualMap() {
    const mlVisualMap = document.getElementById('ml-visual-map');
    if (!mlVisualMap) return;
    
    // This is a placeholder. You can load the full ML visual map content here
    // For now, we'll add a message
    mlVisualMap.innerHTML = `
        <div class="phase-label"><span class="dot" style="background:#4FC3F7"></span> Full Visual Map Loading...</div>
        <div class="card">
            <div class="card-header">
                <div>
                    <div class="card-title">📚 Complete ML Visual Map</div>
                    <div class="card-sub">The complete visual map with all concepts, graphs, and interactive elements is being integrated.</div>
                </div>
            </div>
            <div class="analogy">
                Navigate through the sidebar to explore individual topics, or wait for the full integrated experience.
            </div>
            <div class="insight">
                Each section in the sidebar contains detailed explanations, visualizations, and examples.
                <span>Start with "Math Foundations" if you're new to ML!</span>
            </div>
        </div>
    `;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Animate bars when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.bar-fill');
            bars.forEach(bar => {
                bar.style.animation = 'growW 1.4s cubic-bezier(0.16,1,0.3,1) both';
            });
        }
    });
}, observerOptions);

// Observe all cards with bar charts
document.addEventListener('DOMContentLoaded', () => {
    const barCharts = document.querySelectorAll('.bar-chart-wrap');
    barCharts.forEach(chart => {
        observer.observe(chart);
    });
});

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', function(e) {
    // Escape key to close sidebar on mobile
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.learn-sidebar');
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
    
    // Arrow keys for next/previous topic
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeItem = document.querySelector('.topic-item.active');
        if (!activeItem) return;
        
        const allItems = Array.from(document.querySelectorAll('.topic-item'));
        const currentIndex = allItems.indexOf(activeItem);
        
        let nextIndex;
        if (e.key === 'ArrowRight' && currentIndex < allItems.length - 1) {
            nextIndex = currentIndex + 1;
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            nextIndex = currentIndex - 1;
        }
        
        if (nextIndex !== undefined) {
            allItems[nextIndex].click();
        }
    }
});

// ==========================================
// EXPORT FOR USE IN OTHER SCRIPTS
// ==========================================

window.learnPage = {
    navigateToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        const link = document.querySelector(`a[href="#${sectionId}"]`);
        if (section && link) {
            link.click();
        }
    },
    
    getCurrentSection: function() {
        const activeSection = document.querySelector('.content-section.active');
        return activeSection ? activeSection.id : null;
    }
};
