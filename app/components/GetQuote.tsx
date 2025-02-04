"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useModal } from "../context/ModalContext";

export default function GetQuoteModal() {
  const { isQuoteOpen, openQuoteModal, closeQuoteModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    details: "",
  });

  // Auto-open modal on first page load
  useEffect(() => {
    const hasShown = sessionStorage.getItem("hasShownModal");
    if (!hasShown) {
      openQuoteModal(); // Open the modal if it hasn't been shown
      sessionStorage.setItem("hasShownModal", "true");
    }
  }, [openQuoteModal]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission...
    console.log("Form Data Submitted:", formData);
    closeQuoteModal(); // Close the modal after submission
  };

  return (
    <AnimatePresence>
      {isQuoteOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-white rounded-lg shadow-xl relative"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
              onClick={closeQuoteModal}
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                Get a Drone Service Quote
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                  />
                </div>

                {/* Service Type Field */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Service Type
                  </label>
                  <Select
                    name="service"
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, service: value }))
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aerial-photography">
                        Aerial Photography
                      </SelectItem>
                      <SelectItem value="mapping-surveying">
                        Mapping & Surveying
                      </SelectItem>
                      <SelectItem value="inspections">Inspections</SelectItem>
                      <SelectItem value="delivery">Drone Delivery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Details Field */}
                <div>
                  <label
                    htmlFor="details"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Additional Details
                  </label>
                  <Textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Tell us more about your project"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Request Quote
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
