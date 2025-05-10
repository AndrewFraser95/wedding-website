import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Venue from "./pages/Venue";
import RSVP from "./pages/RSVP";
import ThankYou from "./pages/ThankYou";
import Countdown from "./pages/Countdown";
import Gallery from "./pages/Gallery";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/venue" element={<Venue />} />
      <Route path="/rsvp" element={<RSVP />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/countdown" element={<Countdown />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}
