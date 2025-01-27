"use client"; // Add this at the top of your component file

import { motion } from "framer-motion";
import { Clock, DollarSign, Maximize, ShieldCheck } from "lucide-react";

const advantages = [
  {
    title: "Time-Efficient",
    description:
      "Drones can cover large areas quickly, saving time and resources.",
    icon: Clock,
  },
  {
    title: "Cost-Effective",
    description: "Reduce operational costs compared to traditional methods.",
    icon: DollarSign,
  },
  {
    title: "High-Resolution Data",
    description: "Capture detailed imagery and data for accurate analysis.",
    icon: Maximize,
  },
  {
    title: "Safe Operations",
    description: "Access hard-to-reach areas without risking human safety.",
    icon: ShieldCheck,
  },
];

export default function DroneAdvantages() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Advantages of Drone Technology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <advantage.icon className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">{advantage.title}</h3>
              </div>
              <p className="text-gray-600">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
