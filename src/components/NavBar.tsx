import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          A&C Wedding
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="gap-4">
            <NavLinkItem to="/" label="Home" />
            <NavLinkItem to="/venue" label="Venue" />
            <NavLinkItem to="/rsvp" label="RSVP" />
            <NavLinkItem to="/countdown" label="Countdown" />
            {/* <NavLinkItem to="/gallery" label="Gallery" /> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-2">
            <MobileNavLink to="/" label="Home" />
            <MobileNavLink to="/venue" label="Venue" />
            <MobileNavLink to="/rsvp" label="RSVP" />
            <MobileNavLink to="/countdown" label="Countdown" />
            {/* <MobileNavLink to="/gallery" label="Gallery" /> */}
          </ul>
        </div>
      )}
    </nav>
  );
}

// Extracted mobile nav item for clarity
function MobileNavLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link
        to={to}
        className="block w-full px-4 py-2 rounded-md bg-white text-indigo-600 font-medium shadow hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {label}
      </Link>
    </li>
  );
}

function NavLinkItem({ to, label }: { to: string; label: string }) {
  return (
    <NavigationMenuItem>
      <Link to={to} className={navigationMenuTriggerStyle()}>
        {label}
      </Link>
    </NavigationMenuItem>
  );
}
