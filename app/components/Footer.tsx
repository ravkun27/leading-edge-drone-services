"use client"; // Add this at the top of your component file

import { motion } from "framer-motion";
import Link from "next/link";
import logo from "../../public/logo.png";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-800 text-white py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <motion.div
            className="w-full md:w-1/3 mb-4 md:mb-0"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img
              src={logo.src}
              alt="Leading Edge Logo"
              className="h-12 w-auto object-contain brightness-0 invert"
            />
            <h3 className="text-2xl font-bold mb-4">
              Leading<span className="italic">E</span>dge
            </h3>

            <p>Elevating perspectives through innovative drone technology.</p>
          </motion.div>
          <motion.div
            className="w-full md:w-1/3 mb-6 md:mb-0"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li>
                <Link href="#services" className="hover:text-blue-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:text-blue-400">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://admin.shopify.com/store/d142b3-15/themes?appLoadId=327c7fab-8442-49c8-9c94-2db6ae80488c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                >
                  Merchandise
                </a>
              </li>
            </ul>
          </motion.div>
          <motion.div
            className="w-full md:w-1/3"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <p>10 Burlington Street, Burlington, MA 01803</p>
            <p>Phone: (781)-365-9099</p>
            <p>Email: Admin@MyFlightTeam.com</p>
          </motion.div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2025 Leading Edge Drone Services. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
