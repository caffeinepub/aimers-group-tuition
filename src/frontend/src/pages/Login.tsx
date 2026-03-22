import { Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl border border-[#E6EAF1] shadow-card p-8"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#1F5EA8] flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
            A
          </div>
          <h1 className="text-xl font-bold text-[#0B2F57]">
            AIMERS GROUP TUITION
          </h1>
          <p className="text-gray-500 text-sm">Student Portal Login</p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-semibold text-[#0B2F57] mb-2"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              data-ocid="login.input"
              placeholder="student@email.com"
              className="w-full px-4 py-3 rounded-lg border border-[#E6EAF1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5EA8] transition"
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-semibold text-[#0B2F57] mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                data-ocid="login.input"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-[#E6EAF1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5EA8] transition pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            data-ocid="login.submit_button"
            className="w-full py-3.5 bg-[#1F5EA8] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Admin access?{" "}
          <Link
            to="/admin"
            data-ocid="login.link"
            className="text-[#1F5EA8] font-semibold hover:underline"
          >
            Admin Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
