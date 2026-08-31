import Layout from "../components/Layout";

const PLAYLIST_IDS = [
  "5UCKZ8FA1T813WMGTaCrDu",
  "3JcHKVjylO6Az2ZJEwu0Kg",
  "0g75oXlDWtG12GCEcPJyvF",
  "1PqhmLMuWzWIW0MkNLhiB2",
  "5V7c2LQS6pa5gmMStovd0H",
  "3uGuvrc7JPMFpW4SwCjg93",
  "1uoIYg1BoWoXxboe2D4OxV",
  "0QRMEZwftUNDdrBPUP2vsO",
];

export default function Soundtrack() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
        <div className="w-full max-w-4xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
          <div className="mb-8 flex flex-col items-center">
            <h1
              className="text-4xl md:text-5xl font-bold text-[#b5835d] mb-2 tracking-wider"
              style={{
                fontFamily: "Playwrite AU QLD, cursive",
                letterSpacing: "0.08em",
              }}
            >
              Soundtrack
            </h1>
            <p
              className="text-[#e9c46a] font-semibold text-lg text-center"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Our playlists from the day — borrow them for your own!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLAYLIST_IDS.map((id) => (
              <div
                key={id}
                className="rounded-xl overflow-hidden shadow-md border border-[#e9c46a]/20 bg-white"
              >
                <iframe
                  title={`Spotify playlist ${id}`}
                  src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generated`}
                  width="100%"
                  height="352"
                  style={{ borderRadius: "12px", border: "none" }}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
