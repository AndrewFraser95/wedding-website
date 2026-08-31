# Firebase Setup Guide for Wedding Website

## 🔥 Getting Started with Firebase

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `wedding-website` (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Create project

### Step 2: Setup Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select a location close to your users (e.g., `europe-west1` for UK)

### Step 3: Get Firebase Configuration
1. In Firebase Console, click the gear icon → Project settings
2. Scroll down to "Your apps" section
3. Click "Web app" icon (`</>`)
4. Register your app with name: "Wedding Website"
5. Copy the configuration object

### Step 4: Update Firebase Config
Replace the placeholder values in `src/lib/firebase.ts` with your actual config:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyExample_Your_Actual_API_Key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

### Step 5: Setup Firestore Security Rules
In Firebase Console → Firestore Database → Rules, add these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to gifts for everyone
    match /wedding/gifts {
      allow read: if true;
      allow write: if true; // For now - you can add authentication later
    }
    
    // Allow write access to RSVP submissions for everyone
    match /rsvp-submissions/{document} {
      allow create: if true;
      allow read: if false; // Only you should read RSVPs
    }

    match /contributions/{document} {
        allow create: if true;
    		allow read: if false; // Only you should read contributions
    }

    match /friday-night-preorders/{document} {
  		allow create: if true;
  		allow read: if true;
		}

    // Lost & Found: guests can post and read items. No image uploads -
    // photos (if any) are added manually via this console.
    match /lost-and-found/{document} {
      allow read: if true;
      allow create: if true;
    }
  }
}
```

### Step 6: Initialize Data in Firestore
The Gift Registry will automatically create the initial document when first loaded. However, you can manually set it up:

1. Go to Firestore Database in Firebase Console
2. Click "Start collection"
3. Collection ID: `wedding`
4. Document ID: `gifts`
5. Add field:
   - Field: `items`
   - Type: `array`
   - Value: (empty for now - the app will populate it)

### Step 7: Test Your Setup
1. Start your development server: `npm run dev`
2. Navigate to the Gift Registry page
3. Try marking a honeymoon contribution as purchased
4. Check Firestore Console to see if data appears
5. Open another browser tab - changes should sync in real-time!

### Step 8: Deploy to Production
Before deploying:

1. **Update Security Rules** (more restrictive):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /wedding/gifts {
      allow read: if true;
      // Only allow writes to specific fields
      allow update: if request.writeFields.hasOnly(['items']) 
                    && resource.data.keys().hasAll(['items']);
    }
    
    match /rsvp-submissions/{document} {
      allow create: if request.auth == null; // Anonymous submissions OK
      allow read: if false;
    }
  }
}
```

2. **Environment Variables** (optional but recommended):
   - Create `.env.local` file
   - Move sensitive config to environment variables
   - Update `firebase.ts` to use `process.env.VITE_FIREBASE_API_KEY` etc.

## 📊 Monitoring Your Data

### View RSVP Submissions
1. Firebase Console → Firestore Database
2. Navigate to `rsvp-submissions` collection
3. Each submission will be a separate document with timestamp

### View Gift Registry Status
1. Firebase Console → Firestore Database  
2. Navigate to `wedding` → `gifts` document
3. See the `items` array with purchase status

### Export Data
You can export RSVP data to CSV/JSON from Firebase Console for planning purposes.

## 🔒 Security Best Practices

### For Production:
1. **Restrict API keys** to your domain in Firebase Console
2. **Enable App Check** to prevent abuse
3. **Set up monitoring** for unusual activity
4. **Regular backup** of Firestore data

### Rate Limiting:
Firebase automatically handles most rate limiting, but consider:
- Adding client-side debouncing for rapid clicks
- Monitoring usage in Firebase Console

## 🎯 What's Working Now

✅ **Gift Registry**: Real-time updates across all users  
✅ **RSVP Submissions**: Stored securely in Firestore  
✅ **Offline Support**: Firebase handles offline/online sync  
✅ **Mobile Friendly**: Works on all devices  

## 🆘 Troubleshooting

### Common Issues:

**"Permission denied" errors:**
- Check Firestore security rules
- Ensure rules allow the operations you're trying

**Config errors:**
- Double-check all values in `firebase.ts`
- Ensure no typos in project ID, API key, etc.

**Data not syncing:**
- Check browser console for errors
- Verify internet connection
- Check Firebase Console for any service issues

**Development vs Production:**
- Use different Firebase projects for dev/prod
- Update config accordingly when deploying

## 🚀 Next Steps

Once Firebase is set up:
1. Test thoroughly on multiple devices
2. Set up Firebase hosting for easy deployment
3. Consider adding authentication for admin features
4. Set up backup/export procedures for your data