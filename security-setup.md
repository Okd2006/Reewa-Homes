# 🔐 Security Setup Guide

## Important: Change Default Credentials

**⚠️ SECURITY WARNING**: The default login credentials are for demo purposes only. You MUST change them before going live.

### Default Credentials (CHANGE THESE!)
- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

## How to Change Credentials

### Method 1: Using Browser Console (Recommended)

1. **Login as admin** with default credentials
2. **Open browser console** (F12 → Console tab)
3. **Run this command** to change admin credentials:
```javascript
auth.changeAdminCredentials('your_new_username', 'your_new_password');
```

### Method 2: Edit the Code Directly

1. **Open `auth.js` file**
2. **Find this section** (around line 6):
```javascript
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
```

3. **Replace with your credentials**:
```javascript
this.users = {
    // Your admin credentials
    your_dad_username: {
        password: 'your_secure_password_123',
        role: 'admin',
        name: 'Your Dad Name'
    },
    // Your user credentials (optional)
    viewer: {
        password: 'viewer_password_456',
        role: 'user',
        name: 'Property Viewer'
    }
};
```

## Password Security Tips

### Strong Password Requirements:
- ✅ At least 12 characters long
- ✅ Mix of uppercase and lowercase letters
- ✅ Include numbers and special characters
- ✅ Avoid common words or personal information

### Example Strong Passwords:
- `ReewaHomes2024!@#`
- `MyRealEstate$ecure789`
- `PropertyAdmin#2024Safe`

## User Roles Explained

### Admin Role (`admin`)
- ✅ Full access to admin panel
- ✅ Add, edit, delete properties
- ✅ Manage all website content
- ✅ View all inquiries

### User Role (`user`)
- ✅ Browse all properties
- ✅ Submit inquiries
- ✅ View property details
- ❌ Cannot modify properties

## Additional Security Measures

### 1. Enable HTTPS (Recommended)
- Use GitHub Pages with custom domain
- Or deploy to Netlify/Vercel (automatic HTTPS)

### 2. Regular Password Updates
- Change passwords every 3-6 months
- Use different passwords for different accounts

### 3. Backup Your Data
- Properties are stored in browser localStorage
- Export property data regularly
- Keep backups of your website files

## Testing Your New Credentials

1. **Logout** from current session
2. **Go to login page**: `yoursite.com/login.html`
3. **Test admin login** with new credentials
4. **Test user login** with new credentials
5. **Verify access levels** work correctly

## Emergency Access Recovery

If you forget your credentials:

1. **Clear browser localStorage**:
   - Open browser console (F12)
   - Run: `localStorage.clear()`
   - Refresh the page

2. **Reset to defaults**:
   - The system will use default credentials again
   - Change them immediately after login

## Production Deployment Checklist

Before making your website public:

- [ ] Changed default admin credentials
- [ ] Changed default user credentials (or removed)
- [ ] Tested login functionality
- [ ] Updated contact information
- [ ] Added your logo
- [ ] Added sample properties
- [ ] Tested on mobile devices
- [ ] Verified HTTPS is working

## Advanced Security (Optional)

For enhanced security, consider:

### 1. Two-Factor Authentication
- Add phone number verification
- Use email confirmation codes

### 2. Session Timeout
- Auto-logout after inactivity
- Require re-login for sensitive actions

### 3. IP Restrictions
- Limit admin access to specific IP addresses
- Add login attempt limits

### 4. Database Integration
- Move from localStorage to secure database
- Add proper user management system

## Support

If you need help with security setup:
1. Check browser console for error messages
2. Test in incognito/private browsing mode
3. Ensure JavaScript is enabled
4. Try different browsers

---

**Remember**: Security is crucial for protecting your business data. Always use strong, unique passwords and keep them secure!

🔒 **Your website's security is only as strong as your weakest password.**