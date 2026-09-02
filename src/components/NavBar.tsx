import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// The following are intentionally left off the top nav (their pages/routes
// still exist at their URLs, just not linked): RSVP, Friday Night, Event
// Details, Order of the Day, Travel and Stay, Countdown, Submit (legacy).
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/our-story", label: "Our Story" },
  { to: "/gallery", label: "Gallery" },
  { to: "/gift-registry", label: "Gift Registry" },
  { to: "/lost-and-found", label: "Lost & Found" },
  { to: "/soundtrack", label: "Soundtrack" },
  { to: "/vendors", label: "Vendors" },
  { to: "/guestbook", label: "Guestbook" },
  { to: "/thank-you", label: "Thank You" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="sticky top-0 z-50 bg-gradient-to-r from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7] backdrop-blur shadow-lg border-b-2 border-[#e9c46a]/40"
      role="navigation"
      aria-label="Main Navigation"
      style={{
        fontFamily: "Playwrite AU QLD, cursive",
        letterSpacing: "0.02em",
      }}
    >
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 py-3 flex items-center gap-8">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold text-[#b5835d] tracking-widest drop-shadow-sm select-none whitespace-nowrap"
            style={{
              fontFamily: "Playwrite AU QLD, cursive",
              letterSpacing: "0.08em",
            }}
          >
            A&C Wedding
          </Link>

          {/* Desktop Menu */}
          <NavigationMenu className="hidden md:flex flex-1 justify-center">
            <NavigationMenuList className="flex flex-wrap justify-center gap-4 w-full">
              {NAV_LINKS.map((link) => (
                <NavLinkItem
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  active={location.pathname === link.to}
                />
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden ml-auto p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#e9c46a]"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 animate-fade-in-down">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <MobileNavLink
                key={link.to}
                to={link.to}
                label={link.label}
                active={location.pathname === link.to}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

// Mobile nav item
function MobileNavLink({
  to,
  label,
  active,
  onClick,
}: {
  to: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={`block w-full px-4 py-2 rounded-md font-medium shadow transition-all duration-150
          ${
            active
              ? "bg-[#e9c46a]/20 text-[#b5835d] border-l-4 border-[#e9c46a]"
              : "bg-white text-[#b5835d] hover:bg-[#f9e7e7] hover:text-[#e9c46a]"
          }
          focus:outline-none focus:ring-2 focus:ring-[#e9c46a]`}
        style={{
          fontFamily: "Playwrite AU QLD, cursive",
        }}
      >
        {label}
      </Link>
    </li>
  );
}

// Desktop nav item
function NavLinkItem({
  to,
  label,
  active,
}: {
  to: string;
  label: string;
  active?: boolean;
}) {
  return (
    <NavigationMenuItem>
      <Link
        to={to}
        className={`${navigationMenuTriggerStyle()} relative px-4 py-2 text-lg font-semibold transition-all duration-150
          ${active ? "text-[#e9c46a]" : "text-[#b5835d] hover:text-[#e9c46a]"}
        `}
        style={{
          fontFamily: "Playwrite AU QLD, cursive",
        }}
      >
        {label}
        <span
          className={`absolute left-0 -bottom-1 w-full h-[2px] rounded transition-all duration-200
            ${
              active
                ? "bg-[#e9c46a] scale-x-100"
                : "bg-[#e9c46a]/40 scale-x-0 group-hover:scale-x-100"
            }
          `}
        />
      </Link>
    </NavigationMenuItem>
  );
}
