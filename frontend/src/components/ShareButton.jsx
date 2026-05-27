import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EID_MESSAGE = `🌙 Eid al-Adha Mubarak! 🌙\n\nMay Allah accept your sacrifices, bless your family with happiness, peace, and prosperity, and fill your life with endless blessings.\n\nWishing you a joyful and blessed Eid al-Adha! ✨`;

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleWish = async () => {
    // Copy the Eid wish message to clipboard so they can paste it in the DM
    try {
      await navigator.clipboard.writeText(EID_MESSAGE);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (_) {}
    
    // Open the Instagram DM link
    window.open("https://ig.me/m/fadlu_shakir", "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.45, ease: "easeOut" }}
      className="flex flex-col items-center gap-4"
      style={{ marginTop: "24px" }}
    >
      <motion.button
        id="wish-on-instagram-btn"
        onClick={handleWish}
        className="relative cursor-pointer select-none"
        whileHover={{
          y: -4,
          scale: 1.03,
          backgroundColor: "rgba(245, 240, 216, 1)", // Solid Cream
          color: "#2d5a3d", // Deep Green text
          borderColor: "#f5f0d8",
          boxShadow: "0 12px 28px rgba(245, 240, 216, 0.2), 0 0 15px rgba(245, 240, 216, 0.1)",
        }}
        whileTap={{
          scale: 0.97,
          y: -1,
        }}
        initial={{
          y: 0,
          scale: 1,
          backgroundColor: "rgba(245, 240, 216, 0.08)", // Translucent Cream
          color: "#f5f0d8", // Cream text
          borderColor: "rgba(245, 240, 216, 0.35)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 24,
        }}
        style={{
          padding: "16px 48px",
          borderRadius: "50px", // Pill shape
          borderWidth: "2px",
          borderStyle: "solid",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(0.82rem, 2vw, 0.96rem)",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
        }}
      >
        {/* Shimmer sweep */}
        <motion.span
          className="absolute inset-0 pointer-events-none rounded-[50px]"
          initial={{ x: "-100%" }}
          whileHover={{ x: "150%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            width: "60%",
          }}
        />

        <span className="flex items-center gap-3 relative z-10">
          {/* Decorative left star */}
          <svg width="10" height="10" viewBox="0 0 18 18" fill="currentColor" style={{ opacity: 0.9 }}>
            <path d="M9 0 L10.5 7.5 L18 9 L10.5 10.5 L9 18 L7.5 10.5 L0 9 L7.5 7.5 Z" />
          </svg>

          {/* Instagram SVG icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          
          <span style={{ transform: "translateY(1px)" }}>Wish Me on Instagram</span>

          {/* Decorative right star */}
          <svg width="10" height="10" viewBox="0 0 18 18" fill="currentColor" style={{ opacity: 0.9 }}>
            <path d="M9 0 L10.5 7.5 L18 9 L10.5 10.5 L9 18 L7.5 10.5 L0 9 L7.5 7.5 Z" />
          </svg>
        </span>
      </motion.button>

      {/* Clipboard confirmation toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "#f5f0d8",
              backgroundColor: "rgba(245, 240, 216, 0.12)",
              backdropFilter: "blur(8px)",
              border: "1.5px solid rgba(245, 240, 216, 0.3)",
              borderRadius: "8px",
              padding: "8px 18px",
              marginTop: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              fontWeight: 600,
              letterSpacing: "0.03em",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "#d8b475" }}>★</span> Eid wish copied! Paste it in the DM to send.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
