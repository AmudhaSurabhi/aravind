document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-menu a');
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const ctaButtons = document.querySelectorAll('.cta-button');

    // Navigation Menu Functions
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
    }

    function smoothScroll(targetElement) {
        if (targetElement) {
            closeMenu();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Event Handlers
    function handleHamburgerClick() {
        toggleMenu();
    }

    function handleNavLinkClick() {
        closeMenu();
    }

    function handleOutsideClick(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            closeMenu();
        }
    }

    function handleWindowResize() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    }

    function handleInternalLinkClick(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        smoothScroll(target);
    }

    function handleCtaButtonClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        smoothScroll(targetSection);
    }

    // Event Listeners
    hamburger.addEventListener('click', handleHamburgerClick);
    navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));
    document.addEventListener('click', handleOutsideClick);
    window.addEventListener('resize', handleWindowResize);
    internalLinks.forEach(anchor => anchor.addEventListener('click', handleInternalLinkClick));
    ctaButtons.forEach(button => button.addEventListener('click', handleCtaButtonClick));

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const root = document.documentElement;
    
    // Function to update theme
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateIcon(theme === 'light');
    }
    
    // Function to update icon
    function updateIcon(isLight) {
        themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Use saved preference if it exists
        setTheme(savedTheme);
    } else {
        // Check system preference if no saved preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
    
    // Listen for theme toggle clicks
    themeToggle.addEventListener('click', function() {
        const currentTheme = root.getAttribute('data-theme');
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only update theme if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});
