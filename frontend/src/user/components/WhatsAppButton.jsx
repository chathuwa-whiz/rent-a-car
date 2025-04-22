import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
        href="https://wa.me/YOUR_PHONE_NUMBER"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-gasolinlight text-white p-4 rounded-full shadow-lg flex items-center gap-2 text-lg hover:bg-gasolindark transition"
        style={{ zIndex: 9999 }}
        >
        <FaWhatsapp size={24} />
    </a>
  );
}
