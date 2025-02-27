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
  // {
  //   category: "realestate",
  //   image:
  //     "https://images.pexels.com/photos/8431188/pexels-photo-8431188.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   title: "Luxury Villa Aerial",
  // },
  // {
  //   category: "photography",
  //   image:
  //     "https://images.pexels.com/photos/5032264/pexels-photo-5032264.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   title: "Mountain Range",
  // },
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
  {
    category: "mapping",
    image:"/portfolioImg/mobiledronview.jpg",
    title: "Drone-based Mapping", //Agricultural Land Survey 
  },
  {
    category: "mapping",
    image:"/portfolioImg/area.jpg",
    title: "Land Area Measurement", //House Plot Analysis 
  },
  {
    category: "photography",
    image:"/portfolioImg/houseExterior.jpg",
    title: "House Exterior", //General View  
  },
  {
    category: "realestate",
    image:"/portfolioImg/largeHousearea.jpg",
    title: "Community Housing", // Large Housing Area   
  },
  {
    category: "realestate",
    image:"/portfolioImg/singlehouse.jpg",
    title: " Individual Property View", 
  },
];

const sponsors = [
  {
    name: "National Association for Coordinators",
    logo: "/images/partner.png", // Replace with actual logo URL
  },
  {
    name: "fully Insured",
    logo: "/images/fullyInsuredNew.png", // Replace with actual logo URL
  },
  {
    name: "administration",
    logo: "/images/administrationNew.png", // Replace with actual logo URL
  },
  {
    name: "Pilot Institute",
    logo: "/images/certified.png", // Replace with actual logo URL
  },
  
];

const accolades = [
  "Pilot Institute Classes 2021 Graduate",
  "Certified Drone Operator",
  "FAA Part 107 Licensed",
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
      className="pt-20 pb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        {/* Sponsors Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">
            Certified & Supported By
          </h3>
          <div className="flex justify-center gap-3 sm:gap-7 md:gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className=""
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-16 md:h-24 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accolades Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">Our Accolades</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {accolades.map((accolade, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-gray-100 px-6 py-2 rounded-full text-sm font-medium"
              >
                {accolade}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Portfolio Section */}
        <h2 className="text-4xl font-bold text-center mb-4 sm:mb-12">Our Portfolio</h2>
        <Tabs defaultValue="all" className="w-full ">
          <TabsList className="flex justify-center mb-8 ">
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
          <TabsContent value={activeTab} className="mt-0">
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
                    whileHover={{ scale: 1, transition: { duration: 0.3 } }}
                    className="group"
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <motion.img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
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
