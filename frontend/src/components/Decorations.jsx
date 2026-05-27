import React from "react";
import { motion } from "framer-motion";

/* ── Crescent moon — cream on green ── */
function CrescentDecor() {
  return (
    <motion.div
      className="absolute top-4 left-4 md:left-auto md:right-16 pointer-events-none"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        animate={{
          filter: [
            "drop-shadow(0 0 6px rgba(245,240,216,0.4))",
            "drop-shadow(0 0 18px rgba(245,240,216,0.7))",
            "drop-shadow(0 0 6px rgba(245,240,216,0.4))",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <svg width="50" height="50" viewBox="0 0 60 60" fill="none">
          <path
            d="M45 30 C45 42 35 52 23 52 C16 52 10 48 7 42 C12 44 18 44 24 42 C34 38 40 29 38 18 C36 12 32 8 27 6 C36 8 45 18 45 30Z"
            fill="#f5f0d8"
            opacity="0.88"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function Decorations() {
  return (
    <>
      <CrescentDecor />
    </>
  );
}
