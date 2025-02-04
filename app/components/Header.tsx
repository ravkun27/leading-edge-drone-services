"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "../../public/logo.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useModal } from "../context/ModalContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openQuoteModal } = useModal();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between relative h-12">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            <img
              src={logo.src}
              alt="Leading Edge Logo"
              className="w-16 md:w-32 h-auto object-contain"
            />
            <span className="text-2xl md:text-3xl font-extrabold text-blue-600 tracking-tight">
              <span className="text-blue-800">Leading</span>
              <span className="italic text-blue-600">E</span>
              <span className="text-blue-800">dge</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center space-x-8">
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#services"
                  className="hover:text-blue-600 font-medium"
                >
                  Services
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#portfolio"
                  className="hover:text-blue-600 font-medium"
                >
                  Portfolio
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#contact"
                  className="hover:text-blue-600 font-medium"
                >
                  Contact
                </Link>
              </motion.li>
            </ul>
          </nav>

          {/* Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block flex-shrink-0"
          >
            <Button onClick={openQuoteModal}>Get a Quote</Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
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
  );
}
