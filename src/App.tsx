import { Route, Routes } from "react-router-dom";
import Venue from "./pages/Venue";
import Countdown from "./pages/Countdown";
import SaveTheDate from "./pages/SaveTheDate";
import RSVP from "./pages/RSVP";
import Accom from "./pages/Accom";
// import Gallery from "./pages/Gallery";

export default function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<SaveTheDate />} />
      <Route path="/venue" element={<Venue />} />
      <Route path="/rsvp" element={<RSVP />} />
      {/* <Route path="/thank-you" element={<ThankYou />} /> */}
      <Route path="/countdown" element={<Countdown />} />
      {/* <Route path="/gallery" element={<Gallery />} /> */}
      <Route path="/accomodation" element={<Accom />} />
    </Routes>
  );
}
