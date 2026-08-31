import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5MhE5RkPvf3Nwz5G3F_RfqTok59Lw53M",
  authDomain: "wedding-website-174f9.firebaseapp.com",
  projectId: "wedding-website-174f9",
  storageBucket: "wedding-website-174f9.firebasestorage.app",
  messagingSenderId: "796313870387",
  appId: "1:796313870387:web:d0d64293271b89d7ddc346",
  measurementId: "G-HHY6BM3KVL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const items = [
  {
    status: "lost",
    itemName: "Mini keychain camera (1 of 3)",
    description:
      "One of our tiny keychain cameras has gone missing from the wedding — if you spot it lying around, we'd love it back!",
    reporterName: "Andrew & Charley",
    contact: "",
    createdAt: Date.now(),
  },
  {
    status: "lost",
    itemName: "Mini keychain camera (2 of 3)",
    description:
      "Another one of our little keychain cameras is missing — keep an eye out!",
    reporterName: "Andrew & Charley",
    contact: "",
    createdAt: Date.now() + 1,
  },
  {
    status: "lost",
    itemName: "Mini keychain camera (3 of 3)",
    description:
      "The third of our missing keychain cameras — if it turns up, please let us know.",
    reporterName: "Andrew & Charley",
    contact: "",
    createdAt: Date.now() + 2,
  },
];

for (const item of items) {
  const ref = await addDoc(collection(db, "lost-and-found"), item);
  console.log("Added", item.itemName, "->", ref.id);
}
process.exit(0);
