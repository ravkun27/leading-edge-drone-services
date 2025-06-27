// app/work-with-us/WorkWithUs.tsx
"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Upload, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function WorkWithUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setErrorMessage("Please upload a PDF file only");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File size should not exceed 10MB");
      return;
    }

    setSelectedFile(file);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingStatus("sending");
    setErrorMessage("");

    if (!selectedFile) {
      setErrorMessage("Please upload a resume file");
      setLoadingStatus("error"); // previously was "idle"
      return;
    }

    try {
      // Create form data for API submission
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name);
      submitFormData.append("email", formData.email);
      submitFormData.append("message", formData.message);
      submitFormData.append("resume", selectedFile);

      const response = await fetch(
        "https://leading-edge-drone-services.vercel.app/api/submit-application",
        {
          method: "POST",
          body: submitFormData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      // Reset form on success
      setFormData({ name: "", email: "", message: "" });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setLoadingStatus("sent");
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Submission failed"
      );
      setLoadingStatus("error");
    } finally {
      setTimeout(() => {
        setLoadingStatus("idle");
        setErrorMessage(""); // clear it too
      }, 3000);
    }
  };

  return (
    <motion.div
      className="p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Subtle geometric decoration */}
      <div className="absolute top-0 left-0 w-32 h-32 border border-gray-100 rounded-full -ml-16 -mt-16 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 border border-gray-100 rounded-full -mr-12 -mb-12 opacity-20"></div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black mb-2">
            Join LeadingEdge
          </h2>
          <div className="w-16 h-0.5 bg-black mx-auto mb-4"></div>
          <p className="text-sm text-gray-600 leading-relaxed">
            At LeadingEdge, drone operators drive innovation and foster growth.
            Submit your resume and expertise details to be considered.
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
              name="message"
              placeholder="Tell us about your qualifications, experience, and why you'd like to join our team..."
              value={formData.message}
              onChange={handleChange}
              className="min-h-[140px] text-base border-2 border-gray-200 focus:border-black focus:ring-0 rounded-xl resize-none transition-all duration-200 bg-white"
              required
            />
          </div>

          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Resume/CV *
              </label>
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-14 text-base font-medium bg-white hover:bg-gray-50 text-black border-2 border-gray-200 hover:border-black transition-all duration-200 rounded-xl flex items-center justify-center"
                variant="outline"
              >
                <Upload className="w-5 h-5 mr-2" />
                {selectedFile
                  ? `Selected: ${selectedFile.name}`
                  : "Upload Resume (PDF only)"}
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Maximum file size: 10MB
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black"
              disabled={loadingStatus === "sending"}
            >
              <div className="flex items-center justify-center">
                {loadingStatus === "sending" && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Submitting...
                  </>
                )}
                {loadingStatus === "sent" && (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Submitted!
                  </>
                )}
                {loadingStatus === "error" && (
                  <>
                    <XCircle className="w-5 h-5 mr-2 text-red-400" />
                    {errorMessage === "Please upload a resume file"
                      ? "Resume Required"
                      : "Try Again"}
                  </>
                )}

                {loadingStatus === "idle" && (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </div>
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
