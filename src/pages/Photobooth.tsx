import Layout from "../components/Layout";

const PHOTOBOOTH_URL = "https://fotoshare.co/e/3kLJ_YO9gS3qkMldOGzyS#";

export default function Photobooth() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
        <div className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
          <div className="mb-6 flex flex-col items-center">
            <h1
              className="text-4xl md:text-5xl font-bold text-[#b5835d] mb-2 tracking-wider"
              style={{
                fontFamily: "Playwrite AU QLD, cursive",
                letterSpacing: "0.08em",
              }}
            >
              Photobooth
            </h1>
            <p
              className="text-[#e9c46a] font-semibold text-lg text-center"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              All the fun snaps from the booth, in one place.
            </p>
          </div>

          <div className="mb-8 text-center">
            <p
              className="text-[#7c4f2c] text-lg mb-4"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Every photo from the photobooth is ready to view, download and
              share.
            </p>
            <a
              href={PHOTOBOOTH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-md hover:bg-[#b5835d] transition"
              style={{
                fontFamily: "Playwrite AU QLD, cursive",
                letterSpacing: "0.04em",
              }}
            >
              View the Photobooth Photos
            </a>
          </div>

          <div className="bg-[#e9c46a]/10 rounded-2xl p-6 border border-[#e9c46a]/30 text-center">
            <p
              className="text-[#7c4f2c] text-base"
              style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
            >
              If you're sharing any of these photos online, please get
              consent from parents first before posting any pictures of
              little ones. Thank you for helping us look after everyone's
              privacy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
