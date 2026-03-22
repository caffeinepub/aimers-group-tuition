import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const socialLinks = [
  { Icon: SiFacebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: SiInstagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: SiYoutube, label: "YouTube", href: "https://youtube.com" },
  { Icon: SiX, label: "Twitter", href: "https://x.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: "#0B2F57" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F57C00] flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <span className="font-bold text-lg">AIMERS GROUP TUITION</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering students to achieve academic excellence and competitive
              exam success through focused, personalized coaching.
            </p>
            <div className="flex gap-3 mt-5">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F57C00] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-[#F57C00]">
              Contact Info
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex gap-2 items-start">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#F57C00]" />
                <span>8169195529 / 8828602386</span>
              </div>
              <div className="flex gap-2 items-start">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#F57C00]" />
                <span>aimersgroup@gmail.com</span>
              </div>
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#F57C00]" />
                <span>
                  007, Ghodbunder Service Rd, Anu Nagar, Waghbil, Thane West,
                  Thane, Maharashtra 400615
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-[#F57C00]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {(
                [
                  ["Home", "/"],
                  ["About Us", "/about"],
                  ["Our Courses", "/courses"],
                  ["Admissions", "/admissions"],
                  ["Gallery", "/gallery"],
                  ["Contact", "/contact"],
                ] as [string, string][]
              ).map(([label, href]) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="hover:text-[#F57C00] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {/* Admin Panel — highlighted */}
              <li>
                <Link
                  to="/admin"
                  data-ocid="nav.link"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#F57C00] hover:text-orange-300 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
