import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow">
      <NavigationMenu className="max-w-4xl mx-auto p-4">
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <Link to="/" className={navigationMenuTriggerStyle()}>
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/venue" className={navigationMenuTriggerStyle()}>
              Venue
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/rsvp" className={navigationMenuTriggerStyle()}>
              RSVP
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/countdown" className={navigationMenuTriggerStyle()}>
              Countdown
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/gallery" className={navigationMenuTriggerStyle()}>
              Gallery
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
