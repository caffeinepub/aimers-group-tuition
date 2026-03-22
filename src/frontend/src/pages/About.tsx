import { Award, Target, Users } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Target,
    title: "Personalized Attention",
    desc: "Every student receives individual focus with customized learning plans tailored to their strengths and weaknesses.",
  },
  {
    icon: Users,
    title: "Small Batch Teaching",
    desc: "With a maximum of 10 students per batch, every student gets the attention they deserve from expert faculty.",
  },
  {
    icon: Award,
    title: "Result-Oriented Training",
    desc: "Our structured curriculum and rigorous practice sessions are designed to maximize student performance in exams.",
  },
];

export default function About() {
  return (
    <div>
      {/* Banner */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #1F5EA8, #0B2F57)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            About AIMERS GROUP TUITION
          </h1>
          <p className="text-blue-200">Excellence in Education Since Day One</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2F57] mb-5">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              AIMERS GROUP TUITION is a premier coaching institute dedicated to
              academic excellence and competitive exam preparation. Founded with
              the vision of providing quality education to every student, we
              specialize in coaching for Classes 8 to 12, JEE, NEET, and
              MHT-CET.
            </p>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg mt-4">
              Our team of expert faculty members brings years of experience and
              deep subject knowledge. We believe in fostering a love of
              learning, building strong conceptual foundations, and preparing
              students not just for exams but for life's challenges.
            </p>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-[#E6EAF1] shadow-card text-center"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-[#1F5EA8]" />
                </div>
                <h3 className="font-bold text-[#0B2F57] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-xl p-8 text-center"
            style={{ background: "linear-gradient(135deg, #1F5EA8, #0B2F57)" }}
          >
            <h3 className="text-xl font-bold text-[#F57C00] mb-3">
              Our Mission
            </h3>
            <p className="text-white text-lg font-medium italic">
              "To guide students towards academic success and career growth
              through quality education."
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
