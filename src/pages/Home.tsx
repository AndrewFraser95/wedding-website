import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-start bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7] px-4 pt-16 pb-8 min-h-screen">
        {/* Hanging sign */}
        <div className="mb-6">
          <img
            src="/assets/hanging-sign.png"
            alt="Hanging Welcome Sign"
            className="mx-auto w-40 md:w-56 drop-shadow-lg"
          />
        </div>
        {/* Names */}
        <h1
          className="font-bold mb-2 text-4xl md:text-5xl text-[#b5835d] tracking-wide"
          style={{
            fontFamily: "Playwrite AU QLD, cursive",
            letterSpacing: "0.08em",
          }}
        >
          Andrew & Charley
        </h1>
        {/* Date */}
        <h3
          className="font-semibold mb-6 text-xl md:text-2xl text-[#e9c46a] tracking-widest"
          style={{
            fontFamily: "Playwrite AU QLD, cursive",
          }}
        >
          29 &middot; 08 &middot; 26
        </h3>
        {/* Decorative divider */}
        <div className="mb-8">
          <svg
            width="80"
            height="16"
            viewBox="0 0 80 16"
            fill="none"
            className="mx-auto"
          >
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
        {/* Welcome message */}
        <div className="max-w-xl text-center mb-10">
          <p
            className="text-lg md:text-xl text-[#7c4f2c] mb-4"
            style={{
              fontFamily: "Playwrite AU QLD, cursive",
            }}
          >
            Together with their families, Andrew & Charley joyfully invite you
            to celebrate their wedding.
          </p>
        </div>
        {/* Proposal photo with border */}
        <div className="mb-8">
          <img
            src="/assets/proposal.jpg"
            alt="Proposal"
            className="rounded-xl shadow-lg border-4 border-[#e9c46a]/30 w-full max-w-md"
          />
        </div>
        {/* Call to action */}
        {/* <Link
          to="/rsvp"
          className="inline-block px-8 py-3 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-md hover:bg-[#b5835d] transition"
          style={{
            fontFamily: "Playwrite AU QLD, cursive",
            letterSpacing: "0.04em",
          }}
        >
          RSVP Now
        </Link> */}
      </div>
    </Layout>
  );
}
