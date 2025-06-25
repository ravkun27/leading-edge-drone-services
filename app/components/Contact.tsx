"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import WorkWithUs from "./WorkWithUs";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loadingStatus, setLoadingStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingStatus("sending");

    try {
      await emailjs.send(
        "service_6jxwplg",
        "template_dyy9lka",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to_email: "admin@myflightteam.com",
        },
        "NPtSw5j44Sl-MG8bx"
      );

      setLoadingStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setLoadingStatus("error");
    } finally {
      setTimeout(() => setLoadingStatus("idle"), 3000); // Reset after 3 seconds
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Get in Touch With Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow-xl rounded-xl space-y-4"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-center mb-4">
              Contact Form
            </h2>

            <div className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="py-6 text-lg"
                required
              />

              <Input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="py-6 text-lg"
                required
              />

              <Textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                className="min-h-[185px] text-lg"
                required
              />
            </div>

            <Button
              type="submit"
              className={`w-full py-6 text-lg ${
                loadingStatus === "error" ? "bg-red-600" : ""
              }`}
              disabled={loadingStatus === "sending"}
            >
              {loadingStatus === "sending" && "Submitting..."}
              {loadingStatus === "sent" && "Submitted ✓"}
              {loadingStatus === "error" && "Failed to Submit ❌"}
              {loadingStatus === "idle" && "Submit Application"}
            </Button>
          </motion.form>

          <WorkWithUs />
        </div>
      </div>
    </motion.section>
  );
}
