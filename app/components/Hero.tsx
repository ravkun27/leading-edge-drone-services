"use client"; // Add this at the top of your component file

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
 import mavicImage from "/mavic.webp";
// import { Link } from "lucide-react";
import Link from "next/link";


export default function Hero() {
  const videoUrls = [
    "https://cdn.pixabay.com/video/2020/04/07/35258-407130715_large.mp4",
    "https://cdn.pixabay.com/video/2018/01/20/13851-252799027_large.mp4",
    "https://cdn.pixabay.com/video/2023/10/08/184069-872413642_tiny.mp4",
    "https://www.pexels.com/video/aerial-view-of-historic-building-with-surrounding-grounds-29204150/",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Function to handle video change on end
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
  };

  return (
    <>
      <motion.section
        className="relative h-screen flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0 h-[90%] sm:h-full">
          {/* Background video with transition */}
          <motion.video
            key={currentVideoIndex} // key prop will trigger re-mounting the video
            src={videoUrls[currentVideoIndex]}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop={false} // Disable looping so the video stops when it ends
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1508614589041-895b88991e3e" // Optional poster image
            onEnded={handleVideoEnd} // Trigger handleVideoEnd when video finishes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }} // Adjust duration to control transition speed
            preload="auto" // Ensure video is preloaded to start without delay
          >
            Your browser does not support video playback.
          </motion.video>
          <div className="absolute inset-0 bg-black/50"></div>{" "}
          {/* Optional overlay to darken the video */}
        </div>
   
        {/* <motion.div
            className="left-24 bottom-[70%] sm:left-[60%] sm:bottom-[10%] lg:bottom-[40%] lg:left-2/3 w-[7rem] sm:w-[12rem] lg:w-[20rem] h-[7rem] sm:h-[12rem] lg:h-[20rem] absolute z-50 sm:z-20"
            animate={{
              y: [0, -30, -40, -60, -50, 0], // Smooth up and down motion
              x: [0, 100, -20, 50, 10, 0],  // Sideways drift
              rotate: [10, 2, -2, 3, -3, 0], // Slight tilting
            }}
            transition={{
              duration: 4, // Total duration of one cycle
              repeat: Infinity, // Infinite looping
              repeatType: "mirror", // Moves back and forth smoothly
              ease: "easeInOut", // Smooth easing effect
            }}
           >
           <motion.img
             src="/image.png"
             alt="drone img"
             className="w-full object-cover transition-transform duration-300"
            />
        </motion.div> */}

         {/* <motion.div
           className="left-24 bottom-[70%] sm:left-[60%] sm:bottom-[10%] lg:bottom-[40%] lg:left-2/3 w-[7rem] sm:w-[12rem] lg:w-[20rem] h-[7rem] sm:h-[12rem] lg:h-[20rem] absolute z-50 sm:z-20"
           animate={{
             y: [0, -30, -40, -60, -50, -20, 0],  // More keyframes for smoothness
             x: [0, 80, -20, 40, 10, -10, 0], // Subtle drift
             rotate: [5, 2, -3, 3, -2, 0], // Gentle tilting
             opacity: [0, 1, 1, 0], // Fade in & out effect
           }}
           transition={{
             duration: 5, // Slightly longer for smoothness
             repeat: Infinity,
             repeatType: "mirror",
             ease: "easeInOut",
           }}
         >
           <motion.img
             src="/image.png"
             alt="drone img"
             className="w-full object-cover transition-transform duration-300"
           />
         </motion.div> */}

         <motion.div
           className="left-24 bottom-[70%] sm:left-[60%] sm:bottom-[10%] lg:bottom-[40%] lg:left-2/3 w-[7rem] sm:w-[12rem] lg:w-[20rem] h-[7rem] sm:h-[12rem] lg:h-[20rem] absolute z-50 sm:z-20"
           animate={{
             y: [0, -30, -40, -60, -50, -20, 0],  
             x: [0, 80, -20, 40, 10, -10, 0],  
             rotate: [3, 1, -2, 2, -1, 0],  
             opacity: [0, 0.5, 1, 1, 0.5, 0], 
           }}
           transition={{
             duration: 6, 
             repeat: Infinity,
             repeatType: "mirror",
             ease: "easeInOut", 
           }}
         >
           <motion.img
             src="/image.png"
             alt="drone img"
             className="w-full object-cover transition-transform duration-300"
           />
         </motion.div>
         

        <motion.div
          className="container mt-8 sm:m-0 mx-auto px-4 z-10 text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl font-bold mb-4 leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Elevate Your Perspective
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl mb-8 max-w-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Professional drone photography and mapping services for breathtaking
            visuals and precise data.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ transformOrigin: "center" }} // Center the scale transformation
          >
          
          <Link href="#services" className="hover:text-blue-600 font-medium">
            <Button className="cursor-pointer hover:scale-110 transition-all duration-300" size="lg">
              Explore Our Services
            </Button>
          </Link>

          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}
