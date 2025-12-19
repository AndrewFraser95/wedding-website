import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function TravelAndStay() {
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
                letterSpacing: "0.08em",
                fontFamily: "Playwrite AU QLD, cursive",
              }}
            >
              Travel & Stay
            </h1>
            <p
              className="text-[#e9c46a] font-semibold text-lg"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Getting there & where to stay
            </p>
          </div>
          <div className="text-[#7c4f2c] text-lg md:text-xl leading-relaxed mb-8">
            <h2
              className="text-2xl font-bold text-[#b5835d] mb-2 mt-4"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Travel
            </h2>
            <p className="mb-4">
              Kettlesing Village Hall has parking for about 10 cars, with an
              overflow for another 4 or so. Please try to prebook taxis back
              from the venue and taxi/car pool on the way there.
              <br />
              Food stalls and other items will be in the car park, so parking is
              limited.
              <br />
              The venue is only a 15-minute drive from Harrogate, with Uber and
              Main Line Taxis available.
              <br />
              <a
                href="https://mainlinetaxis.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e9c46a] underline hover:text-[#b5835d]"
              >
                Main Line Taxis
              </a>{" "}
              (Book at least a month in advance!)
              <br />
              If you provide your email, we’ll send a reminder to pre-book
              taxis.
            </p>
            <h2
              className="text-2xl font-bold text-[#b5835d] mb-2 mt-8"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Recommended Accommodation
            </h2>
            <div className="space-y-6">
              <div className="bg-[#fff8f0]/80 rounded-xl p-4 border border-[#e9c46a]/20 shadow">
                <p
                  className="mb-1 font-semibold text-[#b5835d]"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  📅 Option 1: The Harrogate Inn
                </p>
                <p>
                  This is where most of the wedding party will be staying
                  between Friday and Monday. Also likely where Friday
                  entertainment will commence. (Quote Fraser Wedding for 10% off)
                </p>
                <a
                  className="mt-2 inline-block bg-[#e9c46a] text-[#fff8f0] px-4 py-2 rounded-full hover:bg-[#b5835d] transition"
                  href="https://www.inncollectiongroup.com/harrogate-inn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  Harrogate Inn
                </a>
              </div>
              <div className="bg-[#fff8f0]/80 rounded-xl p-4 border border-[#e9c46a]/20 shadow">
                <p
                  className="mb-1 font-semibold text-[#b5835d]"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  📅 Option 2: Premier Inn - Harrogate Town Centre
                </p>
                <p>
                  A decently reviewed and priced hotel in the heart of
                  Harrogate.
                </p>
                <a
                  className="mt-2 inline-block bg-[#e9c46a] text-[#fff8f0] px-4 py-2 rounded-full hover:bg-[#b5835d] transition"
                  href="https://www.premierinn.com/gb/en/hotels/england/north-yorkshire/harrogate/harrogate-town-centre.html?INNID=HARSPR&ARRdd=05&ARRmm=08&ARRyyyy=2025&NIGHTS=1&ADULT1=2&CHILD1=0&COT1=0&INTTYP1=DB&ROOMS=1&SELECT=STANDARD_ROOM-NONFLEX&BRAND=PI&CID=GHFPP_GB_GoogleSearch_desktop_default+checkin=2025-08-05+los=1+HARSPR&gad_source=0&gad_campaignid=21694319257&gclid=CjwKCAjwkbzEBhAVEiwA4V-yqqcg1H_m3thUG5hcMhxFvn6g7sjlQXmZJV860qgHsf_mWV7SbHYZRRoCcT8QAvD_BwE"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  Premier Inn
                </a>
              </div>
              <div className="bg-[#fff8f0]/80 rounded-xl p-4 border border-[#e9c46a]/20 shadow">
                <p
                  className="mb-1 font-semibold text-[#b5835d]"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  📅 Option 3: Travelodge Harrogate West Park
                </p>
                <p>
                  A budget-friendly option not too far from other options with
                  some very reasonably priced rooms.
                </p>
                <a
                  className="mt-2 inline-block bg-[#e9c46a] text-[#fff8f0] px-4 py-2 rounded-full hover:bg-[#b5835d] transition"
                  href="https://www.travelodge.co.uk/hotels/595/Harrogate-West-Park-hotel"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  Travelodge
                </a>
              </div>
              <div className="bg-[#fff8f0]/80 rounded-xl p-4 border border-[#e9c46a]/20 shadow">
                <p
                  className="mb-1 font-semibold text-[#b5835d]"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  📅 Option 4: Queens Head Inn
                </p>
                <p>
                  Small pub + hotel in the town of Kettlesing, within walking
                  distance of the venue. Only very limited rooms available
                  though.
                </p>
                <a
                  className="mt-2 inline-block bg-[#e9c46a] text-[#fff8f0] px-4 py-2 rounded-full hover:bg-[#b5835d] transition"
                  href="https://www.inncollectiongroup.com/harrogate-inn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  Queens Head Inn
                </a>
              </div>
            </div>
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
              letterSpacing: "0.04em",
              fontFamily: "Playwrite AU QLD, cursive",
            }}
          >
            Back Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
