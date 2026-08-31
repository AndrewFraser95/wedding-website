import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function OurStory() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
        <div className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
          {/* Decorative heading */}
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
              Our Story
            </h1>
            <p
              className="text-[#e9c46a] font-semibold text-lg"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              A Modern Fairytale
            </p>
          </div>
          {/* Story content */}
          <div
            className="text-[#7c4f2c] text-lg md:text-xl leading-relaxed mb-5 text-[#b5835d] font-semibold"
            // style={{ fontFamily: "Playwrite AU QLD, cursive" }}
          >
            <p className="mb-5">
              Once upon a time, in an age of swipes and Super Likes, Andrew and
              Charley met-like all modern fairytales-on Tinder.
            </p>
            <p className="mb-5">
              As fate would have it, both were gazing out of train windows,
              Andrew homeward bound from Newcastle to Leeds, and Charley
              journeying from York to Newcastle.
            </p>
            <p className="mb-5">
              When their trains paused at Durham, something magical lingered in
              the air.
            </p>
            <p className="mb-5">
              For the first week of their courtship, they discussed their
              fictional divorce from one another. With barbs and wit flying,
              they quickly realised they were a perfect match.
            </p>
            <p className="mb-5">
              Their first date was at a Japanese tea room in York, on a crisp
              February Sunday in 2019. Andrew joked about wearing a kimono;
              Charley suggested that it might be a step too far.
            </p>
            <p className="mb-5">
              13 months later in March 2020, as the world neared lockdown,
              Charley caught the last ferry back from a trip to Amsterdam and
              moved in with Andrew and two of his best friends, Rob and
              McGregor.
            </p>
            <p className="mb-5">
              Another five months later, and they found their first flat
              together at 75 Bouverie Court, filling it with laughter and love.
            </p>
            <p className="mb-5">
              Four years passed, and they bought their first home in
              Micklefield, building new dreams together.
            </p>
            <p className="mb-5">
              On their sixth anniversary, in the ever enchanting Edinburgh,
              Andrew knelt down on one knee and asked Charley to be his forever.
            </p>
            <p
              className="mb-5 text-[#b5835d] font-semibold"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              And so, their next chapter begins...
            </p>
          </div>
          {/* Decorative divider */}
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
          {/* Back Home Button */}
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
