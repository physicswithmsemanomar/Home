// Load navbar into all pages - positioned in the header
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        // Load navbar HTML
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                // Insert navbar inside the header element only if it is empty
                const header = document.getElementById('site-header');
                if (header) {
                    if (!header.querySelector('#navbar')) {
                        header.innerHTML = data;
                        console.log('Navbar loaded successfully in header');
                    } else {
                        console.log('Navbar already present in header; skipping load');
                    }
                } else {
                    console.error('Header element not found, using fallback');
                    // Fallback: insert at the beginning of body
                    document.body.insertAdjacentHTML('afterbegin', data);
                }

                // Update active link based on current page
                updateActiveNavLink();

                // Initialize navbar scroll effect
                initNavbarScroll();
            })
            .catch(error => console.error('Error loading navbar:', error));
    }, 100);
});

function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes('laws_page.html') && currentPath.includes('laws_page.html'))) {
            link.style.color = 'var(--neon-cyan)';
        } else if (href && href.includes('#') && !currentPath.includes('laws_page.html')) {
            // For main page sections
            const sectionId = href.split('#')[1];
            if (sectionId && window.location.hash === '#' + sectionId) {
                link.style.color = 'var(--neon-cyan)';
            }
        }
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
}

// Mobile menu toggle function
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('open');
    }
}

// Language toggle function
function toggleLang() {
    alert('Language switching feature coming soon!');
}