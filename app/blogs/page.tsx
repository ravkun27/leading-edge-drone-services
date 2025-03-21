import Image from "next/image";
import { Button } from "@/components/ui/button"; // Using shadcn/ui button
import { Card, CardContent } from "@/components/ui/card"; // Using shadcn/ui card
import { Link } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Blog
        </h1>
        <p className="mt-2 text-gray-700">
          Explore our latest insights on aerial technology and STEM education.
        </p>
      </header>

      {/* Blog Content Section */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">
            The Power of Aerial Mapping
          </h2>
          <p className="text-gray-900">
            During recent property mapping, our clients were amazed at the true
            detail that aerial photos provide compared to more conventional and
            costly means.
          </p>
          {/* Optimized Image */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/air3s.jpeg"
              alt="Aerial mapping"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">
            Empowering Students with STEM
          </h2>
          <p className="text-gray-900">
            Our student outreach program has gained significant momentum. We
            currently have students from three municipalities participating in
            our courses, with more expected to join. Once students discover the
            potential of STEM, especially with the rapidly evolving fields of
            machine learning and Drones as a Service (DAAS), their interest
            grows exponentially.
          </p>
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/Skydio.png-768x428.png"
              alt="Aerial mapping"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer Section */}
      <footer className="text-center">
        <p className="font-semibold text-2xl text-gray-900 uppercase">
          myflightteam
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Unlocking the potential of aerial technology
        </p>
        <Button className="m-6 h-12 text-xl">
          <a href="mailto:admin@myflightteam.com">Contact Us</a>
        </Button>
      </footer>
    </div>
  );
}
