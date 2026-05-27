import React from "react";
import Background from "../components/Background";
import Decorations from "../components/Decorations";
import EidImage from "../components/EidImage";
import GreetingText from "../components/GreetingText";
import ShareButton from "../components/ShareButton";
import Gallery from "../components/Gallery";
import ScrollIndicator from "../components/ScrollIndicator";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div
      className="relative w-full flex flex-col"
      style={{ minHeight: "100svh" }}
    >
      {/* Animated background layer — fixed so it never shifts content */}
      <Background />

      {/* Scroll indicator - prompts user to scroll down, fades out on scroll */}
      <ScrollIndicator />

      {/* Decorative lanterns, moon, etc. — absolute, above background */}
      <Decorations />

      {/* Main content — grows to fill viewport, centers children */}
      <main
        className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4"
        style={{ gap: "clamp(16px, 3vh, 28px)", paddingTop: "clamp(48px, 6vh, 90px)", paddingBottom: "16px" }}
      >
        {/* Eid themed image */}
        <EidImage />

        {/* Greeting heading + wish message */}
        <GreetingText />

        {/* Instagram wish button */}
        <ShareButton />

        {/* Dynamic Image Gallery */}
        <Gallery />
      </main>

      {/* Footer — always at the bottom */}
      <footer className="relative z-10 w-full text-center py-3">
        <Footer />
      </footer>
    </div>
  );
}
