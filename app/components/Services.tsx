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
    title: "Precision Agriculture",
    description: "Optimize crop management with detailed field analysis.",
    icon: Layers,
  },
];

export default function Services() {
  return (
    <motion.section
      id="services"
      className="py-20 bg-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
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
