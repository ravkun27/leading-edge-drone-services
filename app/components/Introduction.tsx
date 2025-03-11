"use client"; // Required for Framer Motion and interactivity

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assuming you're using a custom Button component

export default function IntroductionSection() {
  const handleEmailClick = () => {
    const email = "Kevin@MyFlightTeam.com";
    const subject = encodeURIComponent("Inquiry about services");
    const body = encodeURIComponent(
      "Hello Kevin,\n\nI would like to know more about your services."
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    // Optional: Log to console for debugging
    console.log(`Opening email client for ${email}`);
  };

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text and Buttons */}
        <motion.div
          className="space-y-4 sm:space-y-8 text-center lg:text-left"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className=" text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Elevating Your Aerial Needs
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Expert 2D/3D mapping, aerial photography, and drone services
            tailored to your needs. Capture the world from new heights with
            precision and creativity.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all duration-300">
              Book Now
            </Button> */}
            <Button
              className="bg-blue-700 border hover:bg-blue-500 hover:text-purple-800 py-3 px-8 rounded-lg transition-all duration-300"
              onClick={handleEmailClick}
              aria-label="Learn more about our services via email"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Side: Drone Video */}
        <motion.div
          className="relative w-full h-[400px] sm:[450px] lg:h-[550px] overflow-hidden rounded-lg shadow-2xl bg-black"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.video
            src="https://cdn.pixabay.com/video/2023/11/23/190444-888131647_large.mp4" // Replace with your video URL
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop={true} // Loop the video
            muted // Required for autoplay in most browsers
            playsInline // Required for mobile devices
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }} // Smooth fade-in
            preload="auto" // Preload the video
            controls // Add controls for debugging; remove if not needed in production
          >
            Your browser does not support the video tag.
          </motion.video>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50 opacity-50 rounded-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
