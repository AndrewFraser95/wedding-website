import { Link } from "react-router-dom";
import Layout from "../components/Layout";

// PLACEHOLDER CONTENT — replace the paragraphs below with your own words
// whenever you're ready, Andrew & Charley. Nothing else needs to change.
const MESSAGE_PARAGRAPHS = [
  "[Andrew & Charley's message goes here.]",
  "[Say a few words to your guests — thank them for being part of your day, share how much it meant to have them there, whatever feels right.]",
];

export default function ThankYou() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
        <div className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
          <div className="mb-6 flex flex-col items-center">
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="mb-2">
              <ellipse cx="30" cy="12" rx="28" ry="8" fill="#e9c46a" fillOpacity="0.13" />
              <ellipse cx="30" cy="12" rx="20" ry="3" fill="#b5835d" fillOpacity="0.10" />
            </svg>
            <h1
              className="text-4xl md:text-5xl font-bold text-[#b5835d] mb-2 tracking-wider"
              style={{ fontFamily: "Playwrite AU QLD, cursive", letterSpacing: "0.08em" }}
            >
              Thank You
            </h1>
            <p
              className="text-[#e9c46a] font-semibold text-lg"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              From Andrew & Charley
            </p>
          </div>

          <div className="mb-8 space-y-4">
            {MESSAGE_PARAGRAPHS.map((paragraph, i) => (
              <p
                key={i}
                className="text-[#7c4f2c] text-lg md:text-xl font-medium"
                style={{ fontFamily: "Playwrite AU QLD, cursive" }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Link
            to="/"
            className="mt-4 inline-block px-8 py-3 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-md hover:bg-[#b5835d] transition"
            style={{ fontFamily: "Playwrite AU QLD, cursive", letterSpacing: "0.04em" }}
          >
            Back Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
