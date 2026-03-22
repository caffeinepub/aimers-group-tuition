import { CheckCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

const COURSES = [
  "Class 8-10 (All Subjects)",
  "Class 11-12 Science",
  "JEE/NEET Foundation",
  "MHT-CET Preparation",
];

export default function Admissions() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    setSubmitError("");
    try {
      await actor.submitAdmissionEnquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        course: form.course,
        timestamp: BigInt(Date.now()),
      });
      setSuccess(true);
      setForm({ name: "", phone: "", email: "", course: "" });
    } catch (_err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #1F5EA8, #0B2F57)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Admissions 2026–2027
          </h1>
          <p className="text-blue-200">
            Fill out the form and we will contact you shortly
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white rounded-xl border border-[#E6EAF1] shadow-card p-8"
            >
              <h2 className="text-xl font-bold text-[#0B2F57] mb-6">
                Enquiry Form
              </h2>

              {success && (
                <div
                  data-ocid="admissions.success_state"
                  className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-6"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                  <p className="text-green-700 font-medium">
                    Thank you! We will contact you soon.
                  </p>
                </div>
              )}

              {submitError && (
                <div
                  data-ocid="admissions.error_state"
                  className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6"
                >
                  <p className="text-red-600 text-sm">{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="adm-name"
                    className="block text-sm font-semibold text-[#0B2F57] mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    id="adm-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    data-ocid="admissions.input"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border border-[#E6EAF1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5EA8] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="adm-phone"
                    className="block text-sm font-semibold text-[#0B2F57] mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="adm-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    data-ocid="admissions.input"
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 rounded-lg border border-[#E6EAF1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5EA8] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="adm-email"
                    className="block text-sm font-semibold text-[#0B2F57] mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="adm-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    data-ocid="admissions.input"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-[#E6EAF1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5EA8] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="adm-course"
                    className="block text-sm font-semibold text-[#0B2F57] mb-2"
                  >
                    Course / Class *
                  </label>
                  <select
                    id="adm-course"
                    required
                    value={form.course}
                    onChange={(e) =>
                      setForm({ ...form, course: e.target.value })
                    }
                    data-ocid="admissions.select"
                    className="w-full px-4 py-3 rounded-lg border border-[#E6EAF1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5EA8] focus:border-transparent transition bg-white"
                  >
                    <option value="">Select a course</option>
                    {COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading || !actor}
                  data-ocid="admissions.submit_button"
                  className="w-full py-3.5 bg-[#1F5EA8] text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl border border-[#E6EAF1] shadow-card p-6 mb-6">
                <h3 className="font-bold text-[#0B2F57] mb-4">
                  Why Join AIMERS?
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    "Expert faculty for each subject",
                    "Small batches (max 10 students)",
                    "Personalised attention and mentoring",
                    "Curated study notes and materials",
                    "Regular mock tests and assessments",
                    "Academic & career counselling",
                    "Proven track record of results",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#F57C00] font-bold mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-xl p-5"
                style={{
                  background: "linear-gradient(135deg, #1F5EA8, #0B2F57)",
                }}
              >
                <p className="text-white font-semibold text-sm mb-1">
                  Need help choosing a course?
                </p>
                <p className="text-blue-200 text-xs mb-3">
                  Call us or WhatsApp for free counselling.
                </p>
                <a
                  href="https://wa.me/918169195529"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-500 text-white text-xs font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
