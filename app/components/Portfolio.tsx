"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

const portfolioItems = [
  {
    category: "photography",
    image:
      "https://images.pexels.com/photos/1726310/pexels-photo-1726310.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Coastal Sunrise",
  },
  {
    category: "mapping",
    image:
      "https://images.pexels.com/photos/681347/pexels-photo-681347.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Urban Development Map",
  },
  {
    category: "realestate",
    image:
      "https://images.pexels.com/photos/8431188/pexels-photo-8431188.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Luxury Villa Aerial",
  },
  {
    category: "photography",
    image:
      "https://images.pexels.com/photos/5032264/pexels-photo-5032264.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Mountain Range",
  },
  {
    category: "mapping",
    image:
      "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Agricultural Land Survey",
  },
  {
    category: "realestate",
    image:
      "https://images.pexels.com/photos/1265102/pexels-photo-1265102.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Commercial Complex",
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems =
    activeTab === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeTab);

  return (
    <motion.section
      id="portfolio"
      className="py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Portfolio</h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All
            </TabsTrigger>
            <TabsTrigger
              value="photography"
              onClick={() => setActiveTab("photography")}
            >
              Photography
            </TabsTrigger>
            <TabsTrigger
              value="mapping"
              onClick={() => setActiveTab("mapping")}
            >
              Mapping
            </TabsTrigger>
            <TabsTrigger
              value="realestate"
              onClick={() => setActiveTab("realestate")}
            >
              Real Estate
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Add hover animation
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <motion.img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-64 object-cover"
                          whileHover={{ scale: 1.1 }} // Add zoom effect on hover
                          transition={{ duration: 0.3 }}
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </motion.section>
  );
}
