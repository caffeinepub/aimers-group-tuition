import { Link } from "@tanstack/react-router";
import { Check, Clock } from "lucide-react";
import { motion } from "motion/react";

const courses = [
  {
    title: "Class 8–10",
    subtitle: "All Subjects",
    duration: "1 Year",
    color: "#1F5EA8",
    features: [
      "All Core Subjects Covered",
      "Strong Foundational Concepts",
      "Regular Unit Tests",
      "Doubt Clearing Sessions",
      "Monthly Progress Reports",
    ],
    desc: "Comprehensive coaching for all core subjects. We build strong foundations and ensure students are well-prepared for board examinations.",
  },
  {
    title: "Class 11–12 Science",
    subtitle: "Science Stream",
    duration: "2 Years",
    color: "#F57C00",
    features: [
      "Physics, Chemistry, Mathematics",
      "Biology (optional)",
      "Board Exam Focused",
      "Concept-Based Learning",
      "Regular Mock Tests",
    ],
    desc: "In-depth coaching for Physics, Chemistry, Mathematics, and Biology. Designed to build conceptual clarity and board exam proficiency.",
  },
  {
    title: "JEE / NEET Foundation",
    subtitle: "Competitive Exams",
    duration: "1–2 Years",
    color: "#1F5EA8",
    features: [
      "Foundation + Advanced Preparation",
      "Daily Practice Problems",
      "Full-Length Mock Tests",
      "Expert Mentoring",
      "Performance Analytics",
    ],
    desc: "Rigorous preparation for JEE and NEET aspirants. Our structured approach builds the depth and speed needed to crack national-level exams.",
  },
  {
    title: "MHT-CET Preparation",
    subtitle: "Maharashtra CET",
    duration: "1 Year",
    color: "#F57C00",
    features: [
      "Exam-Focused Training",
      "Full Syllabus Coverage",
      "Chapter-Wise Mock Tests",
      "Previous Year Papers",
      "Strategy Sessions",
    ],
    desc: "Targeted preparation for MHT-CET with complete syllabus coverage, frequent mock tests, and exam strategy sessions.",
  },
];

export default function Courses() {
  return (
    <div>
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #1F5EA8, #0B2F57)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Our Courses
          </h1>
          <p className="text-blue-200">
            Choose the right program to achieve your academic goals
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl overflow-hidden border border-[#E6EAF1] shadow-card"
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: course.color }}
                />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#0B2F57]">
                        {course.title}
                      </h3>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: course.color }}
                      >
                        {course.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {course.desc}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {course.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <Check
                          className="w-4 h-4 shrink-0"
                          style={{ color: course.color }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/admissions"
                    data-ocid="courses.primary_button"
                    className="block w-full text-center py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: course.color }}
                  >
                    Enroll Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
