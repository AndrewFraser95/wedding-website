import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function EventDetails() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
        <div className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
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
              Venue & Info
            </h1>
            <p
              className="text-[#e9c46a] font-semibold text-lg"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              All you need to know
            </p>
          </div>
          <div
            className="text-[#7c4f2c] text-lg md:text-xl leading-relaxed mb-8"
            // style={{ fontFamily: "Playwrite AU QLD, cursive" }}
          >
            <p className="mb-4">
              🌿 <strong>Where:</strong> Kettlesing Millennium Village Hall,
              <br />
              Crag Lane, Kettlesing,
              <br />
              Harrogate, HG3 2LB
            </p>
            <p className="mb-4">
              📅 <strong>Date:</strong> Saturday 29th August 2026
            </p>
            <p className="mb-4">
              📅 <strong>Time:</strong> We kindly ask all guests to arrive by
              <strong> 11:30am</strong> so you have plenty of time to park, find
              your seat, and settle in before the ceremony begins.
            </p>
            <p className="mb-4">
              📅 <strong>Ceremony:</strong> The ceremony will start promptly at
              <strong> 12:00pm. </strong>Please note that the bar will open
              after the ceremony – no alcoholic drinks will be served
              beforehand.
            </p>
            <p className="mb-4">
              🎶 <strong>The line-up:</strong> Live music, street food, prosecco
              and beers in the day.
            </p>
            <p className="mb-4">
              👗 <strong>Dress code:</strong> We’d love to see some colour!
            </p>
            <p className="mb-4">
              🚕 <strong>Carriages:</strong> 00:30am
            </p>
          </div>
          <div className="mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2344.6164644591045!2d-1.6552414328186038!3d54.009583004195534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487955ea1b616e59%3A0x42abd40f038779d5!2sKettlesing%20Millennium%20Village%20Hall!5e0!3m2!1sen!2suk!4v1746899852555!5m2!1sen!2suk"
              width="100%"
              height="220"
              loading="lazy"
              className="rounded-xl border border-[#e9c46a]/30 shadow"
              title="Venue Map"
            ></iframe>
          </div>
          <div className="mb-8">
            <h2
              className="text-2xl font-bold text-[#b5835d] mb-2"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Getting there
            </h2>
            <p
              className="text-[#7c4f2c] text-lg md:text-xl leading-relaxed mb-8"
              // style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              🚕 <strong>Parking:</strong> Parking is limited due to our street
              food stalls and other vendors, but there is a small overflow car
              park. Please taxi/rideshare wherever possible, or get in touch if
              you think you might drive.
            </p>
            <p
              className="text-[#7c4f2c] text-lg md:text-xl leading-relaxed mb-8"
              // style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              🗺️ <strong>From Harrogate:</strong> 15 minutes via Skipton Road,
              White Wall Lane, then Crag Lane.
            </p>
          </div>
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
