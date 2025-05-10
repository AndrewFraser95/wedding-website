import Layout from "../components/Layout";
import EmailModal from "../components/EmailModal";
import StyledButton from "../components/StyledButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import StyledLinkButton from "../components/StyledLinkButton";

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-yellow-50 text-center p-6">
        <h1 className="text-4xl font-bold text-pink-700 mb-4">
          🌸 Our Wedding Festival 🌸
        </h1>
        <p className="text-lg mb-6">
          Join us for a celebration of love, laughter, and food trucks!
        </p>
        <div style={{ textAlign: "center" }}>
          <AspectRatio ratio={9 / 13}>
            <img src="/assets/placeholder-selfie.jpg" />
          </AspectRatio>
        </div>
        <div className="space-y-4" style={{paddingBottom: "2em"}}>
          <EmailModal />
        </div>
        <div className="space-y-4">
          <StyledLinkButton to="/venue">See Venue & Info</StyledLinkButton>
          <StyledLinkButton to="/rsvp" color="bg-yellow-500">
            RSVP Now
          </StyledLinkButton>
          <StyledLinkButton to="/countdown" color="bg-green-500">
            Countdown
          </StyledLinkButton>
          <StyledLinkButton to="/gallery" color="bg-purple-500">
            Photo Gallery
          </StyledLinkButton>
        </div>
      </div>
    </Layout>
  );
}
