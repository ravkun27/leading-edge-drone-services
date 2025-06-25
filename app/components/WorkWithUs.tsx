// app/work-with-us/WorkWithUs.tsx
"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import { Upload } from "upload-js";

const upload = Upload({ apiKey: "public_G22nhkLPo47VfnqYCWthuNJ8PfXr" });

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

    if (!selectedFile) {
      setErrorMessage("Please upload a resume file");
      setLoadingStatus("idle");
      return;
    }

    try {
      const uploadResult = await upload.uploadFile(selectedFile, {
        path: { folderPath: "/resumes" },
      });

      const resumeUrl = uploadResult.fileUrl;

      await emailjs.send(
        // "service_6jxwplg",
        "service_td7w8mc",
        // "template_dyy9lka",
        "template_xgzaj6a",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          resume_link: resumeUrl,
        },
        // "NPtSw5j44Sl-MG8bx"
        "MySmy2UBA3kQBc_YQ"
      );

      setFormData({ name: "", email: "", message: "" });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setLoadingStatus("sent");
    } catch (error) {
      setErrorMessage("Submission failed");
      setLoadingStatus("error");
    } finally {
      setTimeout(() => setLoadingStatus("idle"), 3000);
    }
  };

  return (
    <motion.div
      className="p-6 bg-white shadow-xl rounded-xl space-y-4 h-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-semibold text-center">Work With Us</h2>

      {loadingStatus === "sent" && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md">
          Application submitted successfully!
        </div>
      )}
      {errorMessage && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData?.name}
          onChange={handleChange}
          className="py-6 text-lg"
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="your.email@example.com"
          value={formData?.email}
          onChange={handleChange}
          className="py-4 text-lg"
          required
        />
        <Textarea
          name="message"
          placeholder="Your qualifications and experience..."
          value={formData?.message}
          onChange={handleChange}
          className="h-28 text-lg"
          required
        />

        <div className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-6 text-lg"
            variant="outline"
          >
            {selectedFile
              ? `Selected: ${selectedFile.name}`
              : "Upload Resume (PDF)"}
          </Button>

          <Button
            type="submit"
            className="w-full py-6 text-lg"
            disabled={loadingStatus === "sending"}
          >
            {loadingStatus === "sending" && "Submitting..."}
            {loadingStatus === "sent" && "Submitted ✓"}
            {loadingStatus === "error" && "Failed to Submit ❌"}
            {loadingStatus === "idle" && "Submit Application"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
