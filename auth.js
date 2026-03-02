// Firebase Authentication for Reewa Homes - Google Sign-In
console.log('auth.js loaded');

// List of admin emails - CHANGE THESE TO YOUR EMAIL(S)
const ADMIN_EMAILS = [
    'omkrrishbgs@gmail.com', // Primary admin email
    'second.admin@example.com', // add the additional admin email here
    '74mkumar@gmail.com' // additional admin account
];

class AuthSystem {
    constructor() {
        this.auth = window.firebaseAuth;
        this.currentUser = null;
        this.isAdmin = false;
        this.init();
    }
    
    async init() {
        // Listen for auth state changes
        this.auth.onAuthStateChanged((user) => {
            this.currentUser = user;
            if (user) {
                this.isAdmin = ADMIN_EMAILS.includes(user.email);
                console.log('User:', user.email, '| Is Admin:', this.isAdmin);
            } else {
                this.isAdmin = false;
            }
            this.displayUserInfo();
        });
        
        // Initialize login form
        if (document.getElementById('login-form')) {
            this.initLoginForm();
        }
        
        // Check page access
        await this.checkPageAccess();
        
        // Initialize logout
        this.initLogout();
    }
    
    initLoginForm() {
        const form = document.getElementById('login-form');
        
        // Hide email/password fields and show Google button
        form.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <button type="button" id="google-signin-btn" class="submit-btn" style="background: #3b82f6; display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin: 0 auto; border: none;">
                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Sign in with Google
                </button>
                <p style="margin-top: 1rem; color: #666; font-size: 0.9rem;">Login to browse properties and submit inquiries</p>
            </div>
        `;
        
        document.getElementById('google-signin-btn').addEventListener('click', () => {
            this.handleGoogleSignIn();
        });
        
        this.checkLoginLogo();
    }
    
    async handleGoogleSignIn() {
        const btn = document.getElementById('google-signin-btn');
        btn.disabled = true;
        btn.textContent = 'Signing in...';
        
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await this.auth.signInWithPopup(provider);
            const user = result.user;
            
            // Check if user is admin
            const isAdmin = ADMIN_EMAILS.includes(user.email);
            
            this.showSuccess('Login successful!');
            
            // Redirect based on user role
            setTimeout(() => {
                if (isAdmin) {
                    console.log('Admin login - redirecting to admin.html');
                    window.location.href = 'admin.html';
                } else {
                    console.log('User login - redirecting to index.html');
                    window.location.href = 'index.html';
                }
            }, 1000);
        } catch (error) {
            console.error('Google sign-in error:', error);
            this.showError(error.message);
            btn.disabled = false;
            btn.innerHTML = `
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Sign in with Google
            `;
        }
    }
    
    async logout() {
        await this.auth.signOut();
        this.currentUser = null;
        window.location.href = 'login.html';
    }
    
    async checkPageAccess() {
        const currentPage = window.location.pathname.split('/').pop();
        const adminPages = ['admin.html'];
        
        // if user is on the login page and already authenticated, redirect appropriately
        if (currentPage === 'login.html') {
            if (await this.isLoggedIn()) {
                if (this.isAdmin) {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
                return;
            }
        }

        if (adminPages.includes(currentPage)) {
            // Check if page requires admin access
            if (!await this.isLoggedIn()) {
                window.location.href = 'login.html';
                return;
            }
            
            // Check if user is admin
            if (!this.isAdmin) {
                alert('Access denied. This page is for administrators only.');
                window.location.href = 'index.html';
                return;
            }
        }
    }
    
    async isLoggedIn() {
        return new Promise((resolve) => {
            this.auth.onAuthStateChanged((user) => {
                resolve(user !== null);
            });
        });
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    getIsAdmin() {
        return this.isAdmin;
    }
    
    initLogout() {
        const logoutBtns = document.querySelectorAll('.logout-btn');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    await this.logout();
                }
            });
        });
    }
    
    displayUserInfo() {
        if (this.currentUser) {
            const userName = document.getElementById('user-name');
            const adminName = document.getElementById('admin-name');
            const userAvatar = document.getElementById('user-avatar');
            
            const displayName = this.currentUser.displayName || this.currentUser.email;
            const initial = displayName.charAt(0).toUpperCase();
            
            if (userName) userName.textContent = displayName;
            if (adminName) adminName.textContent = displayName;
            if (userAvatar) userAvatar.textContent = initial;
        }
    }
    
    showError(message) {
        alert('Error: ' + message);
    }
    
    showSuccess(message) {
        alert(message);
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
}

// Initialize authentication system
const authSystem = new AuthSystem();
window.auth = authSystem;
