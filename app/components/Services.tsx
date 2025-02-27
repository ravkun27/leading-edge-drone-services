"use client"; // Add this at the top of your component file

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Camera,
  Map,
  Building2,
  TreePine,
  Layers,
  CuboidIcon as Cube,
  HomeIcon,
} from "lucide-react";

const services = [
  {
    title: "Aerial Photography",
    description:
      "Capture stunning high-resolution images from unique perspectives.",
    icon: Camera,
  },
  {
    title: "2D Mapping",
    description:
      "Create accurate 2D maps for land surveying and urban planning.",
    icon: Map,
  },
  {
    title: "3D Mapping",
    description:
      "Generate detailed 3D models for complex terrain and structures.",
    icon: Cube,
  },
  {
    title: "Real Estate",
    description:
      "Showcase properties with captivating aerial shots and virtual tours.",
    icon: Building2,
  },
  {
    title: "Environmental Monitoring",
    description:
      "Monitor and assess environmental changes and wildlife habitats.",
    icon: TreePine,
  },
  {
    title: "Residential & Commercial",
    description: "Comprehensive solutions for homes and businesses.",
    icon: HomeIcon, // Change the icon as needed
}
];

export default function Services() {
  return (
    <motion.section
      id="services"
      className="pt-20 pb-8 bg-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 sm:mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="">
                <CardHeader className="px-4 sm:px-6 py-2 md:py-4">
                  <service.icon className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl sm:text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
