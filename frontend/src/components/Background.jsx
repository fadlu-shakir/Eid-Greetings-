import React, { useMemo } from "react";
import { motion } from "framer-motion";

/* ── Scattered cream/red specks like vintage print grain ── */
function Stars({ count = 55 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const isRed = Math.random() > 0.75;
        const size = Math.random() * 8 + 6.0; // Larger stars (6px to 14px)
        return {
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size,
          colorChannels: isRed ? "224, 48, 32" : "245, 240, 216",
          baseOpacity: Math.random() * 0.45 + 0.45,
          duration: (Math.random() * 3.5 + 2.5).toFixed(2),
          delay: (Math.random() * 4).toFixed(2),
        };
      }),
    [count]
  );

  return (
    <>
      {stars.map((s) => (
        <span
          key={s.id}
          className="star-twinkle absolute rounded-full pointer-events-none"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            backgroundColor: `rgba(${s.colorChannels}, ${s.baseOpacity})`,
            boxShadow: `0 0 ${s.size * 2.0}px rgba(${s.colorChannels}, ${s.baseOpacity}), 0 0 ${s.size * 5.0}px rgba(${s.colorChannels}, ${s.baseOpacity * 0.7}), 0 0 ${s.size * 10.0}px rgba(${s.colorChannels}, ${s.baseOpacity * 0.3})`,
            "--duration": `${s.duration}s`,
            "--delay": `${s.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/* ── Tiny drifting particles ── */
function Particles({ count = 22 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const isRed = Math.random() > 0.5;
        return {
          id: i,
          left: `${Math.random() * 100}%`,
          bottom: `${Math.random() * 20}%`,
          size: Math.random() * 14 + 12.0, // Larger drift particles (12px to 26px)
          colorChannels: isRed ? "224, 48, 32" : "245, 240, 216",
          baseOpacity: Math.random() * 0.4 + 0.3,
          duration: (Math.random() * 10 + 10).toFixed(1), // Slower majestic drift
          delay: (Math.random() * 8).toFixed(1),
        };
      }),
    [count]
  );

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle-drift absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            backgroundColor: `rgba(${p.colorChannels}, ${p.baseOpacity})`,
            boxShadow: `0 0 ${p.size * 2.0}px rgba(${p.colorChannels}, ${p.baseOpacity}), 0 0 ${p.size * 5.0}px rgba(${p.colorChannels}, ${p.baseOpacity * 0.7}), 0 0 ${p.size * 10.0}px rgba(${p.colorChannels}, ${p.baseOpacity * 0.3})`,
            filter: "blur(1.5px)",
            "--p-dur": `${p.duration}s`,
            "--p-delay": `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/* ── Vintage paper texture noise overlay ── */
function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.06,
        mixBlendMode: "multiply",
      }}
    />
  );
}

/* ── Warm green glow orbs ── */
function GlowOrbs() {
  return (
    <>
      {/* Top beige linear fade */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "50vh",
          background:
            "linear-gradient(to bottom, rgba(245, 240, 216, 0.65) 0%, rgba(245, 240, 216, 0.2) 70%, transparent 100%)",
        }}
      />
      {/* Top center radial spotlight glow (beige) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1150px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(245, 240, 216, 0.45) 0%, rgba(245, 240, 216, 0.08) 60%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />
      {/* Central backing gold/red spotlight orb behind content */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "850px",
          height: "850px",
          background:
            "radial-gradient(circle, rgba(216, 180, 117, 0.18) 0%, rgba(192, 57, 43, 0.1) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Bottom red accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse at center, rgba(192,57,43,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </>
  );
}

/* ── Main background — deep hunter green with subtle vignette ── */
export default function Background() {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #2a5438 0%, #2d5a3d 35%, #234830 65%, #1e3d28 100%)",
      }}
    >
      {/* Animated inner gradient shift */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 25% 35%, rgba(58,122,80,0.25) 0%, transparent 55%)",
            "radial-gradient(ellipse at 75% 25%, rgba(58,122,80,0.25) 0%, transparent 55%)",
            "radial-gradient(ellipse at 50% 70%, rgba(58,122,80,0.25) 0%, transparent 55%)",
            "radial-gradient(ellipse at 25% 35%, rgba(58,122,80,0.25) 0%, transparent 55%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Calligraphy wallpaper pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/caligraphy.jpg")',
          backgroundSize: "500px",
          backgroundRepeat: "repeat",
          opacity: 0.4, // 40% visibility
          filter: "invert(1) contrast(1.15) brightness(0.95)",
          mixBlendMode: "screen",
        }}
      />

      {/* Dark vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(15, 30, 20, 0.55) 100%)",
        }}
      />

      <GlowOrbs />
      <Stars count={50} />
      <Particles count={18} />
      <GrainOverlay />
    </div>
  );
}
