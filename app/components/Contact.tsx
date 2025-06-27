"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import WorkWithUs from "./WorkWithUs";
import { Send, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loadingStatus, setLoadingStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://leading-edge-drone-services.vercel.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setLoadingStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setLoadingStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setTimeout(() => {
        setLoadingStatus("idle");
        setErrorMessage("");
      }, 4000);
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
      className="pt-20 pb-8 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Ready to take your project to new heights? Contact us for
            professional drone services or explore career opportunities with our
            team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="p-8 md:p-10 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full">
              {/* Subtle geometric decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 border border-gray-100 rounded-full -mr-16 -mt-16 opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 border border-gray-100 rounded-full -ml-12 -mb-12 opacity-20"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Send us a Message
                  </h3>
                  <div className="w-16 h-0.5 bg-black mx-auto mb-4"></div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Have questions, need support? Reach out to us using the form
                    below or send us an email — we’ll get back to you as soon as
                    possible. We’d love to hear from you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-black mb-3"
                      >
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-14 text-base border-2 border-gray-200 focus:border-black focus:ring-0 rounded-xl transition-all duration-200 bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-black mb-3"
                      >
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-14 text-base border-2 border-gray-200 focus:border-black focus:ring-0 rounded-xl transition-all duration-200 bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-black mb-3"
                    >
                      Your Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project, questions, or how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[160px] text-base border-2 border-gray-200 focus:border-black focus:ring-0 rounded-xl resize-none transition-all duration-200 bg-white"
                      required
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center mb-4">
                      🔒 Your information is secure and will only be used to
                      respond to your inquiry.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Button
                      type="submit"
                      disabled={loadingStatus === "sending"}
                      className="w-full h-14 text-lg font-semibold bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black"
                    >
                      {loadingStatus === "sending" ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Sending Message...
                        </div>
                      ) : loadingStatus === "sent" ? (
                        <div className="flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Message Sent!
                        </div>
                      ) : loadingStatus === "error" ? (
                        <div className="flex items-center justify-center">
                          <XCircle className="w-5 h-5 mr-2" />
                          Try Again
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Work With Us Component */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <WorkWithUs />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
