import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Expert Faculties",
    desc: "Subject-specialist teachers with years of competitive exam coaching experience.",
  },
  {
    icon: Users,
    title: "Small Batch Size",
    desc: "Maximum 10 students per batch ensuring individual attention and focused learning.",
  },
  {
    icon: Briefcase,
    title: "Career Counselling",
    desc: "Academic and career guidance to help students plan their future with confidence.",
  },
  {
    icon: BookOpen,
    title: "Study Material",
    desc: "Curated notes, practice sheets, and resources designed for exam success.",
  },
];

const courses = [
  {
    title: "VIII / IX / X",
    subtitle: "All Subjects",
    desc: "Comprehensive coverage of all subjects with strong foundational concepts and regular assessments.",
    color: "#1F5EA8",
  },
  {
    title: "XI & XII",
    subtitle: "Science Stream",
    desc: "In-depth Physics, Chemistry, Mathematics, and Biology coaching focused on board exams.",
    color: "#F57C00",
  },
  {
    title: "JEE / NEET",
    subtitle: "Foundation Course",
    desc: "Targeted preparation with advanced problem-solving techniques, mock tests, and mentoring.",
    color: "#1F5EA8",
  },
  {
    title: "MHT-CET",
    subtitle: "Preparation",
    desc: "Exam-focused training with full syllabus coverage, mock tests, and previous year papers.",
    color: "#F57C00",
  },
];

const testimonials = [
  {
    name: "Rahul S.",
    achievement: "SSC — 89%",
    quote:
      "The faculty here are exceptional. Small batches meant I got personal attention which made all the difference.",
    initials: "RS",
  },
  {
    name: "Priya N.",
    achievement: "NEET — 585/720",
    quote:
      "Detailed study material and regular mock tests helped me crack NEET. Best coaching institute!",
    initials: "PN",
  },
  {
    name: "Amit K.",
    achievement: "JEE — Qualified",
    quote:
      "The dedication of the teachers and the structured syllabus made JEE preparation much more manageable.",
    initials: "AK",
  },
];

const STARS = [1, 2, 3, 4, 5];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[600px] lg:min-h-[700px] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.58)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-3 py-1 bg-[#F57C00] text-white text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
              Admissions Open 2026–2027
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              AIMERS GROUP TUITION
              <span className="block text-[#F57C00] text-2xl sm:text-3xl mt-2 font-bold">
                Dream Big. Set Goals. Take Action.
              </span>
            </h1>
            <p className="text-gray-200 text-base sm:text-lg mb-8 max-w-lg">
              Expert coaching for Classes 8–12, JEE, NEET & MHT-CET. Small
              batches, expert faculty, proven results.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/admissions"
                data-ocid="hero.primary_button"
                className="px-7 py-3 bg-[#1F5EA8] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Enroll Now
              </Link>
              <Link
                to="/courses"
                data-ocid="hero.secondary_button"
                className="px-7 py-3 border-2 border-[#F57C00] text-[#F57C00] font-semibold rounded-lg hover:bg-[#F57C00] hover:text-white transition-colors text-sm sm:text-base"
              >
                View Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2F57] mb-3">
              Why Choose AIMERS?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We combine expert teaching with personalised care to deliver
              outstanding results.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-[#E6EAF1] shadow-card text-center group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1F5EA8] transition-colors">
                  <item.icon className="w-7 h-7 text-[#1F5EA8] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#0B2F57] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2F57] mb-3">
              Featured Courses
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Specialized programs designed for academic excellence and
              competitive exam success.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl overflow-hidden border border-[#E6EAF1] shadow-card hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: course.color }}
                />
                <div className="p-6">
                  <div className="text-2xl font-extrabold text-[#0B2F57] mb-1">
                    {course.title}
                  </div>
                  <div
                    className="text-sm font-semibold mb-3"
                    style={{ color: course.color }}
                  >
                    {course.subtitle}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {course.desc}
                  </p>
                  <Link
                    to="/courses"
                    data-ocid="courses.link"
                    className="inline-flex items-center text-sm font-semibold gap-1 hover:gap-2 transition-all"
                    style={{ color: course.color }}
                  >
                    Learn More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2F57] mb-3">
              Student Success Stories
            </h2>
            <p className="text-gray-500">
              Hear from students who transformed their futures with AIMERS.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 border border-[#E6EAF1] shadow-card"
              >
                <div className="flex items-center gap-1 mb-4">
                  {STARS.map((n) => (
                    <Star
                      key={n}
                      className="w-4 h-4 fill-[#F57C00] text-[#F57C00]"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1F5EA8] text-white flex items-center justify-center text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2F57] text-sm">
                      {t.name}
                    </div>
                    <div className="text-[#F57C00] text-xs font-semibold">
                      {t.achievement}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-16 lg:py-20"
        style={{ background: "linear-gradient(135deg, #1F5EA8, #0B2F57)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Join Now and Start Your Success Journey
            </h2>
            <p className="text-blue-200 mb-8 max-w-lg mx-auto">
              Limited seats available. Enroll today and take the first step
              towards academic excellence.
            </p>
            <Link
              to="/admissions"
              data-ocid="cta.primary_button"
              className="inline-block px-8 py-4 bg-[#F57C00] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
            >
              Enroll Now — Admissions Open 2026–27
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
