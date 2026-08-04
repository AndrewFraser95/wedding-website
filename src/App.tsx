import { Route, Routes } from "react-router-dom";
import EventDetails from "./pages/EventDetails";
import Countdown from "./pages/Countdown";
import OurStory from "./pages/OurStory";
import RSVP from "./pages/RSVP";
import TravelAndStay from "./pages/TravelAndStay";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";
import GiftRegistry from "./pages/GiftRegistry";
import OrderOfTheDay from "./pages/OrderOfTheDay";
import SubmitContribution from "./pages/SubmitContribution";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rsvp" element={<RSVP />} />
      <Route path="/submit" element={<SubmitContribution />} />
      <Route path="/our-story" element={<OurStory />} />
      <Route path="/event-details" element={<EventDetails />} />
      <Route path="/order-of-the-day" element={<OrderOfTheDay />} />
      <Route path="/travel-stay" element={<TravelAndStay />} />
      <Route path="/countdown" element={<Countdown />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/gift-registry" element={<GiftRegistry />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}          
