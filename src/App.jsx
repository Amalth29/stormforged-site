import { motion } from "framer-motion";
import { useState,useRef,useEffect } from "react";
import roster from "./data/roster.json";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const galleryImages = [
    "/images/gold1.png",
    "/images/goldset.png",
    "/images/newyear.png",
    "/images/nulgath.png",
    "/images/valentines.png",
];

const selectedImage =
  selectedImageIndex !== null
    ? galleryImages[selectedImageIndex]
    : null;

const nextImage = () => {
  setSelectedImageIndex((prev) =>
    prev === galleryImages.length - 1
      ? 0
      : prev + 1
  );
};

const prevImage = () => {
  setSelectedImageIndex((prev) =>
    prev === 0
      ? galleryImages.length - 1
      : prev - 1
  );
};
useEffect(() => {
  const handleKeyDown = (e) => {

    if (e.key === "Escape") {
      setSelectedImageIndex(null);
    }

    if (e.key === "ArrowRight" && selectedImage) {
      nextImage();
    }

    if (e.key === "ArrowLeft" && selectedImage) {
      prevImage();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [selectedImage]);
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a33,transparent_60%)]"></div>
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      {/* Animated Blur Orbs */}
      <div className="absolute glow-orb top-[-100px] left-[-100px] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="absolute glow-orb bottom-[-150px] right-[-100px] h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-3xl"></div>
      <div className="absolute glow-orb top-[30%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"></div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#050816]/70 backdrop-blur-md">

        <h1 className="text-2xl font-bold tracking-wide text-blue-400 sm:text-3xl">
          STORMFORGED
        </h1>

        <div className="hidden gap-6 text-sm text-gray-300 md:flex">
          <a href="#home" className="hover:text-blue-400 transition">Home</a>
          <a href="/roster" className="hover:text-blue-400 transition">Roster</a>
          <a href="#features" className="hover:text-blue-400 transition">Features</a>
          <a href="#gallery" className="hover:text-blue-400 transition">Gallery</a>
</div>

<div className="relative md:hidden">
  <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
  >
    Menu
  </button>

  {mobileMenuOpen && (
    <div className="absolute right-0 mt-3 w-44 rounded-2xl border border-white/10 bg-[#070b1a] p-3 shadow-2xl">
      <a href="#home" className="block rounded-xl px-4 py-3 text-white hover:bg-white/10">Home</a>
      <a href="/roster" className="block rounded-xl px-4 py-3 text-white hover:bg-white/10">Roster</a>
      <a href="#features" className="block rounded-xl px-4 py-3 text-white hover:bg-white/10">Features</a>
      <a href="#gallery" className="block rounded-xl px-4 py-3 text-white hover:bg-white/10">Gallery</a>
    </div>
  )}
</div>
      </nav>

      {/* Hero Section */}
   <motion.section
  id="home"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="relative z-10 mt-20 pt-2 h-[85vh] min-h-[600px] overflow-hidden"
>
  <img
    src="/images/actual banner.png"
    alt="Stormforged Banner"
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-black/40"></div>

  
</motion.section>
<div className="relative z-10 flex justify-center bg-[#050816] px-6 py-8">
  <div className="flex flex-col gap-4 sm:flex-row">
    <a
      href="https://discord.gg/KmPjAjtTCB"
      target="_blank"
      rel="noreferrer"
      className="rounded-xl bg-blue-500 px-9 py-4 text-center text-base font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-105 hover:bg-blue-400"
    >
      Join Discord
    </a>

    <a
      href="/roster"
      className="rounded-xl border border-white/20 bg-black/50 px-9 py-4 text-center text-base font-bold text-white backdrop-blur-md transition hover:border-blue-400 hover:bg-blue-500/10"
    >
      Roster
    </a>
  </div>
</div>
{/* FEATURES SECTION */}

<motion.section
  id="features"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative z-10 px-6 py-24"
>

  <div className="mx-auto max-w-7xl">

    <div className="mb-16 text-center">

      <p className="text-blue-400 uppercase tracking-[0.3em] text-sm">
        Why Stormforged
      </p>

      <h2 className="mt-4 text-5xl font-black">
        Built for AQW Players
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
        More than just a guild — Stormforged is a long-term community
        focused on progression, teamwork, and creating memories together.
      </p>

    </div>

    <div className="grid gap-6 md:grid-cols-3">

      {/* CARD 1 */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10">

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-3xl">
          ⚔️
        </div>

        <h3 className="text-2xl font-bold">
          Ultra Boss Runs
        </h3>

        <p className="mt-4 text-gray-400 leading-relaxed">
          Weekly ultra clears, coordinated farming sessions,
          and endgame progression with experienced players.
        </p>

      </div>

      {/* CARD 2 */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10">

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-3xl">
          🛡️
        </div>

        <h3 className="text-2xl font-bold">
          Friendly Community
        </h3>

        <p className="mt-4 text-gray-400 leading-relaxed">
          Whether you're a veteran or returning player,
          Stormforged is built around helping each other grow.
        </p>

      </div>

      {/* CARD 3 */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10">

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-3xl">
          🌩️
        </div>

        <h3 className="text-2xl font-bold">
          Active Guild
        </h3>

        <p className="mt-4 text-gray-400 leading-relaxed">
          Daily activity, guild coordination, giveaways,
          events, and a constantly evolving AQW community.
        </p>

      </div>

    </div>

  </div>

</motion.section>
{/* ROSTER PREVIEW */}

<motion.section
   id="roster"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative z-10 px-6 py-24"
>

  <div className="mx-auto max-w-7xl">

    <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">

      <div>

        <p className="text-blue-400 uppercase tracking-[0.3em] text-sm">
          Guild Roster
        </p>

        <h2 className="mt-4 text-5xl font-black">
          Active Members
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          A preview of Stormforged members synced directly from the guild roster system.
        </p>

      </div>

      <a
  href="/roster"
  className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-md transition hover:border-blue-400 hover:bg-blue-500/10"
>
  View Full Roster
</a>

    </div>

    {/* TABLE */}

    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl">

      {/* HEADER */}

      <div className="grid grid-cols-[1.4fr_1fr_0.6fr] border-b border-white/10 px-8 py-5 text-sm uppercase tracking-widest text-gray-400">

        <div>Name</div>
        <div>Rank</div>
        <div>Level</div>

      </div>

      {/* MEMBERS */}

      {roster.slice(0, 5).map((member, index) => (

  <div
    key={index}
    className="grid grid-cols-[1.6fr_0.9fr_0.5fr] border-b border-white/5 px-4 py-5 text-sm transition hover:bg-white/5 sm:px-8 sm:text-base"
  >

    <a
  href={`https://account.aq.com/CharPage?id=${encodeURIComponent(member.name)}`}
  target="_blank"
  rel="noreferrer"
  className="block truncate pr-3 font-semibold transition hover:text-blue-400"
>
  {member.name}
</a>

    <div className="text-blue-400">
      {member.rank}
    </div>

    <div className="text-gray-300">
      {member.level}
    </div>

  </div>

))}

    </div>

  </div>

</motion.section>
{/* GALLERY SECTION */}

{/* GALLERY SECTION */}

<motion.section
  id="gallery"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative z-10 px-6 py-24"
>
  <div className="mx-auto max-w-7xl">

    <div className="mb-16 text-center">
      <p className="text-blue-400 uppercase tracking-[0.3em] text-sm">
        Hall of Memories
      </p>

      <h2 className="mt-4 text-5xl font-black">
        Stormforged Moments
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
        A growing collection of guild memories, clears, drops, and events.
      </p>
    </div>

    <div className="gallery-scroll flex gap-6 overflow-x-auto pb-3 scroll-smooth">

  {galleryImages.map((image, index) => (

    <div
      key={index}
      className="min-w-[500px] flex-shrink-0"
    >

      <img
        src={image}
        alt={`Stormforged memory ${index + 1}`}
        onClick={() => setSelectedImageIndex(index)}
        className="h-[320px] w-full cursor-pointer rounded-3xl border border-white/10 object-cover shadow-lg shadow-black/40 transition hover:scale-[1.02] hover:border-blue-400/50"
      />

    </div>

  ))}

</div>
{selectedImage && (
  <div
  onClick={() => setSelectedImageIndex(null)}
  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-6"
>
    <button
      onClick={() => setSelectedImageIndex(null)}
      className="absolute right-6 top-6 rounded-xl bg-white/10 px-4 py-2 text-white hover:bg-white/20"
    >
      ✕
    </button>

    <button
  onClick={(e) => {
    e.stopPropagation();
    prevImage();
  }}
  className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-5 py-4 text-3xl text-white hover:bg-white/20"
>
  ‹
</button>

    <img
      src={selectedImage}
      alt="Preview"
      onClick={(e) => e.stopPropagation()}
      className="max-h-[82vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl shadow-black"
    />

    <button
  onClick={(e) => {
    e.stopPropagation();
    nextImage();
  }}
  className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-5 py-4 text-3xl text-white hover:bg-white/20"
>
  ›
</button>

    <div className="absolute bottom-6 rounded-full bg-white/10 px-5 py-2 text-sm text-gray-300">
      {selectedImageIndex + 1} / {galleryImages.length}
    </div>
  </div>
)}
  </div>
</motion.section>
{/* JOIN SECTION */}

<section className="relative z-10 px-6 py-28">

  <div className="mx-auto max-w-5xl rounded-[40px] border border-blue-400/20 bg-blue-500/10 p-12 text-center backdrop-blur-2xl">

    <p className="text-blue-400 uppercase tracking-[0.3em] text-sm">
      Join the Forge
    </p>

    <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
      Ready to become Stormforged?
    </h2>

    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
      Join our Discord, verify your AQW account, and become part of a guild built on teamwork, progress, and community.
    </p>

    <a
  href="https://discord.gg/KmPjAjtTCB"
  target="_blank"
  rel="noreferrer"
  className="mt-14 inline-block rounded-xl bg-blue-500 px-10 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-105 hover:bg-blue-400"
>
  Join Discord
</a>

<footer className="relative z-10 border-t border-white/10 px-6 py-10 text-center text-sm text-gray-500">
  <div className="mb-4 flex justify-center gap-6">
    <a href="#home" className="hover:text-blue-400">Home</a>
    <a href="#roster" className="hover:text-blue-400">Roster</a>
    <a href="#features" className="hover:text-blue-400">Features</a>
    <a href="#gallery" className="hover:text-blue-400">Gallery</a>
  </div>

  <p>© 2026 Stormforged. Forged in STORM. United as LEGENDS.</p>
</footer>
  </div>

</section>
    </div>
  );
}