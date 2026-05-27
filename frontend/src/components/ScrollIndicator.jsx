import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide the scroll indicator once the user scrolls down slightly
      if (window.scrollY > 40) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: [0, 8, 0], x: "-50%" }}
          exit={{ opacity: 0, y: 15 }}
          transition={{
            opacity: { duration: 0.3 },
            y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
          }}
          className="fixed bottom-8 left-1/2 pointer-events-none z-30 flex flex-col items-center gap-1 select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.78rem",
            color: "#f5f0d8",
            backgroundColor: "rgba(15, 30, 20, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(245, 240, 216, 0.2)",
            borderRadius: "30px",
            padding: "8px 22px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <span className="flex items-center gap-2">
            Scroll..!
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              style={{ transform: "rotate(90deg)" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
