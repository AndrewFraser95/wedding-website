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
import FridayNight from "./pages/FridayNight";
import LostAndFound from "./pages/LostAndFound";
import Soundtrack from "./pages/Soundtrack";
import Vendors from "./pages/Vendors";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rsvp" element={<RSVP />} />
      <Route path="/friday-night" element={<FridayNight />} />
      <Route path="/submit" element={<SubmitContribution />} />
      <Route path="/our-story" element={<OurStory />} />
      <Route path="/event-details" element={<EventDetails />} />
      <Route path="/order-of-the-day" element={<OrderOfTheDay />} />
      <Route path="/lost-and-found" element={<LostAndFound />} />
      <Route path="/soundtrack" element={<Soundtrack />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/travel-stay" element={<TravelAndStay />} />
      <Route path="/countdown" element={<Countdown />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/gift-registry" element={<GiftRegistry />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}          
