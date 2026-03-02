# Firebase Quick Start - Reewa Homes

## ✅ What's Done

All code has been updated to use Firebase instead of Supabase:
- Firebase Authentication for login
- Firestore Database for properties and inquiries
- All HTML files updated with Firebase SDKs
- All JavaScript files rewritten for Firebase

## 🚀 Setup Steps (15 minutes)

### Step 1: Create Firebase Project (5 min)

1. Go to: https://console.firebase.google.com/
2. Click **Add project**
3. Name: `reewa-homes`
4. Disable Google Analytics (optional)
5. Click **Create project**

### Step 2: Get Firebase Config (2 min)

1. Click the **Web icon** (</>)
2. App name: `Reewa Homes`
3. Copy the `firebaseConfig` object
4. Open `firebase-config.js`
5. Replace the placeholder values with your config

### Step 3: Enable Authentication (2 min)

1. Go to **Authentication** > **Get started**
2. Click **Email/Password**
3. Enable it
4. Click **Save**

### Step 4: Create Firestore Database (3 min)

1. Go to **Firestore Database** > **Create database**
2. Select **Start in production mode**
3. Choose location: **asia-south1 (Mumbai)**
4. Click **Enable**

### Step 5: Set Firestore Rules (2 min)

1. Click **Rules** tab
2. Paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /inquiries/{inquiryId} {
      allow create: if true;
      allow read, update: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

### Step 6: Create Admin User (1 min)

1. Go to **Authentication** > **Users**
2. Click **Add user**
3. Email: your-email@example.com
4. Password: your-password
5. Click **Add user**

## 🎉 You're Done!

Test your website:
1. Open `index.html` - see properties
2. Submit an inquiry
3. Go to `login.html` - login with your credentials
4. View inquiries in admin panel

## 📊 What Works Now

✅ Browse properties (demo data shows automatically)
✅ Submit inquiries (saved to Firebase)
✅ Admin login (Firebase Authentication)
✅ Add/Edit/Delete properties (saved to Firebase)
✅ View all inquiries with customer details
✅ Update inquiry status
✅ Works in India (Firebase is not blocked)

## 🔥 Firebase Advantages

- Free tier: 50K reads, 20K writes per day
- Real-time updates
- Works in India
- No backend code needed
- Automatic scaling
- Built-in security

---

Your website is now powered by Firebase! 🚀
