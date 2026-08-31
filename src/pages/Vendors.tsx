import Layout from "../components/Layout";

interface Vendor {
  category: string;
  name: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  // PLACEHOLDER — replace with your own words about working with them.
  testimonial: string;
}

const VENDORS: Vendor[] = [
  {
    category: "Venue",
    name: "Kettlesing Millennium Village Hall",
    phone: "07929 361212",
    email: "Christine@yorkshiredalesbb.onmicrosoft.com",
    testimonial:
      "Christine and the team at Kettlesing Millennium Village Hall were amazing to work with. The hall is the perfect blank canvas and we feel so lucky to have been able to host our wedding there.",
  },
  {
    category: "Coordinator",
    name: "Penelope Boycott (goes by Penny)",
    website: "https://www.penelopejayne.co.uk ",
    phone: "07548829029",
    testimonial:
      "Genuinely lost for words. Penny is a magician, and her team were faultless. From putting Charley and I at ease on the pre-wedding meeting, to immediately tackling tasks on the day, to a 3:08am email with a detailed breakdown having cleaned the entire space and packaged everything up beautifully. She's golddust and we felt so lucky to have her on our team. We can't recommend her enough. \n She is also a celebrant and we can only imagine how amazing she would have been at that too.",
  },
  {
    category: "Food",
    name: "Let's Go Street Food",
    // description:
    //   "Wedding Breakfast: Longhorn Steak Co (choice of steak brioche sandwiches) · Evening Meal: St Monin's Fine Fisheries (choice of fish & chip meals)",
    website: "https://www.letsgostreetfood.co.uk/",
    phone: "07929 361212",
    email: "chris@letsgostreetfood.co.uk",
    testimonial:
      "What a machine is all I can say. Incredible food, incredibly priced and the most lovely people to work with. We can't recommend them enough.",
  },
  {
    category: "Photographer",
    name: "Alex — Tin Squid Photography",
    description: "https://www.instagram.com/tinsquidphotography/",
    website: "https://tinsquidphotography.com/",
    phone: "07469 496468",
    email: "tin.squid.photography@outlook.com",
    testimonial:
      "Alex was just incredible. He immediately put both Charley and I at ease, and the photos he took are just stunning. He gave us direction whilst also feeling like he could just be your friend.",
  },
  {
    category: "Band",
    name: "Skylight",
    website: "https://www.skylightband.co.uk/",
    email: "bookings@functioncentral.co.uk",
    testimonial:
      "I think the music speaks for itself. Lovely chaps and incredible musicians and the night was made by them. We couldn't imagine any other band and they'll always be the soundtrack to our wedding day.",
  },
  {
    category: "Bar",
    name: "Glen — Queen's Head, Kettlesing",
    phone: "07957 217006",
    email: "info@queensheadkettlesing.co.uk",
    testimonial:
      "Glen and the team at Queen's Head, Kettlesing were fantastic. The drinks were top-notch and the service was impeccable.",
  },
  {
    category: "Photobooth",
    name: "PictureBlast",
    website: "https://www.pictureblast.co.uk/",
    email: "info@pictureblastevents.co.uk",
    testimonial:
      "All night booth with unlimited prints. And also made the custom frames containing Charley's bunting and pipe-cleaner flowers, really going that extra mile. The perfect keepsake",
  },
  {
    category: "Marquee",
    name: "Hannah Forrest-Laws — Countryside Events",
    website: "https://countryside.events/",
    email: "Hannah@countryside.events",
    testimonial:
      "A beautiful marquee set up efficiently by the team and given the rain, an absolute lifesaver. If you need a marquee in the Yorkshire Dales, you know where to go.",
  },
  {
    category: "Glassware Hire",
    name: "Wharfeside Hire",
    website: "https://wharfesidehire.co.uk/",
    phone: "0333 567 2323",
    testimonial: "Well priced and easy to work with.",
  },
];

export default function Vendors() {
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
              Our Vendors
            </h1>
            <p
              className="text-[#e9c46a] font-semibold text-lg text-center"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              We loved working with these people — get in touch if you need
              any of them yourselves!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VENDORS.map((vendor) => (
              <div
                key={vendor.name}
                className="bg-white rounded-xl shadow-md border border-[#e9c46a]/20 p-5 flex flex-col text-left"
              >
                <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-[#e9c46a]/20 text-[#b5835d] mb-2">
                  {vendor.category}
                </span>
                <h3
                  className="text-lg font-bold text-[#b5835d] mb-1"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  {vendor.website ? (
                    <a
                      href={vendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#e9c46a] transition"
                    >
                      {vendor.name}
                    </a>
                  ) : (
                    vendor.name
                  )}
                </h3>
                {vendor.description && (
                  <p className="text-[#7c4f2c] text-sm mb-2">
                    {vendor.description}
                  </p>
                )}
                <p className="text-[#7c4f2c] text-sm italic mb-3">
                  “{vendor.testimonial}”
                </p>
                <div className="text-[#7c4f2c] text-sm mt-auto space-y-1">
                  {vendor.phone && <p>📞 {vendor.phone}</p>}
                  {vendor.email && (
                    <p>
                      ✉️{" "}
                      <a
                        href={`mailto:${vendor.email}`}
                        className="hover:text-[#e9c46a] transition break-all"
                      >
                        {vendor.email}
                      </a>
                    </p>
                  )}
                  {vendor.website && (
                    <p>
                      🔗{" "}
                      <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#e9c46a] transition break-all"
                      >
                        {vendor.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
