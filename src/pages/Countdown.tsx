import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2026-09-29T12:00:00").getTime();
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
      <div className="min-h-screen bg-yellow-50 text-center p-6">
        <h1 className="text-3xl font-bold mb-6 text-green-700">
          ⏳ Countdown to the Big Day
        </h1>
        <p className="text-2xl font-mono text-pink-600">{timeLeft}</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-orange-400 text-white px-4 py-2 rounded-full hover:bg-orange-500"
        >
          Back Home
        </Link>
      </div>
    </Layout>
  );
}
