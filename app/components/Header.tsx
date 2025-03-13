"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "../../public/logo.png";
import { Menu, X } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Header() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    projectDetails: "",
  });

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
    try {
      const response = await emailjs.send(
        "service_nf44a05",
        "template_ugkimkm",
        formData,
        "3MdbeSJOkbrN9IOP0"
      );

      if (response.status === 200) {
        alert("Your request was sent successfully!");
        setIsQuoteModalOpen(false);
        setFormData({ name: "", email: "", service: "", projectDetails: "" });
      } else {
        alert("Failed to send request. Please try again.");
      }
    } catch (error) {
      alert("Error sending request.");
    }
  };

  return (
    <>
      <motion.header
        className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <img src={logo.src} alt="Logo" className="w-24 h-auto" />
              <span className="text-2xl font-extrabold text-blue-600">
                LeadingEdge
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {[
                { href: "#services", label: "Services" },
                { href: "#portfolio", label: "Portfolio" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-gray-800 hover:text-blue-600 font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button onClick={() => setIsQuoteModalOpen(true)}>
                Get a Quote
              </Button>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6 shadow-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[
              { href: "#services", label: "Services" },
              { href: "#portfolio", label: "Portfolio" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xl font-semibold text-gray-800 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button onClick={() => setIsQuoteModalOpen(true)}>
              Get a Quote
            </Button>
            <button
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={30} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div
            key="modal"
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-md w-full m-4"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Request a Quote
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="service">
                    Service Type
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="aerial-photography">
                      Aerial Photography
                    </option>
                    <option value="inspection">Inspection</option>
                    <option value="mapping">3D Mapping</option>
                    <option value="surveying">Land Surveying</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="projectDetails"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsQuoteModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
