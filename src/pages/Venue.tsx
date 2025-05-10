import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Venue() {
    return (
      <Layout>
        <div className="min-h-screen bg-yellow-50 text-center p-6">
          <h1 className="text-3xl font-bold text-yellow-700 mb-4">
            📍 Venue & Info
          </h1>
          <p className="mb-3">
            🌿 <strong>Where:</strong> Kettlesing Millennium Village Hall, Crag
            Ln, Kettlesing, Harrogate HG3 2LB
          </p>
          <p className="mb-3">
            📅 <strong>When:</strong> Saturday 29th August 2026
          </p>
          <p className="mb-3">
            🎶 <strong>What's there:</strong> Live music, food vans, unlimited
            prosecco, great vibes.
          </p>
          <p className="mb-3">
            👗 <strong>Dress code:</strong> Your most colourful suits, dresses
            and dancing shoes!
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2344.6164644591045!2d-1.6552414328186038!3d54.009583004195534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487955ea1b616e59%3A0x42abd40f038779d5!2sKettlesing%20Millennium%20Village%20Hall!5e0!3m2!1sen!2suk!4v1746899852555!5m2!1sen!2suk"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
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
