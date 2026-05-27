import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = "https://eid-backend-6514.onrender.com/";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeImage, setActiveImage] = useState(null); // Lightbox state

  // Fetch images from Django API on mount
  const fetchImages = async () => {
    try {
      const response = await fetch(`${API}api/images/`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (err) {
      console.error("Failed to fetch gallery images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle password submission to unlock admin controls (deletion)
  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (password === "3496") {
      setIsAdmin(true);
      setErrorMessage("");
      setShowAdminInput(false);
      setPassword("");
    } else {
      setErrorMessage("Incorrect access code.");
      setPassword("");
    }
  };

  // Handle Image Upload (Public Endpoint)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API}api/images/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await fetchImages();
      } else {
        const errData = await response.json();
        setErrorMessage(errData.error || "Failed to upload image.");
      }
    } catch (err) {
      setErrorMessage("Network error, upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Handle Image Delete (Admin-only Endpoint)
  const handleImageDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this memory?")) return;

    try {
      const response = await fetch(`${API}api/images/${id}/?password=3496`, {
        method: "DELETE",
      });

      if (response.ok) {
        setImages(images.filter((img) => img.id !== id));
      } else {
        alert("Failed to delete memory.");
      }
    } catch (err) {
      alert("Network error, delete failed.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto px-4 mt-16 mb-12 flex flex-col items-center"
    >
      
      {/* Discrete Floating Admin Lock Button (Top-Right of screen) */}
      <div className="fixed top-5 right-5 z-40 flex flex-col items-end">
        <motion.button
          onClick={() => {
            if (isAdmin) {
              setIsAdmin(false); // Log out instantly
            } else {
              setShowAdminInput(!showAdminInput);
            }
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-full cursor-pointer border border-[#f5f0d8]/15 bg-[#0f1e14]/80 text-[#f5f0d8] shadow-lg backdrop-blur-md transition-colors"
          style={{
            borderColor: isAdmin ? "#c0392b" : "rgba(245, 240, 216, 0.2)",
            color: isAdmin ? "#c0392b" : "#f5f0d8",
          }}
          title={isAdmin ? "Exit Admin Mode" : "Admin Mode"}
        >
          {isAdmin ? (
            /* Open Lock / Shield (Active Admin) */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          ) : (
            /* Closed Lock */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
        </motion.button>

        {/* Dropdown Password Form */}
        <AnimatePresence>
          {showAdminInput && !isAdmin && (
            <motion.form
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              onSubmit={handleVerifyPassword}
              className="mt-3 p-4 rounded-xl border border-[#f5f0d8]/15 bg-[#0f1e14]/95 shadow-2xl flex flex-col gap-3 w-64 backdrop-blur-md"
            >
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#f5f0d8]/60">
                🔒 Admin Deletion Mode
              </span>
              <input
                type="password"
                placeholder="Enter Access Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg bg-black/25 border border-[#f5f0d8]/15 text-[#f5f0d8] focus:outline-none focus:border-[#f5f0d8]/50"
                autoFocus
              />
              <button
                type="submit"
                className="py-1.5 rounded-lg text-xs font-semibold text-[#2d5a3d] bg-[#f5f0d8] hover:bg-[#e8ddb5] cursor-pointer transition-colors"
              >
                Unlock Delete
              </button>
              {errorMessage && (
                <span className="text-[10px] text-[#c0392b] font-medium text-center">
                  ⚠ {errorMessage}
                </span>
              )}
            </motion.form>
          )}
        </AnimatePresence>

        {/* Admin mode active notification badge */}
        <AnimatePresence>
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mt-2 px-3 py-1 bg-[#c0392b]/15 border border-[#c0392b]/40 rounded-lg text-[9px] font-bold text-[#c0392b] uppercase tracking-wider select-none shadow-sm"
            >
              Delete Enabled
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gallery Header */}
      <div className="flex flex-col items-center mb-8">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--cream)",
            fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Gallery
        </h2>
        {/* Underline divider */}
        <div
          className="h-[1.5px] w-24 mt-2"
          style={{ background: "linear-gradient(to right, transparent, var(--cream), transparent)" }}
        />
      </div>

      {/* Gallery Loading state */}
      {loading ? (
        <p className="text-center font-light italic" style={{ color: "rgba(245,240,216,0.6)" }}>
          Loading memories...
        </p>
      ) : images.length === 0 ? (
        <p className="text-center font-light italic mb-8" style={{ color: "rgba(245,240,216,0.6)" }}>
          No memories shared yet. Be the first to upload one!
        </p>
      ) : (
        /* Image Grid */
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full"
          layout
        >
          <AnimatePresence mode="popLayout">
            {images.map((img) => (
              <motion.div
                key={img.id}
                layoutId={`img-container-${img.id}`}
                className="relative group rounded-xl overflow-hidden cursor-pointer p-[3px]"
                style={{
                  background: "linear-gradient(135deg, rgba(245,240,216,0.1), rgba(245,240,216,0.25))",
                  border: "1px solid rgba(245,240,216,0.15)",
                }}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                {/* Image element */}
                <div 
                  className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#1e3d28]"
                  onClick={() => setActiveImage(img)}
                >
                  <img
                    src={img.url}
                    alt="Shared Eid memory"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Admin delete button */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageDelete(img.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-[#c0392b] hover:bg-[#e03020] text-[#f5f0d8] rounded-full shadow-lg border border-[#f5f0d8]/30 transition-colors"
                    title="Delete memory"
                    style={{ cursor: "pointer" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0f1e14]/95 backdrop-blur-md"
              onClick={() => setActiveImage(null)}
            />

            {/* Content Container */}
            <motion.div
              layoutId={`img-container-${activeImage.id}`}
              className="relative max-w-4xl max-h-[85dvh] z-10 p-2 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #c0392b, #f5f0d8, #3a7a50, #f5f0d8, #c0392b)",
              }}
            >
              <div className="bg-[#2d5a3d] p-2 rounded-xl">
                <img
                  src={activeImage.url}
                  alt="Expanded Shared Memory"
                  className="rounded-lg max-w-full max-h-[75dvh] object-contain"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-5 right-5 p-2.5 bg-[#c0392b] text-[#f5f0d8] rounded-full border-2 border-[#f5f0d8] hover:bg-[#e03020] transition-colors"
                style={{ cursor: "pointer" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Public Uploader Section */}
      <div className="mt-12 flex flex-col items-center w-full max-w-md">
        <div
          className="flex flex-col items-center w-full p-6 border border-[#f5f0d8]/15 rounded-2xl bg-black/10 shadow-lg"
          style={{ backdropFilter: "blur(4px)" }}
        >
          <span 
            className="font-extrabold uppercase tracking-widest mb-5 text-center"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
              lineHeight: 1.3,
              background: "linear-gradient(135deg, #ffd6a7 0%, #f5f0d8 50%, #ffd6a7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "var(--font-display)",
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))",
              textShadow: "0 0 8px rgba(245, 240, 216, 0.35)",
              letterSpacing: "0.18em",
            }}
          >
            ✨ Add your Eid moments here... ✨
          </span>

          {/* Custom file uploader button */}
          <label className="relative flex flex-col items-center justify-center w-full py-6 bg-[#f5f0d8]/5 hover:bg-[#f5f0d8]/10 rounded-xl cursor-pointer border border-[#f5f0d8]/15 transition-all duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f0d8]/70 mb-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            <span className="text-sm font-medium text-[#f5f0d8]">
              {uploading ? "Uploading..." : "Upload Photo"}
            </span>
            <span className="text-xs text-[#f5f0d8]/50 mt-1">JPEG, PNG, WEBP (No size limit)</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>

          {/* Error notifications */}
          {errorMessage && (
            <p className="text-xs text-[#c0392b] font-medium mt-3 text-center">
              ⚠ {errorMessage}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
