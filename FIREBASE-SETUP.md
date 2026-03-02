# Firebase Setup Guide for Reewa Homes

## Step 1: Create Firebase Project

1. Go to: https://console.firebase.google.com/
2. Click **Add project** or **Create a project**
3. Enter project name: `reewa-homes` (or any name you prefer)
4. Click **Continue**
5. Disable Google Analytics (optional) or enable it
6. Click **Create project**
7. Wait for project creation, then click **Continue**

## Step 2: Get Firebase Configuration

1. In Firebase Console, click the **Web icon** (</>) to add a web app
2. Register app name: `Reewa Homes Website`
3. Check **"Also set up Firebase Hosting"** (optional)
4. Click **Register app**
5. Copy the `firebaseConfig` object (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

6. Open `firebase-config.js` and replace the placeholder values with your actual config

## Step 3: Enable Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **Get started**
3. Click **Sign-in method** tab
4. Click **Email/Password**
5. Enable the first toggle (Email/Password)
6. Click **Save**

## Step 4: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click **Create database**
3. Select **Start in production mode** (we'll add rules later)
4. Click **Next**
5. Choose your location (closest to India: `asia-south1` - Mumbai)
6. Click **Enable**

## Step 5: Configure Firestore Security Rules

1. In Firestore Database, click **Rules** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Properties - anyone can read, only authenticated users can write
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Inquiries - anyone can create, only authenticated users can read/update
    match /inquiries/{inquiryId} {
      allow create: if true;
      allow read, update: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## Step 6: Create Admin User

1. Go to **Authentication** > **Users** tab
2. Click **Add user**
3. Enter:
   - Email: your-email@example.com
   - Password: your-secure-password
4. Click **Add user**

## Step 7: Test Your Website

1. Open `index.html` in browser
2. Browse properties
3. Submit an inquiry
4. Go to `login.html`
5. Login with your admin credentials
6. View inquiries in admin panel

## Database Structure

### Properties Collection
- title (string)
- category (string): residential, commercial, plots
- type (string): sale, rent
- location (string)
- price (string)
- rent_price (string)
- bedrooms (number)
- bathrooms (number)
- area (string)
- description (string)
- media (array): [{type: 'image', url: '...'}]
- createdAt (timestamp)
- createdBy (string): user ID

### Inquiries Collection
- propertyId (string)
- propertyTitle (string)
- name (string)
- email (string)
- phone (string)
- inquiryType (string): general, viewing, purchase, rental
- message (string)
- status (string): pending, contacted, closed
- createdAt (timestamp)

## Features

- ✅ User authentication (email/password)
- ✅ Property management (add/edit/delete)
- ✅ Inquiry tracking with customer details
- ✅ Real-time updates
- ✅ Secure access control
- ✅ Works in India (not blocked)

## Troubleshooting

**Can't login?**
- Make sure you created a user in Firebase Authentication
- Check browser console for errors

**Inquiries not showing?**
- Check Firestore rules are published
- Verify you're logged in as admin

**Properties not loading?**
- Check Firebase config is correct
- Verify Firestore is enabled

---

Your website is now powered by Firebase! 🎉
