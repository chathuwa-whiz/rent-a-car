import "@fortawesome/fontawesome-free/css/all.min.css";

export default function ContactPage() {
  return (
    <div className="bg-[#1c1c1c] text-white md:py-16 px-6 md:px-20 flex justify-center items-center min-h-[50vh]">
      <div className="max-w-6xl w-full flex flex-col md:flex-row justify-between items-center relative">

        {/* Background Text */}
        <div
          className="absolute inset-0 text-[6rem] md:text-[19.5rem] font-extrabold flex justify-center items-center opacity-10 pointer-events-none select-none"
        >
          CONTACT
        </div>
        
        {/* Left & Middle Section */}
        <div className="relative z-10 w-full md:w-1/4 flex flex-row gap-2 md:gap-36 justify-between items-center md:items-start mb-16 md:mb-0">
          
          {/* Logo */}
          <div className="bg-transparent px-6 py-4 border border-graylight text-lg text-graylight font-semibold text-center">
            RENTACAR
          </div>

          {/* Contact Info */}
          <div className="text-graylight text-left ml-4 md:ml-0">
            <p>COLOMBO | SRI LANKA</p>
            <p className="mt-2">+1234567890</p>
            <p>rentacar@gmail.com</p>

            {/* Social Icons */}
            <div className="flex justify-start mt-4 space-x-4 text-xl">
              <a href="#" className="text-graylight hover:text-graydark">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-graylight hover:text-graydark">
                <i className="fab fa-facebook-messenger"></i>
              </a>
              <a href="#" className="text-graylight hover:text-graydark">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#" className="text-graylight hover:text-graydark">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="relative z-10 w-full md:w-2/4 bg-transparent">
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
        </div>
      </div>
    </div>
  );
}
