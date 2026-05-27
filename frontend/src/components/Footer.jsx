import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="text-center pb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8, duration: 1 }}
    >
      <motion.p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
          color: "rgba(245, 240, 216, 0.45)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        Eid al-Adha Mubarak 2026 ✨
      </motion.p>
    </motion.footer>
  );
}
