import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2026-08-29T12:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = targetDate - now;
      if (diff <= 0) {
        setTimeLeft("It's Wedding Time! 💍");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-32 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
        <div className="w-full max-w-xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg flex flex-col items-center">
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
            className="text-4xl md:text-5xl font-bold text-[#b5835d] mb-4 tracking-wider"
            style={{
              fontFamily: "Playwrite AU QLD, cursive",
              letterSpacing: "0.08em",
            }}
          >
            ⏳ Countdown to the Big Day
          </h1>
          <p
            className="text-3xl md:text-4xl font-mono text-[#e9c46a] mb-6"
            style={{ letterSpacing: "0.06em" }}
          >
            {timeLeft}
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
