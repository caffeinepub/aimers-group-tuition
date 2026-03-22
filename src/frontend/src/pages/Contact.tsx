import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

export default function Contact() {
  return (
    <div>
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #1F5EA8, #0B2F57)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Contact Us
          </h1>
          <p className="text-blue-200">
            We'd love to hear from you. Reach out anytime.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-[#0B2F57] mb-6">
                Get In Touch
              </h2>
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#1F5EA8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B2F57] text-sm">
                      Phone
                    </p>
                    <p className="text-gray-600 text-sm">
                      8169195529 / 8828602386
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#1F5EA8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B2F57] text-sm">
                      Email
                    </p>
                    <p className="text-gray-600 text-sm">
                      aimersgroup@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#1F5EA8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B2F57] text-sm">
                      Address
                    </p>
                    <p className="text-gray-600 text-sm">
                      007, Ghodbunder Service Rd, Anu Nagar, Waghbil, Thane
                      West, Thane, Maharashtra 400615
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/918169195529"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.primary_button"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <SiWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border border-[#E6EAF1] shadow-card bg-gray-100 flex items-center justify-center min-h-64"
            >
              <div className="text-center p-8">
                <MapPin className="w-12 h-12 text-[#1F5EA8] mx-auto mb-3" />
                <p className="font-semibold text-[#0B2F57]">
                  007, Ghodbunder Service Rd, Anu Nagar
                </p>
                <p className="text-gray-500 text-sm">
                  Waghbil, Thane West, Thane, Maharashtra 400615
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Google Maps embed available
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
