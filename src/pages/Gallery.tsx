import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const photos = [
  "/assets/kettlesing-arial.avif",
  "/assets/kettlesing-table.avif",
  "/assets/kettlesing-vibe.avif",
  "/assets/kettlesing.avif",
];

export default function Gallery() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
        <div className="w-full max-w-3xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
          <div className="mb-6 flex flex-col items-center">
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
              Kettlesing Village Hall
            </h1>
            <br></br>
            <p
              className="text-[#e9c46a] font-semibold text-lg"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              A glimpse of the venue
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {photos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Wedding pic ${i + 1}`}
                className="rounded-xl shadow-lg border-2 border-[#e9c46a]/20 hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
          <div className="mb-8">
            <p
              className="text-[#7c4f2c] text-lg md:text-xl font-medium"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              After the wedding, we’ll share all the magical moments here for
              you to relive and enjoy.
            </p>
          </div>

          <p
            className="text-[#7c4f2c] text-lg md:text-xl font-medium mb-2"
            style={{ fontFamily: "Playwrite AU QLD, cursive" }}
          >
            <Link
              to="https://drive.google.com/drive/folders/1u7g7NRPDJD8ee04d1m83Mxo1ujkGRprm?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-8 py-3 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-md hover:bg-[#b5835d] transition"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Upload your photos to our Google Drive
            </Link>
          </p>
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
      </div>
    </Layout>
  );
}
