"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// Define the type **outside** the component
type FormDataType = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showWorkDetails, setShowWorkDetails] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Correctly type `event`
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Correctly type `handleChange`
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await emailjs.send(
        "service_nf44a05", // Replace with your EmailJS Service ID
        "template_ugkimkm", // Replace with your EmailJS Template ID
        formData,
        "3MdbeSJOkbrN9IOP0" // Replace with your EmailJS Public Key
      );

      if (response.status === 200) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Email send error:", error);
      alert("Error sending message.");
    }

    setLoading(false);
  };

  return (
    <motion.section
      id="contact"
      className="pt-20 pb-8 bg-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 sm:mb-12">
          Get in touch with us
        </h2>
        <motion.div
          className="w-full mx-auto flex flex-col md:grid md:grid-cols-2 gap-6 md:p-6"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* General Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-xl font-semibold  mb-4">Contact Us</h2>

            <motion.div
              className="mb-4"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              className="mb-4"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              className="mb-4"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full text-white py-3 rounded-lg"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </motion.div>
          </motion.form>

          {/* Work With Us Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Work With Us</h2>

            <motion.div
              className="mb-4"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              className="mb-4"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              className="mb-4"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Textarea
                name="message"
                placeholder="Tell us about your project"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </motion.div>

            {/* Toggle Additional Info */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                className="w-full py-3 rounded-lg"
                onClick={() => setShowWorkDetails(!showWorkDetails)}
              >
                Work with us
              </Button>
            </motion.div>

            {/* Additional Information (Only Shows When Button is Clicked) */}
            {showWorkDetails && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setShowWorkDetails(false)} // Close modal on backdrop click
              >
                <motion.div
                  className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                >
                  {/* Close Button */}
                  <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                    onClick={() => setShowWorkDetails(false)}
                  >
                    ✖
                  </button>

                  <h2 className="text-xl font-semibold mb-2">Work With Us</h2>
                  <p className="text-sm text-gray-700">
                    At <strong>LeadingEdge</strong>, drone operators are
                    integral to driving innovation and fostering regional growth
                    in New England. With anticipated substantial growth, we are
                    seeking talented individuals to join our team.
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    To be considered for future opportunities, please submit
                    your resume and a description of your areas of expertise.
                    Current open project listings may fluctuate; please revisit
                    this page for the latest updates.
                  </p>

                  {/* Attach Document Button */}
                  <div className="mt-4">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="fileUpload"
                    />
                    <label
                      htmlFor="fileUpload"
                      className="cursor-pointer text-white bg-black hover:bg-black/80 py-2 px-4 rounded-md text-sm flex items-center justify-center"
                    >
                      {selectedFile ? selectedFile.name : "Attach Documents"}
                    </label>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
}
