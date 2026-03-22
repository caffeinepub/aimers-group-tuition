import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
            <div className="w-9 h-9 rounded-full bg-[#1F5EA8] flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <span className="font-bold text-[#1F5EA8] text-sm sm:text-base leading-tight">
              AIMERS GROUP
              <br />
              <span className="text-xs font-semibold text-[#F57C00]">
                TUITION
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid="nav.link"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === link.href
                    ? "text-[#1F5EA8] bg-blue-50"
                    : "text-gray-600 hover:text-[#1F5EA8] hover:bg-blue-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Admin pill */}
            <Link
              to="/admin"
              data-ocid="nav.link"
              className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F57C00] text-white text-xs font-semibold rounded-full hover:bg-orange-600 transition-colors shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              data-ocid="nav.link"
              className="text-sm font-medium text-gray-600 hover:text-[#1F5EA8]"
            >
              Login
            </Link>
            <Link
              to="/admissions"
              data-ocid="nav.primary_button"
              className="px-4 py-2 bg-[#F57C00] text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Enroll Now
            </Link>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#1F5EA8]"
            onClick={() => setIsOpen(!isOpen)}
            data-ocid="nav.toggle"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid="nav.link"
                className={`block px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === link.href
                    ? "text-[#1F5EA8] bg-blue-50"
                    : "text-gray-600 hover:text-[#1F5EA8] hover:bg-blue-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <Link
                to="/login"
                data-ocid="nav.link"
                className="block px-3 py-2 text-sm font-medium text-gray-600"
              >
                Student Login
              </Link>
              {/* Admin highlighted in mobile */}
              <Link
                to="/admin"
                data-ocid="nav.link"
                className="flex items-center gap-2 px-3 py-2 bg-[#F57C00] text-white text-sm font-semibold rounded-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Panel
              </Link>
              <Link
                to="/admissions"
                data-ocid="nav.primary_button"
                className="block px-3 py-2 bg-[#1F5EA8] text-white text-sm font-semibold rounded-lg text-center"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
