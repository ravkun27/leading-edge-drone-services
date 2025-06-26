"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "../../public/logo.png";
import { Menu, X, ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Header() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    projectDetails: "",
  });
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isQuoteModalOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isQuoteModalOpen, isMobileMenuOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send quote request");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", service: "", projectDetails: "" });

      // Auto close modal after success
      setTimeout(() => {
        setIsQuoteModalOpen(false);
        setSubmitStatus("idle");
      }, 2500);
    } catch (error) {
      console.error("Quote request error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send quote request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  const serviceOptions = [
    { value: "aerial-photography", label: "Aerial Photography" },
    { value: "inspection", label: "Inspection Services" },
    { value: "mapping", label: "3D Mapping & Modeling" },
    { value: "surveying", label: "Land Surveying" },
    { value: "real-estate", label: "Real Estate Photography" },
    { value: "construction", label: "Construction Monitoring" },
    { value: "agriculture", label: "Agricultural Analysis" },
    { value: "other", label: "Other Services" },
  ];

  return (
    <>
      <motion.header
        className={`fixed w-full z-[60] transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
            : "bg-white/80 backdrop-blur-md shadow-md"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 group"
            >
              <div className="relative">
                <img
                  src={logo.src}
                  alt="LeadingEdge Logo"
                  className="w-24 h-8 sm:w-10 sm:h-10 lg:w-24 lg:h-12 transition-transform group-hover:scale-105"
                />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                LeadingEdge
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-700 hover:text-blue-600 font-medium text-sm xl:text-base transition-colors duration-200 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </motion.a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={() => setIsQuoteModalOpen(true)}
                className="text-white px-4 lg:px-6 py-2 text-sm lg:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <span className="text-xl font-bold text-gray-800">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <div className="space-y-6">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        className="block text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <motion.div
                    className="mt-8 pt-6 border-t border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsQuoteModalOpen(true);
                      }}
                      className="w-full text-white py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Get a Quote
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsQuoteModalOpen(false);
              }
            }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mt-12 max-h-[80vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // prevent click from bubbling
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  Request a Quote
                </h2>
                <p className="text-gray-600 text-sm">
                  Let's discuss your project requirements
                </p>
              </div>

              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center"
                  >
                    ✅ Your request was sent successfully!
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center"
                  >
                    ❌ Failed to send request. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="name"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="email"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="service"
                  >
                    Service Type *
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                      required
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="projectDetails"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Describe your project requirements, timeline, and any specific details..."
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsQuoteModalOpen(false)}
                    className="flex-1 px-6 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1  text-white py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
