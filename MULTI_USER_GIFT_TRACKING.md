# Multi-User Gift Registry Backend Implementation Guide

## Option 1: Simple Backend with Firebase/Supabase

### Firebase Setup:
```javascript
// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your config
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### Updated GiftRegistry Component:
```javascript
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

// Replace localStorage logic with:
useEffect(() => {
  const unsubscribe = onSnapshot(doc(db, 'wedding', 'gifts'), (doc) => {
    if (doc.exists()) {
      setGifts(doc.data().items || initialGifts);
    }
  });
  return unsubscribe;
}, []);

// Replace confirmHoneymoonPurchase with:
const confirmHoneymoonPurchase = async () => {
  if (!selectedGift || !buyerName.trim()) return;
  
  const updatedGifts = gifts.map(gift => 
    gift.id === selectedGift 
      ? { ...gift, purchased: true, purchasedBy: buyerName.trim() }
      : gift
  );
  
  await updateDoc(doc(db, 'wedding', 'gifts'), {
    items: updatedGifts
  });
  
  setSelectedGift(null);
  setBuyerName("");
  alert("Thank you! We've marked this as purchased.");
};
```

## Option 2: Simple Node.js/Express Backend

### Backend API:
```javascript
// server.js
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Get all gifts
app.get('/api/gifts', (req, res) => {
  const gifts = JSON.parse(fs.readFileSync('gifts.json', 'utf8'));
  res.json(gifts);
});

// Update gift purchase status
app.post('/api/gifts/:id/purchase', (req, res) => {
  const { id } = req.params;
  const { purchasedBy } = req.body;
  
  const gifts = JSON.parse(fs.readFileSync('gifts.json', 'utf8'));
  const giftIndex = gifts.findIndex(g => g.id === id);
  
  if (giftIndex !== -1) {
    gifts[giftIndex].purchased = true;
    gifts[giftIndex].purchasedBy = purchasedBy;
    fs.writeFileSync('gifts.json', JSON.stringify(gifts, null, 2));
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Gift not found' });
  }
});

app.listen(3001);
```

### Frontend API calls:
```javascript
// In GiftRegistry.tsx
const confirmHoneymoonPurchase = async () => {
  try {
    const response = await fetch(`/api/gifts/${selectedGift}/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ purchasedBy: buyerName.trim() })
    });
    
    if (response.ok) {
      // Refresh gifts list
      fetchGifts();
      setSelectedGift(null);
      setBuyerName("");
      alert("Thank you! We've marked this as purchased.");
    }
  } catch (error) {
    alert("Error updating gift status. Please try again.");
  }
};
```

## Option 3: Serverless with Netlify Functions

### Netlify Function:
```javascript
// netlify/functions/update-gift.js
exports.handler = async (event, context) => {
  const { giftId, purchasedBy } = JSON.parse(event.body);
  
  // Update your database/file here
  // Return updated gift list
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
```

## Recommended Approach for Your Wedding Site:

### **Firebase (Easiest)**
1. **Pros**: Real-time updates, no server management, free tier
2. **Setup**: 15 minutes
3. **Cost**: Free for small usage

### **Implementation Steps:**
1. Create Firebase project
2. Add Firebase SDK to your project
3. Replace localStorage with Firestore
4. Deploy - all users see real-time updates!

### **Quick Firebase Setup:**
```bash
npm install firebase
```

Then replace the localStorage logic in GiftRegistry.tsx with the Firebase code above.

## Security Considerations:
- Add Firebase Security Rules to prevent abuse
- Consider adding authentication for purchases
- Rate limiting for API calls

## Testing:
1. Open the site in multiple browser windows/devices
2. Mark a gift as purchased in one window
3. Verify it updates in real-time in other windows