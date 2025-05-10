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
      <div className="min-h-screen bg-yellow-50 text-center p-6">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">
          📸 Kettlesing Village Hall
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Wedding pic ${i + 1}`}
              className="rounded-lg shadow-md hover:scale-105 transition-transform"
            />
          ))}
        </div>
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
