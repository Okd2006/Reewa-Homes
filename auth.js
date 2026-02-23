// Authentication system for Reewa Homes
class AuthSystem {
    constructor() {
        this.users = {
            // Admin credentials - Change these for production
            admin: {
                password: 'admin123',
                role: 'admin',
                name: 'Administrator'
            },
            // Regular user credentials - Change these for production
            user: {
                password: 'user123',
                role: 'user',
                name: 'Property Viewer'
            }
        };
        
        this.currentUser = null;
        this.init();
    }
    
    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
        
        // Initialize login form if on login page
        if (document.getElementById('login-form')) {
            this.initLoginForm();
        }
        
        // Check authentication on protected pages
        this.checkPageAccess();
        
        // Initialize logout functionality
        this.initLogout();
    }
    
    initLoginForm() {
        const form = document.getElementById('login-form');
        const userTypeBtns = document.querySelectorAll('.user-type-btn');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        
        // User type selector
        userTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                userTypeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Pre-fill demo credentials
                const type = btn.dataset.type;
                if (type === 'admin') {
                    usernameInput.value = 'admin';
                    passwordInput.value = 'admin123';
                } else {
                    usernameInput.value = 'user';
                    passwordInput.value = 'user123';
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        // Logo handling
        this.checkLoginLogo();
    }
    
    handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('login-btn');
        
        // Show loading state
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';
        
        // Simulate network delay for better UX
        setTimeout(() => {
            if (this.validateCredentials(username, password)) {
                this.loginUser(username);
            } else {
                this.showError('Invalid username or password');
                loginBtn.disabled = false;
                loginBtn.textContent = 'Login';
            }
        }, 1000);
    }
    
    validateCredentials(username, password) {
        const user = this.users[username];
        return user && user.password === password;
    }
    
    loginUser(username) {
        const user = this.users[username];
        this.currentUser = {
            username: username,
            role: user.role,
            name: user.name,
            loginTime: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        this.showSuccess(`Welcome, ${user.name}!`);
        
        // Redirect based on role
        setTimeout(() => {
            if (user.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        }, 1500);
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
    
    checkPageAccess() {
        const currentPage = window.location.pathname.split('/').pop();
        const protectedPages = ['admin.html', 'dashboard.html'];
        
        if (protectedPages.includes(currentPage)) {
            if (!this.isLoggedIn()) {
                window.location.href = 'login.html';
                return;
            }
            
            // Check admin access
            if (currentPage === 'admin.html' && !this.isAdmin()) {
                window.location.href = 'dashboard.html';
                return;
            }
        }
    }
    
    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    initLogout() {
        const logoutBtns = document.querySelectorAll('.logout-btn');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    this.logout();
                }
            });
        });
    }
    
    showError(message) {
        const errorDiv = document.getElementById('error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 5000);
        }
    }
    
    showSuccess(message) {
        const successDiv = document.getElementById('success-message');
        if (successDiv) {
            successDiv.textContent = message;
            successDiv.style.display = 'block';
        }
    }
    
    checkLoginLogo() {
        const logoImg = document.getElementById('login-logo-img');
        const logoText = document.getElementById('login-logo-text');
        
        if (logoImg && logoText) {
            const img = new Image();
            img.onload = function() {
                logoImg.style.display = 'block';
                logoText.style.display = 'none';
            };
            img.onerror = function() {
                logoImg.style.display = 'none';
                logoText.style.display = 'block';
            };
            img.src = 'logo.png';
        }
    }
    
    // Method to change admin credentials (call this in console for security)
    changeAdminCredentials(newUsername, newPassword) {
        if (this.isAdmin()) {
            delete this.users.admin;
            this.users[newUsername] = {
                password: newPassword,
                role: 'admin',
                name: 'Administrator'
            };
            localStorage.setItem('adminCredentials', JSON.stringify({
                username: newUsername,
                password: newPassword
            }));
            alert('Admin credentials updated successfully!');
        } else {
            alert('Only admin can change credentials!');
        }
    }
}

// Initialize authentication system
const auth = new AuthSystem();

// Make auth available globally for debugging
window.auth = auth;