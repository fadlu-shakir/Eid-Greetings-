import React from "react";
import { motion } from "framer-motion";

/* ── SVG Lantern — vintage red & cream tones ── */
function LanternSVG({ scale = 1, color = "#c0392b" }) {
  const id = `lg-${color.replace("#", "")}`;
  return (
    <svg
      width={50 * scale}
      height={80 * scale}
      viewBox="0 0 50 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="25" y1="0" x2="25" y2="10" stroke={color} strokeWidth="2" />
      <ellipse cx="25" cy="12" rx="10" ry="4" fill={color} opacity="0.9" />
      <path
        d="M15 14 Q8 35 12 54 Q18 62 25 62 Q32 62 38 54 Q42 35 35 14 Z"
        fill={`url(#${id})`}
        opacity="0.92"
      />
      <ellipse cx="25" cy="38" rx="9" ry="16" fill="rgba(245,240,216,0.2)" />
      <ellipse cx="25" cy="62" rx="9" ry="4" fill={color} opacity="0.9" />
      <line x1="25" y1="66" x2="22" y2="78" stroke={color} strokeWidth="1.5" />
      <line x1="25" y1="66" x2="28" y2="78" stroke={color} strokeWidth="1.5" />
      <circle cx="22" cy="78" r="2" fill={color} />
      <circle cx="28" cy="78" r="2" fill={color} />
      <line x1="15" y1="28" x2="35" y2="28" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="13" y1="40" x2="37" y2="40" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="15" y1="52" x2="35" y2="52" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={color}   stopOpacity="0.55" />
          <stop offset="30%"  stopColor="#f5f0d8" stopOpacity="0.95" />
          <stop offset="70%"  stopColor="#e8c060" stopOpacity="0.85" />
          <stop offset="100%" stopColor={color}   stopOpacity="0.5"  />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Crescent moon — cream on green ── */
function CrescentDecor() {
  return (
    <motion.div
      className="absolute top-4 right-6 pointer-events-none"
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
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
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

const LANTERNS = [
  { x: "7%",  delay: 0.1, scale: 0.9,  color: "#c0392b", swayDuration: 3.5 },
  { x: "20%", delay: 0.18, scale: 1.1,  color: "#a93226", swayDuration: 2.8 },
  { x: "72%", delay: 0.14, scale: 1.0,  color: "#c0392b", swayDuration: 3.2 },
  { x: "86%", delay: 0.22, scale: 0.85, color: "#922b21", swayDuration: 2.5 },
];

export default function Decorations() {
  return (
    <>
      <CrescentDecor />

      {LANTERNS.map((l, i) => (
        <motion.div
          key={i}
          className="absolute top-0 pointer-events-none"
          style={{ left: l.x }}
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: l.delay, duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: l.swayDuration, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top center" }}
          >
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 60 * l.scale,
                height: 30 * l.scale,
                background: `radial-gradient(ellipse, rgba(192,57,43,0.3) 0%, transparent 70%)`,
                filter: "blur(6px)",
              }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <LanternSVG scale={l.scale} color={l.color} />
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
