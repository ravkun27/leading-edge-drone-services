"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import WorkWithUs from "./WorkWithUs";

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

    const formDataEdit = {
      ...formData,
      to_name: "Rohit kumar", // admin name
      mobile: 9654853181, // if you need user mobile then replace it otherwise set your own mobile because in template mobile field is define
      to_email: "rohitkumar9643017@gmail.com", // admin email id
    };

    try {
      console.log("form data is ", formDataEdit);

      const response = await emailjs.send(
        "service_nf44a5", // Replace with your EmailJS Service ID
        "template_ugkikm", // Replace with your EmailJS Template ID
        formDataEdit,
        "3MdbeSJOkbN9IOP0" // Replace with your EmailJS Public Key
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
      className="pt-20 pb-8 bg-gray-100 flex flex-row-reverse sm:flex-col  justify-around"
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
              className="mb-2 md:mb-4 shadow-lg"
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
              className="mb-2 md:mb-4 shadow-lg"
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
              className="mb-2 md:mb-4 shadow-lg"
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shadow-lg mt-4 md:mt-8"
            >
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </motion.div>
          </motion.form>
          <WorkWithUs />
        </motion.div>
      </div>
    </motion.section>
  );
}
