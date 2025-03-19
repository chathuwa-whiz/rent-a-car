import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaFacebookMessenger,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useCreateEmailMutation } from "../../redux/services/emailSlice";
import { toast } from "react-toastify";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function ContactPage() {
  const [createEmail, { isLoading }] = useCreateEmailMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation: must start with 070, 071, 072, 074, 075, 076, 077, or 078 and contain exactly 10 digits
    if (formData.phone) {
      const phoneRegex = /^(070|071|072|074|075|076|077|078)\d{7}$/;
      if (!phoneRegex.test(formData.phone)) {
        toast.error(
          "Please enter a valid phone number"
        );
        return;
      }
    }

    try {
      setIsSubmitting(true);

      // Format the email data
      const emailData = {
        from: formData.email,
        to: "navodchathushka@gmail.com", // Replace with your actual email
        subject: `New contact message from ${formData.name}`,
        text: `
          Name: ${formData.name}
          Email: ${formData.email}
          Phone: ${formData.phone || "Not provided"}
          
          Message:
          ${formData.message}
        `,
      };

      // Send the email using the Redux mutation with a timeout
      const response = await Promise.race([
        createEmail(emailData).unwrap(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 10000)
        ),
      ]);

      toast.success("Message sent successfully!");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send email:", error);

      // Determine error message based on error type
      let errorMessage = "Failed to send message. Please try again later.";

      if (error.message === "Request timeout") {
        errorMessage =
          "Request timed out. Please check your internet connection and try again.";
      } else if (error.status === 500) {
        errorMessage =
          "There was a problem with our email service. Please try contacting us directly at rentacar@gmail.com";
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      className="md:py-16 px-6 md:px-20 flex justify-center items-center min-h-[70vh]"
    >
      <motion.div
        className="max-w-6xl w-full flex flex-col lg:flex-row justify-between items-center relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Background Text */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <h1 className="text-[5rem] sm:text-[10rem] lg:text-[13rem] xl:text-[19rem] text-black font-extrabold uppercase opacity-10">
            Contact
          </h1>
        </div>

        {/* Left & Middle Section */}
        <motion.div
          className="relative z-10 w-full lg:w-1/4 flex flex-row gap-2 lg:gap-16 xl:gap-36 justify-between items-center md:items-start mb-16 md:mb-0"
          variants={fadeIn}
        >
          {/* Logo */}
          <div className="bg-transparent md:mt-2 px-6 py-4 border border-graylight text-lg text-graylight font-semibold text-center">
            RENTACAR
          </div>

          {/* Contact Info */}
          <div className="text-graylight text-left ml-4 md:ml-0">
            <p>COLOMBO | SRI LANKA</p>
            <p className="my-2">+1234567890</p>
            <p>rentacar@gmail.com</p>

            {/* Social Icons */}
            <div className="flex justify-start mt-4 space-x-4 text-xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-lg md:text-xl cursor-pointer hover:text-graylight transition" />
              </a>
              <a
                href="https://messenger.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookMessenger className="text-lg md:text-xl cursor-pointer hover:text-graylight transition" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-lg md:text-xl cursor-pointer hover:text-graylight transition" />
              </a>
              <a href="mailto:rentacar@gmail.com">
                <FaEnvelope className="text-lg md:text-xl cursor-pointer hover:text-graylight transition" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Contact Form */}
        <motion.div
          className="relative md:mt-8 z-10 w-full lg:w-2/4 bg-transparent"
          variants={fadeIn}
        >
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="col-span-1 flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="p-3 bg-transparent text-graydark border border-graydark rounded-[2px] focus:outline-none focus:ring-1 focus:ring-gasolindark"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-3 bg-transparent text-graydark border border-graydark rounded-[2px] focus:outline-none focus:ring-1 focus:ring-gasolindark"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="p-3 bg-transparent text-graydark border border-graydark rounded-[2px] focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
            <div className="col-span-1 flex flex-col gap-4">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="p-3 bg-transparent text-graydark border border-graydark rounded-[2px] focus:outline-none focus:ring-1 focus:ring-gasolindark h-full"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gasolindark to-gasolinlight text-graylight font-semibold py-3 rounded-[2px] hover:opacity-90 transition text-lg disabled:opacity-70"
                disabled={isLoading || isSubmitting}
              >
                {isLoading || isSubmitting ? "SENDING..." : "SEND"}
              </button>
            </div>
          </form>

          {/* Alternative contact methods */}
          <div className="mt-6 text-center text-graydark text-sm">
            <p>Having trouble with the form? Contact us directly:</p>
            <p className="mt-2">
              <a
                href="mailto:rentacar@gmail.com"
                className="text-gasolindark hover:underline"
              >
                rentacar@gmail.com
              </a>
              {" or "}
              <a
                href="tel:+1234567890"
                className="text-gasolindark hover:underline"
              >
                +1234567890
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
