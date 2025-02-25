export default function Footer() {
  return (
    <div>
      <footer className="pt-22 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
          {/* Left Section */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-graylight font-bold text-lg">RENTACAR</h2>
            <p className="mt-2 text-graydark max-w-xs">
              Wherever you go, we make renting a car simple, fast, and affordable!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start">
            {/* Menu Section */}
            <div>
              <h3 className="text-graylight font-semibold">Menu</h3>
              <ul className="mt-2 text-graydark space-y-2">
                <li><a href="#" className="hover:text-graylight">Home</a></li>
                <li><a href="#" className="hover:text-graylight">Garage</a></li>
                <li><a href="#" className="hover:text-graylight">About</a></li>
                <li><a href="#" className="hover:text-graylight">Contact</a></li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-graylight font-semibold">Legal</h3>
              <ul className="mt-2 text-graydark space-y-2">
                <li><a href="#" className="hover:text-graylight">Terms of service</a></li>
                <li><a href="#" className="hover:text-graylight">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-graylight">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Separator */}
        <div className="mt-10 pb-6 md:pb-20 border-t border-graydark"></div>
      </footer>

      {/* Last Text */}
      <div className="text-[4.6rem] md:text-[18rem] font-extrabold leading-tight md:leading-50 flex justify-center items-center opacity-18 
      pointer-events-none select-none overflow-hidden" style={{ WebkitTextStroke: '2px #6E6969' }}>
        RENTACAR
      </div>
    </div>
  );
}
