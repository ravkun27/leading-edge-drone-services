// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
// import emailjs from "@emailjs/browser";
// import axios from "axios"; // Import Axios for API calls
// import { Textarea } from "@/components/ui/textarea";
// const ServiceID = process.env.SERVICE_ID01;
// const templateID = process.env.TEMPLATE_ID02;
// const public_KEY= process.env.PUBLIC_KEY01;
// const cloudinaryURl = process.env.CLOUDINARY_URl;
// const cloudinaryPRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

// export default function WorkWithUs() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);

// //  adding data
// const [formData, setFormData] = useState({
//   name: "",
//   email: "",
//   message: "",
// });

// const onhandleChange = (
//   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// ) => {
//   const { name, value } = e.target;
//   setFormData((prevState) => ({ ...prevState, [name]: value }));
// };

//   // Handle File Selection
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setSelectedFile(file);
//     }
//   };

//   // Cloudinary API Response Type
//   interface CloudinaryResponse {
//     secure_url: string;
//   }

//   // Upload File to Cloudinary

//   return (
//     <motion.section
//       className="w-[50%]"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       {/* <div className="w-full md:w-1/2">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
//         >
//           Work With Us
//         </button>
//       </div> */}

//         {/* pop up mes start */}

//         {isModalOpen && (
//                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                  <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
//                    <h3 className="text-lg font-semibold">Join LeadingEdge</h3>
//                    <p className="mt-2 text-sm text-gray-600">
//                    At LeadingEdge, drone operators are integral to driving innovation
//                       and fostering regional growth in New England. We seek talented
//                       individuals to join our team. To be considered, submit your resume
//                      and a description of your expertise.
//                    </p>

//                    <motion.div className="my-2 md:my-4">
//                      <Input type="file" className="bg-gray-200" onChange={handleFileChange} required />
//                    </motion.div>

//                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                      <Button
//                       //  type="submit"
//                        className="w-full"
//                        disabled={loading}
//                        onClick={handleFileSubmit}
//                      >
//                        {loading ? "Sending..." : "Attach & Submit"}
//                      </Button>
//                    </motion.div>

//                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                      <Button
//                        className="w-full mt-4 bg-red-600 hover:bg-red-500"
//                        onClick={() => setIsModalOpen(false)}
//                      >
//                        Close
//                      </Button>
//                    </motion.div>
//                  </div>
//                </div>
//              )}

//     </motion.section>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import axios from "axios"; // Import Axios for API calls
import { Textarea } from "@/components/ui/textarea";
const ServiceID = process.env.SERVICE_ID01;
const templateID = process.env.TEMPLATE_ID02;
const public_KEY = process.env.PUBLIC_KEY01;
const cloudinaryURl = process.env.CLOUDINARY_URl;

export default function WorkWithUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  //   const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);

  // Handle File Selection
  const onhandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  // Cloudinary API Response Type
  interface CloudinaryResponse {
    secure_url: string;
  }

  // Upload File to Cloudinary
  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Rohit kumar"); // Replace with your Cloudinary upload preset

    try {
      console.log("my formdata is for upload file", formData);

      const response = await axios.post<CloudinaryResponse>(
        ` ${cloudinaryURl}`, // Replace with your Cloudinary cloud name
        formData
      );

      return response?.data.secure_url; // ✅ No more error
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  }

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    // EmailJS parameters
    const emailParams = {
      ...formData,
      message: `${formData.message}\n\nNew Document uploaded: ${cloudinaryUrl}`, // Sending Cloudinary URL instead of Base64
      to_name: "Rohit kumar", // admin name
      to_email: "rohitkumar96430@gmail.com", // admin emailID
      mobile: 9848684964, // sender/ user mobile no if you need
    };

    console.log("file data before try", emailParams);
    try {
      console.log("file data before emailing", emailParams);
      const response = await emailjs.send(
        `${ServiceID}`, // Replace with your EmailJS Service ID
        `${templateID}`, // Replace with your EmailJS Template ID
        emailParams, // form data
        `${public_KEY}` // Replace with your EmailJS Public Key
      );
      console.log("myrespnce", response);

      alert("Email Sent Successfully!");
    } catch (error) {
      console.error("rohit EmailJS Error:", error);
      // alert("Failed to send email. rohit", error);
    }

    setLoading(false);
  };

  // // Handle File Submission via EmailJS
  const handleFileSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file before submitting.");
      return;
    }

    setLoading(true);

    // Upload file to Cloudinary
    const fileUrl = await uploadFile(selectedFile); // ✅ Fixed function call

    if (!fileUrl) {
      alert("File upload failed. Please try again.");
      setLoading(false);
      return;
    }

    setCloudinaryUrl(fileUrl);

    // EmailJS parameters
    const emailParams = {
      ...formData,
      to_name: "Rohit kumar", // admin name
      to_email: "rohitkumar9643017@gmail.com", // admin emailID
      mobile: 9654853181, // sender/ user mobile no if you need
      // message: `New Document uploaded: ${fileUrl}`, // Sending Cloudinary URL instead of Base64
    };

    try {
      console.log("file data before email", emailParams);

      await emailjs.send(
        `${ServiceID}`, // Replace with your EmailJS Service ID
        `${templateID}`, // Replace with your EmailJS Template ID
        emailParams, // form data
        `${public_KEY}` // Replace with your EmailJS Public Key
      );
      alert("Email Sent Successfully!");
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send email.");
    }

    setLoading(false);
  };

  return (
    <motion.section
      className="w-[50%] bg-gray-100 flex flex-col md:flex-row-reverse items-center p-4 sm:p-6 md:p-8 max-w-md"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="w-full max-w-lg mx-auto flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl font-bold text-center mb-2">Work With Us</h2>

        <motion.div
          className="mx-auto w-full"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <motion.div
              className="shadow-lg"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={onhandleChange}
                required
              />
            </motion.div>

            <motion.div
              className="shadow-lg"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={onhandleChange}
                required
              />
            </motion.div>

            <motion.div
              className="shadow-lg"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={onhandleChange}
                required
              />
            </motion.div>

            <motion.div className="flex gap-3">
              <Button
                className="w-full text-white"
                onClick={() => setIsModalOpen(true)}
              >
                Attach document
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold text-center">
              Join LeadingEdge
            </h3>
            <p className="mt-2 text-sm text-gray-600 text-center">
              At LeadingEdge, drone operators drive innovation and foster
              growth. Submit your resume and expertise details to be considered.
            </p>

            <motion.div className="my-4">
              <Input
                type="file"
                className="bg-gray-200 w-full"
                onChange={handleFileChange}
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                onClick={handleFileSubmit}
              >
                {loading ? "Sending..." : "Attach & Submit"}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="w-full mt-4 bg-red-600 hover:bg-red-500"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
