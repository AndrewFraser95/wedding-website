import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Accom() {
    return (
      <Layout>
        <div
          className="min-h-screen text-center p-6"
          style={{ marginTop: "10em" }}
        >
          <h1 className="text-3xl font-bold text-yellow-700 mb-4">
            📍 Recommended accomodation
          </h1>
          <p className="mb-3">
            📅 <strong>Option 1:</strong> The Inn at Cheltenham Parade
          </p>
          <p className="mb-3">
            🌿 <strong>Option 2: </strong> Crown Plaza Harrogate by IHG
          </p>
          <p className="mb-3">
            🎶 <strong>Option 3:</strong> Travelodge Harrogate West Park
          </p>
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
