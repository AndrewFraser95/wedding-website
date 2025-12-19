import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { db } from "../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface GiftItem {
  id: string;
  name: string;
  description: string;
  price: string;
  type: "amazon" | "honeymoon";
  link?: string;
  purchased: boolean;
  purchasedBy?: string;
  image?: string;
  orderNumber?: string;
}

export default function GiftRegistry() {
  // Toggle this to false to show the full registry
  const showComingSoon = true;
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  // const [buyerName, setBuyerName] = useState("");
  // const [selectedGift, setSelectedGift] = useState<string | null>(null);
  // const [orderNumber, setOrderNumber] = useState("");
  // const [contributionAmount, setContributionAmount] = useState("");
  // const [loading, setLoading] = useState(true);

  // Load gifts from Firebase on mount
  useEffect(() => {
    const giftsRef = doc(db, 'wedding', 'gifts');
    
    const unsubscribe = onSnapshot(giftsRef, (docSnap) => {
      try {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.items && Array.isArray(data.items)) {
            setGifts(data.items);
            console.log("Loaded from Firebase:", data.items.length, "items");
          }
        } else {
          console.log("No Firebase document exists yet - please add gifts via admin");
          setGifts([]); // Empty state until admin adds gifts
        }
      } catch (error) {
        console.error("Error syncing with Firebase:", error);
        setGifts([]); // Empty state on error
      }
      // setLoading(false);
    }, (error) => {
      console.warn("Firebase connection failed:", error.message);
      setGifts([]); // Empty state on connection failure
      // setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Save to localStorage as backup when gifts change
  useEffect(() => {
    localStorage.setItem("wedding-gifts", JSON.stringify(gifts));
  }, [gifts]);

  // const handlePurchase = (giftId: string, type: "amazon" | "honeymoon") => {
  //   if (type === "amazon") {
  //     // For Amazon items, show the modal to collect order number
  //     setSelectedGift(giftId);
  //   } else {
  //     // For honeymoon items, show the modal to collect PayPal confirmation
  //     setSelectedGift(giftId);
  //   }
  // };

  return showComingSoon ? (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
        <div className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg flex flex-col items-center">
          <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="mb-2">
            <ellipse cx="30" cy="12" rx="28" ry="8" fill="#e9c46a" fillOpacity="0.13" />
            <ellipse cx="30" cy="12" rx="20" ry="3" fill="#b5835d" fillOpacity="0.10" />
          </svg>
          <h1 className="text-4xl md:text-5xl font-bold text-[#b5835d] mb-4 tracking-wider" style={{ fontFamily: "Playwrite AU QLD, cursive", letterSpacing: "0.08em" }}>
            Gift Registry
          </h1>
          <p className="text-[#e9c46a] font-semibold text-lg mb-6" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
            Coming soon!
          </p>
          <p className="text-[#7c4f2c] text-center text-lg mb-2" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
            We're working on a beautiful registry experience. Please check back soon!
          </p>
          <Link
            to="/"
            className="mt-8 inline-block px-8 py-3 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-md hover:bg-[#b5835d] transition"
            style={{ fontFamily: "Playwrite AU QLD, cursive", letterSpacing: "0.04em" }}
          >
            Back Home
          </Link>
        </div>
      </div>
    </Layout>
  ) : (
    <Layout children={undefined}></Layout>)
}
    // Original registry UI
  //   <Layout>
  //     {/* <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
  //       <div className="w-full max-w-4xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
  //         {loading && (
  //           <div className="flex justify-center items-center py-12">
  //             <div className="text-[#b5835d] text-lg" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //               Loading gifts...
  //             </div>
  //           </div>
  //         )}
  //         {!loading && (
  //           <>
  //             {/* Header */}
  //             <div className="mb-8 flex flex-col items-center">
  //               <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="mb-2">
  //                 <ellipse cx="30" cy="12" rx="28" ry="8" fill="#e9c46a" fillOpacity="0.13" />
  //                 <ellipse cx="30" cy="12" rx="20" ry="3" fill="#b5835d" fillOpacity="0.10" />
  //               </svg>
  //               <h1
  //                 className="text-4xl md:text-5xl font-bold text-[#b5835d] mb-2 tracking-wider"
  //                 style={{ fontFamily: "Playwrite AU QLD, cursive", letterSpacing: "0.08em" }}
  //               >
  //                 Gift Registry
  //               </h1>
  //               <p className="text-[#e9c46a] font-semibold text-lg" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                 Help us start our journey together
  //               </p>
  //             </div>
  //             {/* Instructions */}
  //             <div className="mb-8 text-center">
  //               <p className="text-[#7c4f2c] text-lg mb-4" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                 We will have a postbox on the day for cards and gifts! This registry is just for those who would like to contribute to something specific for our Japan honeymoon adventure.
  //               </p>
  //             </div>
  //             {/* Monetary Gift Section */}
  //             <div className="mb-10 bg-[#e9c46a]/10 rounded-2xl p-6 border border-[#e9c46a]/30">
  //               <h2 className="text-2xl font-bold text-[#b5835d] mb-4 text-center" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                 💝 General Monetary Gift
  //               </h2>
  //               <p className="text-[#7c4f2c] text-center mb-4" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                 If you'd prefer to make a general contribution toward our honeymoon (any amount welcome!)
  //               </p>
  //               <div className="text-center">
  //                 <a
  //                   href="https://paypal.me/AndrewFraser14"
  //                   target="_blank"
  //                   rel="noopener noreferrer"
  //                   className="inline-block px-8 py-3 rounded-full bg-[#0070ba] text-white font-semibold text-lg shadow-md hover:bg-[#005ea6] transition"
  //                   style={{ fontFamily: "Playwrite AU QLD, cursive" }}
  //                 >
  //                   💙 Send via PayPal
  //                 </a>
  //               </div>
  //             </div>
  //             {/* Available Gifts */}
  //             <div className="mb-10">
  //               <h2 className="text-2xl font-bold text-[#b5835d] mb-6" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                 Available Gifts ({availableGifts.length})
  //               </h2>
  //               {availableGifts.length === 0 && !loading ? (
  //                 <div className="text-center py-8">
  //                   <p className="text-[#7c4f2c] text-lg" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                     All gifts have been purchased! Thank you for your generosity.
  //                   </p>
  //                 </div>
  //               ) : (
  //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //                   {availableGifts.map((gift) => (
  //                     <div key={gift.id} className="bg-[#fff8f0]/80 rounded-xl p-4 border border-[#e9c46a]/20 shadow hover:shadow-lg transition overflow-hidden">
  //                       {gift.image && (
  //                         <div className="mb-4">
  //                           <img
  //                             src={gift.image}
  //                             alt={gift.name}
  //                             className="w-full h-48 object-cover rounded-lg"
  //                             loading="lazy"
  //                           />
  //                         </div>
  //                       )}
  //                       <div className="flex justify-between items-start mb-3">
  //                         <h3 className="text-xl font-bold text-[#b5835d]" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                           {gift.name}
  //                         </h3>
  //                         <span className="text-lg font-semibold text-[#e9c46a]">
  //                           {gift.price}
  //                         </span>
  //                       </div>
  //                       <p className="text-[#7c4f2c] mb-4" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                         {gift.description}
  //                       </p>
  //                       <div className="flex items-center gap-2">
  //                         <button
  //                           onClick={() => handlePurchase(gift.id, gift.type)}
  //                           className="flex-1 px-4 py-2 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold hover:bg-[#b5835d] transition"
  //                           style={{ fontFamily: "Playwrite AU QLD, cursive" }}
  //                         >
  //                           {gift.type === "amazon" ? "I've Purchased This" : "Contribute via PayPal"}
  //                         </button>
  //                         {gift.type === "amazon" && gift.link && (
  //                           <a
  //                             href="https://www.amazon.co.uk/wedding/share/AndrewAndCharley"
  //                             target="_blank"
  //                             rel="noopener noreferrer"
  //                             className="px-3 py-2 rounded-full bg-[#ff9900] text-white text-sm font-semibold hover:bg-[#e88200] transition"
  //                           >
  //                             � Registry
  //                           </a>
  //                         )}
  //                         {gift.type === "honeymoon" && (
  //                           <span className="text-sm text-[#7c4f2c]/60">�</span>
  //                         )}
  //                       </div>
  //                     </div>
  //                   ))}
  //                 </div>
  //               )}
  //             </div>
  //             {/* Purchased Gifts */}
  //             {purchasedGifts.length > 0 && (
  //               <div className="mb-8">
  //                 <h2 className="text-2xl font-bold text-[#b5835d] mb-6" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                   Thank You! ✨
  //                 </h2>
  //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  //                   {purchasedGifts.map((gift) => (
  //                     <div key={gift.id} className="bg-[#e9c46a]/10 rounded-xl p-4 border border-[#e9c46a]/30">
  //                       {gift.image && (
  //                         <div className="mb-3">
  //                           <img
  //                             src={gift.image}
  //                             alt={gift.name}
  //                             className="w-full h-32 object-cover rounded-lg opacity-75"
  //                             loading="lazy"
  //                           />
  //                         </div>
  //                       )}
  //                       <div className="flex justify-between items-center">
  //                         <h3 className="text-lg font-semibold text-[#7c4f2c]" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                           {gift.name}
  //                         </h3>
  //                         <span className="text-sm text-[#b5835d] font-medium">
  //                           {gift.purchasedBy}
  //                         </span>
  //                       </div>
  //                       <p className="text-sm text-[#7c4f2c]/60">✓ Purchased</p>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             )}
  //             {/* Purchase Confirmation Modal */}
  //             {selectedGift && (
  //               <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  //                 <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
  //                   {gifts.find(g => g.id === selectedGift)?.type === "amazon" ? (
  //                     // Amazon Purchase Modal
  //                     <>
  //                       <h3 className="text-2xl font-bold text-[#b5835d] mb-4" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                         Amazon Purchase Confirmation
  //                       </h3>
  //                       <p className="text-[#7c4f2c] mb-4" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                         Thank you for purchasing from our Amazon registry! Please provide your order number so we can track the gift.
  //                       </p>
  //                       <div className="mb-4">
  //                         <a
  //                           href="https://www.amazon.co.uk/wedding/share/AndrewAndCharley"
  //                           target="_blank"
  //                           rel="noopener noreferrer"
  //                           className="w-full block text-center px-4 py-2 rounded-full bg-[#ff9900] text-white font-semibold hover:bg-[#e88200] transition mb-4"
  //                         >
  //                           📦 View Our Amazon Registry
  //                         </a>
  //                       </div>
  //                       <input
  //                         type="text"
  //                         placeholder="Your name(s)"
  //                         value={buyerName}
  //                         onChange={(e) => setBuyerName(e.target.value)}
  //                         className="w-full p-3 rounded-full border border-[#e9c46a]/40 focus:border-[#e9c46a] mb-4"
  //                         style={{ fontFamily: "Playwrite AU QLD, cursive" }}
  //                       />
  //                       <input
  //                         type="text"
  //                         placeholder="Amazon order number (e.g., 123-4567890-1234567)"
  //                         value={orderNumber}
  //                         onChange={(e) => setOrderNumber(e.target.value)}
  //                         className="w-full p-3 rounded-full border border-[#e9c46a]/40 focus:border-[#e9c46a] mb-4"
  //                         style={{ fontFamily: "Playwrite AU QLD, cursive" }}
  //                       />
  //                       <div className="flex gap-3">
  //                         <button
  //                           onClick={() => {
  //                             setSelectedGift(null);
  //                             setBuyerName("");
  //                             setOrderNumber("");
  //                           }}
  //                           className="flex-1 px-4 py-2 rounded-full border border-[#e9c46a] text-[#b5835d] hover:bg-[#e9c46a]/10 transition"
  //                           style={{ fontFamily: "Playwrite AU QLD, cursive" }}
  //                         >
  //                           Cancel
  //                         </button>
  //                         <button
  //                           onClick={confirmAmazonPurchase}
  //                           className="flex-1 px-4 py-2 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold hover:bg-[#b5835d] transition"
  //                           style={{ fontFamily: "Playwrite AU QLD, cursive" }}
  //                         >
  //                           Confirm
  //                         </button>
  //                       </div>
  //                     </>
  //                   ) : (
  //                     // Honeymoon Contribution Modal
  //                     <>
  //                       <h3 className="text-2xl font-bold text-[#b5835d] mb-4" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                         Honeymoon Contribution
  //                       </h3>
  //                       <p className="text-[#7c4f2c] mb-4" style={{ fontFamily: "Playwrite AU QLD, cursive" }}>
  //                         Thank you for contributing to our honeymoon! Please send your contribution via PayPal and then confirm the amount below.
  //                       </p>
  //                       <div className="mb-4">
  //                         <a
  //                           href="https://paypal.me/AndrewFraser14"
  //                           target="_blank"
  //                           rel="noopener noreferrer"
  //                           className="w-full block text-center px-4 py-2 rounded-full bg-[#0070ba] text-white font-semibold hover:bg-[#005ea6] transition mb-4"
  //                         >
  //                           💙 Send via PayPal
  //                         </a>
  //                       </div>
  //                       <input
  //                         type="text"
  //                         placeholder="Your name(s)"
  //                         value={buyerName}
  //                         onChange={(e) => setBuyerName(e.target.value)}
  //                         className="w-full p-3 rounded-full border border-[#e9c46a]/40 focus:border-[#e9c46a] mb-4"
  //                         style={{ fontFamily: "Playwrite AU QLD, cursive" }}
  //                       />
  //                       <input
  //                         type="text"
  //                         placeholder="Amount contributed (e.g., 50)"
  //                         value={contributionAmount}
  //                         onChange={(e) => setContributionAmount(e.target.value)}
  //                         className="w-full p-3 rounded-full border border-[#e9c46a]/40 focus:border-[#e9c46a] mb-4"
  //                         style={{ fontFamily: "Playwrite AU QLD, cursive" }}
  //                       />
  //                       <div className="flex gap-3">
  //                         <button
  //                           onClick={() => {
  //                             setSelectedGift(null);
  //                             setBuyerName("");
  //                             setContributionAmount("");
  //                           }}
  //                           className="flex-1 px-4 py-2 rounded-full border border-[#e9c46a] text-[#b5835d] hover:bg-[#e9c46a]/10 transition"
  //                           style={{ fontFamily: "Playwrite AU QLD, cursive" }}
  //                         >
  //                           Cancel
  //                         </button>
  //                         <button
  //                           onClick={confirmHoneymoonPurchase}
  //                           className="flex-1 px-4 py-2 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold hover:bg-[#b5835d] transition"
  //                           style={{ fontFamily: "Playwrite AU QLD, cursive" }}
  //                         >
  //                           Confirm
  //                         </button>
  //                       </div>
  //                     </>
  //                   )}
  //                 </div>
  //               </div>
  //             )}
  //             {/* Decorative divider */}
  //             <div className="flex justify-center my-6">
  //               <svg width="80" height="16" viewBox="0 0 80 16" fill="none">
  //                 <ellipse cx="40" cy="8" rx="38" ry="6" fill="#e9c46a" fillOpacity="0.15" />
  //                 <ellipse cx="40" cy="8" rx="30" ry="3" fill="#b5835d" fillOpacity="0.12" />
  //               </svg>
  //             </div>
  //             {/* Back Home Button */}
  //             <div className="text-center">
  //               <Link
  //                 to="/"
  //                 className="mt-4 inline-block px-8 py-3 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-md hover:bg-[#b5835d] transition"
  //                 style={{
  //                   fontFamily: "Playwrite AU QLD, cursive",
  //                   letterSpacing: "0.04em",
  //                 }}
  //               >
  //                 Back Home
  //               </Link>
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     </div> */}
  //   </Layout>
  // );
// }