"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import logo from "../../public/logo.png";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-800 text-white py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid flex-wrap gap-8 sm:grid-cols-2 md:grid-cols-3 text-center sm:text-left">
          {/* Logo & Description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              href="/"
            >
            <img
              src={logo.src}
              alt="Leading Edge Logo"
              className="w-24 object-contain mx-auto md:mx-0 brightness-0 invert"
            />
            <h3 className="text-2xl font-bold mt-4">
              Leading<span className="italic">E</span>dge
            </h3>
            </Link>
            <p className="text-gray-400 mt-2">
              Elevating perspectives through innovative drone technology.
            </p>
          </motion.div>

        {/* <div className=""> */}
          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}

          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="m-auto sm:m-0 text-start  w-[7rem] sm:w-0 ">
            <ul className="space-y-2">
              {[
                { label: "Services", href: "#services" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "Contact", href: "#contact" },
                {
                  label: "Merchandise",
                  // href: "https://admin.shopify.com/store/d142b3-15/themes?appLoadId=327c7fab-8442-49c8-9c94-2db6ae80488c",
                  href: "https://newstartrc.myshopify.com/ ",
                  external: true,
                },
              ].map((link, index) => (
                <li key={index} className="flex">👉🏻 
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 pl-1 transition-colors "
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-blue-400 pl-1 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <p className="text-gray-400">
               Burlington, MA 01803
            </p>
            <p className="text-gray-400">
              Phone:{" "}
              <a
                href="tel:+17813659099"
                className="text-blue-500 hover:underline"
              >
                +1 (781)-365-9099
              </a>
            </p>
            <p className="text-gray-400">
              Email:{" "}
              <a
                href="mailto:Admin@MyFlightTeam.com"
                className="text-blue-500 hover:underline"
              >
                Admin@MyFlightTeam.com
              </a>
            </p>
          </motion.div>
        </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 px-2 text-center text-gray-400">
          <p>&copy; 2025 Leading Edge Drone Services. All rights reserved.</p>
        </div>
      {/* </div> */}
    </motion.footer>
  );
}
