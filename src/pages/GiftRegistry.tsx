import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
// import { db } from "../lib/firebase";
// import { doc, onSnapshot } from "firebase/firestore";

interface GiftItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  quantity: number;
  purchased: number; // how many have been bought
  contributors: Array<{ name: string; amount: number }>;
}

import { useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

function GiftRegistry() {
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [buyerName, setBuyerName] = useState("");
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Load gifts from Firebase on mount
  useEffect(() => {
    const giftsRef = doc(db, "wedding", "gifts");
    const unsubscribe = onSnapshot(
      giftsRef,
      (docSnap) => {
        try {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.items && Array.isArray(data.items)) {
              setGifts(data.items);
            }
          } else {
            setGifts([]);
          }
        } catch (error) {
          setGifts([]);
        }
        setLoading(false);
      },
      () => setLoading(false),
    );
    return () => unsubscribe();
  }, []);

  // Helper: get available and purchased gifts
  const availableGifts = gifts.filter((g) => g.purchased < g.quantity);
  const purchasedGifts = gifts.filter((g) => g.purchased >= g.quantity);

  // Handle purchase/contribution
  const handlePurchase = (giftId: string) => {
    setSelectedGift(giftId);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
        <div className="w-full max-w-4xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div
                className="text-[#b5835d] text-lg"
                style={{ fontFamily: "Playwrite AU QLD, cursive" }}
              >
                Loading gifts...
              </div>
            </div>
          )}
          {!loading && (
            <>
              {/* Header */}
              <div className="mb-8 flex flex-col items-center">
                <svg
                  width="60"
                  height="24"
                  viewBox="0 0 60 24"
                  fill="none"
                  className="mb-2"
                >
                  <ellipse
                    cx="30"
                    cy="12"
                    rx="28"
                    ry="8"
                    fill="#e9c46a"
                    fillOpacity="0.13"
                  />
                  <ellipse
                    cx="30"
                    cy="12"
                    rx="20"
                    ry="3"
                    fill="#b5835d"
                    fillOpacity="0.10"
                  />
                </svg>
                <h1
                  className="text-4xl md:text-5xl font-bold text-[#b5835d] mb-2 tracking-wider"
                  style={{
                    fontFamily: "Playwrite AU QLD, cursive",
                    letterSpacing: "0.08em",
                  }}
                >
                  Gift Registry
                </h1>
                <p
                  className="text-[#e9c46a] font-semibold text-lg"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  Help us start our journey together
                </p>
              </div>
              {/* Instructions */}
              <div className="mb-8 text-center">
                <p
                  className="text-[#7c4f2c] text-lg mb-4"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  We will have a postbox on the day for cards and gifts! This
                  registry is just for those who would like to contribute to
                  something specific for our Japan honeymoon adventure.
                </p>
              </div>
              {/* Monetary Gift Section */}
              <div className="mb-10 bg-[#e9c46a]/10 rounded-2xl p-6 border border-[#e9c46a]/30">
                <h2
                  className="text-2xl font-bold text-[#b5835d] mb-4 text-center"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  💝 General Monetary Gift
                </h2>
                <p
                  className="text-[#7c4f2c] text-center mb-4"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  If you'd prefer to make a general contribution toward our
                  honeymoon (any amount welcome!)
                </p>
                <div className="text-center">
                  <a
                    href="https://paypal.me/AndrewFraser14"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 rounded-full bg-[#0070ba] text-white font-semibold text-lg shadow-md hover:bg-[#005ea6] transition"
                    style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                  >
                    💙 Send via PayPal
                  </a>
                </div>
              </div>
              {/* Available Gifts */}
              <div className="mb-10">
                <h2
                  className="text-2xl font-bold text-[#b5835d] mb-6"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  Available Gifts ({availableGifts.length})
                </h2>
                {availableGifts.length === 0 && !loading ? (
                  <div className="text-center py-8">
                    <p
                      className="text-[#7c4f2c] text-lg"
                      style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                    >
                      All gifts have been purchased! Thank you for your
                      generosity.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableGifts.map((gift) => (
                      <div
                        key={gift.id}
                        className="relative bg-[#fff8f0]/80 rounded-xl p-4 border border-[#e9c46a]/20 shadow hover:shadow-lg transition overflow-hidden"
                      >
                        {/* Quantity badge */}
                        <span
                          className="absolute top-3 right-4 bg-[#e9c46a] text-white text-xs font-bold px-3 py-1 rounded-full shadow"
                          style={{
                            fontFamily: "Inter, Segoe UI, Arial, sans-serif",
                          }}
                        >
                          {gift.id === "suggest-splurge"
                            ? "∞ ideas"
                            : `${gift.quantity - gift.purchased} left`}
                        </span>
                        {gift.image && (
                          <div className="mb-4">
                            <img
                              src={gift.image}
                              alt={gift.name}
                              className="w-full h-48 object-cover rounded-lg"
                              loading="lazy"
                            />
                          </div>
                        )}
                        {gift.id === "suggest-splurge" && (
                          <div className="mb-4 p-4 bg-[#e9c46a]/10 rounded-lg border border-[#e9c46a]/30">
                            <div className="text-center">
                              <span className="text-2xl">💡</span>
                              <p
                                className="text-[#b5835d] font-semibold mt-2"
                                style={{
                                  fontFamily: "Playwrite AU QLD, cursive",
                                }}
                              >
                                Got a brilliant idea for our Japan adventure?
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-3">
                          <h3
                            className="text-xl font-bold text-[#b5835d]"
                            style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                          >
                            {gift.name}
                          </h3>
                          <span className="text-lg font-semibold text-[#e9c46a]">
                            £{gift.price}
                          </span>
                        </div>
                        <p
                          className="text-[#7c4f2c] mb-4"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          {gift.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePurchase(gift.id)}
                            className="flex-1 px-4 py-2 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold hover:bg-[#b5835d] transition"
                            style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                          >
                            {gift.id === "suggest-splurge"
                              ? "Suggest!"
                              : "Contribute"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Purchased Gifts */}
              {purchasedGifts.length > 0 && (
                <div className="mb-8">
                  <h2
                    className="text-2xl font-bold text-[#b5835d] mb-6"
                    style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                  >
                    Thank You! ✨
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {purchasedGifts.map((gift) => (
                      <div
                        key={gift.id}
                        className="bg-[#e9c46a]/10 rounded-xl p-4 border border-[#e9c46a]/30"
                      >
                        {gift.image && (
                          <div className="mb-3">
                            <img
                              src={gift.image}
                              alt={gift.name}
                              className="w-full h-32 object-cover rounded-lg opacity-75"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <h3
                            className="text-lg font-semibold text-[#7c4f2c]"
                            style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                          >
                            {gift.name}
                          </h3>
                          {/* <span className="text-sm text-[#b5835d] font-medium">
                          {gift.purchasedBy}
                        </span> */}
                        </div>
                        <p className="text-sm text-[#7c4f2c]/60">✓ Purchased</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Decorative divider */}
              <div className="flex justify-center my-6">
                <svg width="80" height="16" viewBox="0 0 80 16" fill="none">
                  <ellipse
                    cx="40"
                    cy="8"
                    rx="38"
                    ry="6"
                    fill="#e9c46a"
                    fillOpacity="0.15"
                  />
                  <ellipse
                    cx="40"
                    cy="8"
                    rx="30"
                    ry="3"
                    fill="#b5835d"
                    fillOpacity="0.12"
                  />
                </svg>
              </div>
              {/* Back Home Button */}
              <div className="text-center">
                <Link
                  to="/"
                  className="mt-4 inline-block px-8 py-3 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-md hover:bg-[#b5835d] transition"
                  style={{
                    fontFamily: "Playwrite AU QLD, cursive",
                    letterSpacing: "0.04em",
                  }}
                >
                  Back Home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Modal Portal - Rendered outside component hierarchy */}
      {selectedGift &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedGift(null);
                setBuyerName("");
                setContributionAmount("");
                setSuggestionText("");
                setHasSubmitted(false);
              }
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "32px",
                width: "100%",
                maxWidth: "450px",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedGift === "suggest-splurge" ? (
                <>
                  {!hasSubmitted ? (
                    <>
                      <div className="text-center mb-6">
                        <h2
                          className="text-4xl font-bold text-[#e9c46a] mb-2"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          💡 SUGGEST A SPLURGE! 💡
                        </h2>
                        <p
                          className="text-lg text-[#b5835d] font-semibold"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          Got a brilliant idea for our Japan adventure?
                        </p>
                      </div>
                      <p
                        className="text-[#7c4f2c] mb-4 text-center"
                        style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                      >
                        Share your amazing idea and how much you think it should
                        cost. We'll add it to our registry and mark it as
                        already funded by you!
                      </p>
                      <input
                        type="text"
                        placeholder="Your name(s)"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full p-3 rounded-full border border-[#e9c46a]/40 focus:border-[#e9c46a] mb-4"
                        style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                      />
                      <textarea
                        placeholder="Your brilliant idea... (e.g., 'Visit the Studio Ghibli Museum')"
                        value={suggestionText}
                        onChange={(e) => setSuggestionText(e.target.value)}
                        className="w-full p-3 rounded-lg border border-[#e9c46a]/40 focus:border-[#e9c46a] mb-4 h-24 resize-none"
                        style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="How much do you think this costs? (£)"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        className="w-full p-3 rounded-full border border-[#e9c46a]/40 focus:border-[#e9c46a] mb-4"
                        style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                      />
                      <div className="bg-[#e9c46a]/10 rounded-xl p-4 mb-4 border border-[#e9c46a]/30">
                        <p
                          className="text-[#7c4f2c] text-center text-sm"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          <strong>Your suggestion will be added</strong> to our
                          registry and marked as already purchased/funded by
                          you!
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setSelectedGift(null);
                            setBuyerName("");
                            setContributionAmount("");
                            setSuggestionText("");
                            setHasSubmitted(false);
                          }}
                          className="flex-1 px-4 py-2 rounded-full border border-[#e9c46a] text-[#b5835d] hover:bg-[#e9c46a]/10 transition"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={async () => {
                            if (
                              !buyerName ||
                              !contributionAmount ||
                              !suggestionText
                            )
                              return;
                            const amount = parseFloat(contributionAmount);
                            if (isNaN(amount) || amount <= 0) return;

                            const newGift = {
                              id: `suggestion-${Date.now()}`,
                              name: suggestionText,
                              price: amount,
                              quantity: 1,
                              purchased: 1,
                              contributors: [{ name: buyerName, amount }],
                              image:
                                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&q=80",
                              description: `What a great idea! Thank you for the suggestion.`,
                            };

                            const giftsRef = doc(db, "wedding", "gifts");
                            const updatedGifts = [...gifts, newGift];
                            await updateDoc(giftsRef, { items: updatedGifts });

                            setHasSubmitted(true);
                            setBuyerName("");
                            setContributionAmount("");
                            setSuggestionText("");
                          }}
                          className="flex-1 px-4 py-2 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold hover:bg-[#b5835d] transition"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          Add Suggestion!
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center mb-6">
                        <h2
                          className="text-4xl font-bold text-[#e9c46a] mb-2"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          🎉 THANK YOU! 🎉
                        </h2>
                        <p
                          className="text-lg text-[#b5835d] font-semibold"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          Your suggestion is brilliant!
                        </p>
                      </div>
                      <p
                        className="text-[#7c4f2c] mb-6 text-center text-lg"
                        style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                      >
                        We've added your wonderful idea to our registry. Thank
                        you for helping make our Japan adventure even more
                        special!
                      </p>
                      <div className="text-center">
                        <button
                          onClick={() => {
                            setSelectedGift(null);
                            setHasSubmitted(false);
                          }}
                          className="px-8 py-3 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold hover:bg-[#b5835d] transition"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {!hasSubmitted ? (
                    <>
                      <div className="text-center mb-6">
                        <h2
                          className="text-3xl font-bold text-[#b5835d] mb-2"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          💝 Contribute to Our Honeymoon
                        </h2>
                        <p
                          className="text-lg text-[#7c4f2c]"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          Thank you for wanting to help make our Japan adventure
                          special!
                        </p>
                      </div>
                      <p
                        className="text-[#7c4f2c] mb-4 text-center"
                        style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                      >
                        Please send your contribution via PayPal first, then
                        confirm the amount below.
                      </p>
                      <div className="bg-[#e9c46a]/10 rounded-xl p-4 mb-4 border border-[#e9c46a]/30">
                        <p
                          className="text-[#7c4f2c] text-center text-sm"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          <strong>Haven't RSVP'd yet?</strong> Please visit our
                          RSVP page!
                          <br />
                          <strong>Want to share wisdom?</strong> Send us your
                          favourite recipe, life advice, or a joke at:
                          <br />
                          <a
                            href="mailto:andrewandcharleywedding@gmail.com"
                            className="text-[#b5835d] underline font-semibold"
                          >
                            andrewandcharleywedding@gmail.com
                          </a>
                        </p>
                      </div>
                      <div className="mb-4">
                        <a
                          href="https://paypal.me/AndrewFraser14"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block text-center px-4 py-2 rounded-full bg-[#0070ba] text-white font-semibold hover:bg-[#005ea6] transition mb-4"
                        >
                          💙 Send via PayPal
                        </a>
                      </div>
                      <input
                        type="text"
                        placeholder="Your name(s)"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full p-3 rounded-full border border-[#e9c46a]/40 focus:border-[#e9c46a] mb-4"
                        style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                      />
                      <input
                        type="number"
                        min="1"
                        max={(() => {
                          const gift = gifts.find((g) => g.id === selectedGift);
                          return gift
                            ? gift.price * (gift.quantity - gift.purchased)
                            : 1;
                        })()}
                        placeholder="Amount contributed (e.g., 50)"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        className="w-full p-3 rounded-full border border-[#e9c46a]/40 focus:border-[#e9c46a] mb-4"
                        style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setSelectedGift(null);
                            setBuyerName("");
                            setContributionAmount("");
                            setSuggestionText("");
                            setHasSubmitted(false);
                          }}
                          className="flex-1 px-4 py-2 rounded-full border border-[#e9c46a] text-[#b5835d] hover:bg-[#e9c46a]/10 transition"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={async () => {
                            const gift = gifts.find(
                              (g) => g.id === selectedGift,
                            );
                            if (!gift || !buyerName || !contributionAmount)
                              return;
                            const amount = parseFloat(contributionAmount);
                            if (isNaN(amount) || amount <= 0) return;
                            const units = Math.floor(amount / gift.price);
                            if (units < 1) return;

                            const giftsRef = doc(db, "wedding", "gifts");
                            const updatedGifts = gifts.map((g) =>
                              g.id === gift.id
                                ? {
                                    ...g,
                                    purchased: Math.min(
                                      g.purchased + units,
                                      g.quantity,
                                    ),
                                    contributors: [
                                      ...g.contributors,
                                      { name: buyerName, amount },
                                    ],
                                  }
                                : g,
                            );
                            await updateDoc(giftsRef, { items: updatedGifts });
                            setHasSubmitted(true);
                            setBuyerName("");
                            setContributionAmount("");
                            setSuggestionText("");
                          }}
                          className="flex-1 px-4 py-2 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold hover:bg-[#b5835d] transition"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          Confirm Contribution
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center mb-6">
                        <h2
                          className="text-4xl font-bold text-[#e9c46a] mb-2"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          🎉 THANK YOU! 🎉
                        </h2>
                        <p
                          className="text-lg text-[#b5835d] font-semibold"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          You're absolutely amazing!
                        </p>
                      </div>
                      <p
                        className="text-[#7c4f2c] mb-6 text-center text-lg"
                        style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                      >
                        Your generous contribution has been recorded and means
                        the world to us! We can't wait to share our Japan
                        adventure with you through photos and stories.
                      </p>
                      <div className="text-center">
                        <button
                          onClick={() => {
                            setSelectedGift(null);
                            setHasSubmitted(false);
                          }}
                          className="px-8 py-3 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold hover:bg-[#b5835d] transition"
                          style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </Layout>
  );
}

export default GiftRegistry;
