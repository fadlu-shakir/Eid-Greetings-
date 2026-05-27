import React from "react";
import { motion } from "framer-motion";

/* ── Stagger container ── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function AnimatedHeading({ text, className, style }) {
  const words = text.split(" ");
  return (
    <motion.h1
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariant} className="inline-block mr-[0.3em]">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ── Retro decorative divider — red & cream ── */
function Divider() {
  return (
    <motion.div
      className="flex items-center gap-3 justify-center my-3"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay: 0.45, duration: 0.45, ease: "easeOut" }}
    >
      <div
        className="h-[2px] w-20"
        style={{ background: "linear-gradient(to right, transparent, #c0392b)" }}
      />
      {/* Vintage star */}
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <path d="M9 0 L10.5 7.5 L18 9 L10.5 10.5 L9 18 L7.5 10.5 L0 9 L7.5 7.5 Z" fill="#f5f0d8" />
      </svg>
      <div
        className="h-[2px] w-20"
        style={{ background: "linear-gradient(to left, transparent, #c0392b)" }}
      />
    </motion.div>
  );
}

/* ── Wish message ── */
const WISH_LINES = [
  "May Allah accept your sacrifices,",
  "bless your family with happiness, peace, and prosperity,",
  "and fill your life with endless blessings.",
  "Wishing you a joyful and blessed Eid al-Adha.",
];

const lineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
};

const lineVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function WishMessage() {
  return (
    <motion.p
      variants={lineContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="text-center leading-relaxed"
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 300,
        fontStyle: "italic",
        fontSize: "clamp(0.88rem, 2vw, 1.05rem)",
        color: "rgba(245, 240, 216, 0.82)",
        maxWidth: 540,
        letterSpacing: "0.02em",
      }}
    >
      {WISH_LINES.map((line, i) => (
        <motion.span key={i} variants={lineVariant} className="block">
          {line}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function GreetingText() {
  return (
    <div className="flex flex-col items-center w-full">
      <AnimatedHeading
        text="🌙 Eid al-Adha Mubarak"
        className="text-shimmer text-center"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.7rem, 5vw, 3.2rem)",
          letterSpacing: "0.06em",
          fontWeight: 700,
          lineHeight: 1.15,
          textTransform: "uppercase",
        }}
      />
      <Divider />
      <WishMessage />
    </div>
  );
}
