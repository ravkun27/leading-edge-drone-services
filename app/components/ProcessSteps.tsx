"use client"; // Add this at the top of your component file

import { motion } from "framer-motion";
import { MessageSquare, Clipboard, Play, Package } from "lucide-react";

const steps = [
  {
    title: "Consult",
    description:
      "We discuss your needs and tailor a solution that fits your project requirements.",
    icon: MessageSquare,
  },
  {
    title: "Plan",
    description:
      "Our experts create a detailed flight plan and timeline for your project.",
    icon: Clipboard,
  },
  {
    title: "Execute",
    description:
      "Our skilled pilots carry out the mission with precision and care.",
    icon: Play,
  },
  {
    title: "Deliver",
    description:
      "We process the data and deliver high-quality results that exceed expectations.",
    icon: Package,
  },
];

export default function ProcessSteps() {
  return (
    <section className="pt-20 pb-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 sm:mb-12">Our Process</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <>
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              >
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <step.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <div className="h-[1.5px] w-full sm:hidden bg-gray-200 mt-2"></div>
            </motion.div>
              </>
          ))}
        </div>
      </div>
    </section>
  );
}
