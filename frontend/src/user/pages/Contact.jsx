import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCreateEmailMutation } from "../../redux/services/emailSlice";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function ContactPage() {

  const [createEmail] = useCreateEmailMutation();
  
  return (
    <div id="contact" className="md:py-16 px-6 md:px-20 flex justify-center items-center min-h-[70vh]">
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
              <FaFacebookF className="text-lg md:text-xl cursor-pointer hover:text-graylight transition" />
              <FaFacebookMessenger className="text-lg md:text-xl cursor-pointer hover:text-graylight transition" />
              <FaInstagram className="text-lg md:text-xl cursor-pointer hover:text-graylight transition" />
              <FaEnvelope className="text-lg md:text-xl cursor-pointer hover:text-graylight transition" />
            </div>
          </div>
        </motion.div>

        {/* Right Section - Contact Form */}
        <motion.div 
          className="relative md:mt-8 z-10 w-full lg:w-2/4 bg-transparent"
          variants={fadeIn}
        >
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="p-3 bg-transparent text-graydark border border-graydark rounded-[2px] focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-3 bg-transparent text-graydark border border-graydark rounded-[2px] focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="p-3 bg-transparent text-graydark border border-graydark rounded-[2px] focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
            <div className="col-span-1 flex flex-col gap-4">
              <textarea
                placeholder="Message"
                className="p-3 bg-transparent text-graydark border border-graydark rounded-[2px] focus:outline-none focus:ring-1 focus:ring-gasolindark h-full"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gasolindark to-gasolinlight text-graylight font-semibold py-3 rounded-[2px] hover:opacity-90 transition text-lg"
              >
                SEND
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
