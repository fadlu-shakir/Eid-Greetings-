import React from "react";
import { motion } from "framer-motion";

export default function EidImage() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
    >
      {/* Outer red glow ring (static for performance) */}
      <div
        className="absolute rounded-2xl pointer-events-none"
        style={{
          inset: -20,
          background:
            "radial-gradient(ellipse, rgba(192,57,43,0.18) 0%, transparent 70%)",
          filter: "blur(18px)",
          opacity: 0.7,
        }}
      />

      {/* Main card wrapper (static for performance) */}
      <div className="relative">
        {/* Bold red → cream → green vintage border */}
        <div
          className="p-[4px] rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, #c0392b, #f5f0d8, #3a7a50, #f5f0d8, #c0392b)",
          }}
        >
          {/* Dark green inner mat — like a vintage frame */}
          <div
            className="p-[6px] rounded-2xl"
            style={{ background: "#2d5a3d" }}
          >
            <div className="rounded-xl overflow-hidden">
              <img
                src="/eid_card.jpg"
                alt="Eid al-Adha Mubarak — festive retro poster"
                style={{
                  width: "min(480px, 86vw)",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>

        {/* Corner star sparkles — cream colored */}
        {[
          { top: -8, left: -8 },
          { top: -8, right: -8 },
          { bottom: -8, left: -8 },
          { bottom: -8, right: -8 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ ...pos }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z"
                fill="#f5f0d8"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
