// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Active Link Indicator
function updateIndicator(target) {
    const activeLink = document.querySelector(`a[href="${target}"]`);
    const indicator = document.querySelector('.active-indicator');
    
    if (activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = document.querySelector('nav').getBoundingClientRect();
        
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.left = `${linkRect.left - navRect.left}px`;
    }
}

// Smooth Scroll with Indicator Update
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        updateIndicator(target);
        
        // Close mobile menu after click
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Scroll Animations and Active Section Detection
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const id = `#${entry.target.id}`;
            updateIndicator(id);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});