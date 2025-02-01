"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "../../public/logo.png";

export default function Header() {
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
            <span className="text-lg md:text-2xl font-bold text-blue-600">
              Leading<span className="italic">E</span>dge
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
            <Button>Get a Quote</Button>
          </motion.div>

          {/* Mobile Menu Button - You can add this later */}
          <button className="md:hidden">
            <span className="sr-only">Open menu</span>
            {/* Add your menu icon here */}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
