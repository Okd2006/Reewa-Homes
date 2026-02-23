// Dashboard functionality for regular users
class Dashboard {
    constructor() {
        this.init();
    }
    
    init() {
        // Check authentication
        if (!auth.isLoggedIn()) {
            window.location.href = 'login.html';
            return;
        }
        
        // Initialize dashboard
        this.loadUserInfo();
        this.loadStats();
        this.checkLogo();
        
        // Initialize property functionality (reuse from main script)
        if (typeof displayProperties === 'function') {
            displayProperties();
        }
    }
    
    loadUserInfo() {
        const user = auth.getCurrentUser();
        if (user) {
            document.getElementById('user-name').textContent = user.name;
            document.getElementById('user-role').textContent = `Logged in as ${user.role}`;
            
            // Set avatar initial
            const avatar = document.getElementById('user-avatar');
            avatar.textContent = user.name.charAt(0).toUpperCase();
        }
    }
    
    loadStats() {
        // Load properties from localStorage
        const properties = JSON.parse(localStorage.getItem('properties')) || [];
        
        // Calculate statistics
        const totalProperties = properties.length;
        const forSale = properties.filter(p => p.type === 'sale').length;
        const forRent = properties.filter(p => p.type === 'rent').length;
        const categories = [...new Set(properties.map(p => p.category))].length;
        
        // Update stat displays with animation
        this.animateCounter('total-properties', totalProperties);
        this.animateCounter('for-sale', forSale);
        this.animateCounter('for-rent', forRent);
        this.animateCounter('categories', categories);
    }
    
    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const duration = 1000; // 1 second
        const steps = 30;
        const stepValue = targetValue / steps;
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += stepValue;
            if (currentValue >= targetValue) {
                element.textContent = targetValue;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentValue);
            }
        }, duration / steps);
    }
    
    checkLogo() {
        const logoImg = document.getElementById('dashboard-logo-img');
        const logoText = document.querySelector('.logo-text');
        
        if (logoImg && logoText) {
            const img = new Image();
            img.onload = function() {
                logoImg.style.display = 'block';
                logoText.textContent = 'Dashboard';
            };
            img.onerror = function() {
                logoImg.style.display = 'none';
                logoText.textContent = 'Reewa Homes';
            };
            img.src = 'logo.png';
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

// Smooth scrolling for dashboard links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});