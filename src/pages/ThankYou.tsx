import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">💖 Thank You!</h1>
      <p className="text-lg mb-4">
        We've received your RSVP and can't wait to celebrate with you!
      </p>

      <Link
        to="/"
        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
      >
        Return Home
      </Link>
    </div>
  );
}
