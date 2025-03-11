"use client";

import { useState, useEffect } from "react";
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // For now, just simulate a successful submission
      localStorage.setItem("quoteSubmitted", "true");

      const response = await emailjs.send(
        "service_nf44a05", // Replace with your EmailJS Service ID
        "template_ugkimkm", // Replace with your EmailJS Template ID
        formData,
        "3MdbeSJOkbrN9IOP0" // Replace with your EmailJS Public Key
      );

      if (response.status === 200) {
        alert("your request sent successfully!");
        setIsQuoteModalOpen(false);
        // Reset form data after response successfull
        setFormData({
          name: "",
          email: "",
          service: "",
          projectDetails: "",
        });
      } else {
        alert("Failed to send request. Please try again.");
      }
    } catch (error) {
      alert("Error sending request.");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openQuoteModal = () => {
    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <motion.header
        className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className=" mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between relative h-12">
            <Link
              href="/"
              className="flex items-center space-x-3 flex-shrink-0"
            >
              <img
                src={logo.src}
                alt="Leading Edge Logo"
                className="w-16 sm:w-20 md:w-28 lg:w-32 h-auto object-contain"
              />
              <span className="text-xl md:text-2xl lg:text-3xl font-extrabold text-blue-600 tracking-tight">
                <span className="text-blue-800">Leading</span>
                <span className="italic text-blue-600">E</span>
                <span className="text-blue-800">dge</span>
              </span>
            </Link>

            <nav className="hidden md:block absolute md:left-[63%]  -translate-x-1/2">
              <ul className="flex items-center space-x-8">
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="#services"
                    className="hover:text-blue-600 font-medium"
                  >
                    Services
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="#portfolio"
                    className="hover:text-blue-600 font-medium"
                  >
                    Portfolio
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="#contact"
                    className="hover:text-blue-600 font-medium"
                  >
                    Contact
                  </Link>
                </motion.li>
              </ul>
            </nav>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block flex-shrink-0"
            >
              <Button onClick={openQuoteModal}>Get a Quote</Button>
            </motion.div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-4"
              >
                <ul className="flex flex-col space-y-4">
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="#services"
                      className="block hover:text-blue-600 font-medium"
                      onClick={toggleMobileMenu}
                    >
                      Services
                    </Link>
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="#portfolio"
                      className="block hover:text-blue-600 font-medium"
                      onClick={toggleMobileMenu}
                    >
                      Portfolio
                    </Link>
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="#contact"
                      className="block hover:text-blue-600 font-medium"
                      onClick={toggleMobileMenu}
                    >
                      Contact
                    </Link>
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button onClick={openQuoteModal}>Get a Quote</Button>
                  </motion.li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div
            key="modal"
            className="fixed top-0 left-0 w-full h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white  rounded-lg p-8 max-w-md w-full m-4"
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
                    placeholder="Enter your name"
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
                    placeholder="Enter your email"
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
                    <option value="Roof-Inspections">Roof Inspections</option>
                    <option value="Solar-Panel-Inspections">
                      Solar Panel Inspections
                    </option>
                    <option value="Insurance-Claims-Inspections">
                      Insurance Claims Inspections
                    </option>
                    <option value="Crane-Inspection">Crane Inspection</option>
                    <option value="Cellar-Site-inspection">
                      Cellar Site inspection
                    </option>
                    <option value="Bridge Inspection">Bridge Inspection</option>
                    <option value="Airbnb-&-Vacation-Rentals">
                      Airbnb & Vacation Rentals{" "}
                    </option>
                    <option value="construction">Construction Sites </option>
                    <option value="other">Ariel Real Estate Videography</option>
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
                    placeholder="Write here about project details"
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
