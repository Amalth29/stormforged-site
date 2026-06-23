import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function App() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [memories, setMemories] = useState([]);
  const [roster, setRoster] = useState([]);

  const pinnedMemories = memories.filter((memory) => memory.pinned);
  const galleryImages = pinnedMemories.map((memory) => memory.imageUrl);

  useEffect(() => {
    fetch("https://aqw-bot-production.up.railway.app/memories")
      .then((res) => res.json())
      .then((data) => {
        setMemories(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetch("https://aqw-bot-production.up.railway.app/guild-roster")
      .then((res) => res.json())
      .then((data) => {
        setRoster(Array.isArray(data) ? data : data.members || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const selectedImage =
    selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 0) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    let timeout;
    const handleScrollEnd = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (window.scrollY < 5) {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollEnd);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollEnd);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] pt-[88px] text-white">
      {/* Global Storm Layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="storm-lightning" />
      </div>

      <div className="storm-strikes">
        <img src="/images/lightning.png" className="lightning-bolt" alt="" />
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a33,transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.03]" />

      {/* Animated Blur Orbs */}
      <div className="glow-orb absolute left-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-3xl" />
      <div className="glow-orb absolute bottom-[-150px] right-[-100px] h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="glow-orb absolute left-1/2 top-[30%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Navbar */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#050816]/35 px-5 py-6 backdrop-blur-xl sm:px-8">
      <a
  href="/"
  className="font-ralmone text-2xl tracking-[0.28em] text-blue-400 transition hover:text-blue-300 hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.8)] sm:text-3xl"
>
  STORMFORGED
</a>

   <div className="hidden gap-6 font-ralmone text-sm tracking-[0.14em] text-gray-300 md:flex">
  <a href="/" className="transition hover:text-blue-400">Home</a>
  <a href="#features" className="transition hover:text-blue-400">Features</a>
  <a href="#roster" className="transition hover:text-blue-400">Roster</a>
  <a href="#gallery" className="transition hover:text-blue-400">Gallery</a>
  <a href="#alliances" className="transition hover:text-blue-400">Alliances</a>
  <a href="#join" className="transition hover:text-blue-400">Join Us</a>
</div>

        <div className="relative md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
          >
            Menu
          </button>

          {mobileMenuOpen && (
  <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-[#070b1a] p-3 font-ralmone tracking-[0.12em] shadow-2xl">
    {[
      ["Home", "/"],
      ["Features", "#features"],
      ["Roster", "#roster"],
      ["Gallery", "#gallery"],
      ["Alliances", "#alliances"],
      ["Join Us", "#join"],
    ].map(([label, href]) => (
      <a
        key={label}
        href={href}
        onClick={() => setMobileMenuOpen(false)}
        className="block rounded-xl px-4 py-3 text-white transition hover:bg-white/10 hover:text-blue-400"
      >
        {label}
      </a>
    ))}
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
  className="relative z-10 h-[calc(100vh-88px)] overflow-hidden"
>
  <div className="section-storm-glow" />

  <picture>
    <source media="(max-width: 640px)" srcSet="/images/banner-mobile.png" />
    <source media="(max-width: 1024px)" srcSet="/images/banner-tablet.png" />

    <img
      src="/images/banner-desktop.png"
      alt="Stormforged Banner"
      className="absolute inset-0 h-full w-full object-cover brightness-110"
    />
  </picture>

  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816]/20" />
</motion.section>

      {/* FEATURES SECTION */}
      <motion.section
        id="features"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 px-4 pt-10 pb-20 sm:px-6 lg:pb-24"
      >
        <div className="section-storm-glow" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center sm:mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
              Why Stormforged
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              Built for AQW Players
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              More than just a guild — Stormforged is a long-term community
              focused on progression, teamwork, and creating memories together.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-3xl">
                ⚔️
              </div>

              <h3 className="text-2xl font-bold">Ultra Boss Runs</h3>

              <p className="mt-4 leading-relaxed text-gray-400">
                Weekly ultra clears, coordinated farming sessions, and endgame
                progression with experienced players.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-3xl">
                🛡️
              </div>

              <h3 className="text-2xl font-bold">Friendly Community</h3>

              <p className="mt-4 leading-relaxed text-gray-400">
                Whether you're a veteran or returning player, Stormforged is
                built around helping each other grow.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-3xl">
                🌩️
              </div>

              <h3 className="text-2xl font-bold">Active Guild</h3>

              <p className="mt-4 leading-relaxed text-gray-400">
                Daily activity, guild coordination, giveaways, events, and a
                constantly evolving AQW community.
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
        className="relative z-10 px-4 py-20 sm:px-6 lg:py-24"
      >
        <div className="section-storm-glow" />

        <div className="mx-auto max-w-7xl">
          <div className="relative mb-12 sm:mb-14">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
                Guild Roster
              </p>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Active Members
              </h2>

              <p className="mt-4 text-base text-gray-400 sm:text-lg">
                A preview of Stormforged members.
              </p>
            </div>

            <a
              href="/roster"
              className="absolute right-0 top-16 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#0c132b]/80 px-7 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-blue-500/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] lg:inline-flex"
            >
              👥 View Full Roster
              <span className="text-blue-400">→</span>
            </a>

            <div className="mt-6 flex justify-center lg:hidden">
              <a
                href="/roster"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0c132b]/80 px-6 py-3 text-base font-bold text-white backdrop-blur-md transition hover:border-blue-400/60 hover:bg-blue-500/10"
              >
                👥 View Full Roster
                <span className="text-blue-400">→</span>
              </a>
            </div>
          </div>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl sm:rounded-[32px]">
            <div className="grid grid-cols-[1.6fr_0.9fr_0.5fr] border-b border-white/10 px-5 py-5 text-xs uppercase tracking-widest text-gray-400 sm:grid-cols-[2fr_1fr_0.5fr] sm:px-8 sm:text-sm">
              <div>Name</div>
              <div>Rank</div>
              <div>Level</div>
            </div>

            {(Array.isArray(roster) ? roster : []).slice(0, 5).map((member, index) => (
              <div
                key={index}
                className="grid grid-cols-[1.6fr_0.9fr_0.5fr] border-b border-white/5 px-5 py-5 text-sm transition hover:bg-white/5 sm:grid-cols-[2fr_1fr_0.5fr] sm:px-8 sm:text-base"
              >
                <a
                  href={`https://account.aq.com/CharPage?id=${encodeURIComponent(
                    member.name
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block min-w-0 truncate pr-4 font-semibold transition hover:text-blue-400"
                >
                  {member.name}
                </a>

                <div className="truncate text-blue-400">{member.rank}</div>

                <div className="text-gray-300">{member.level}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* GALLERY SECTION */}
      <motion.section
        id="gallery"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 flex min-h-[calc(100vh-88px)] items-center px-4 py-16 sm:px-6 lg:py-20"
      >
        <div className="section-storm-glow" />

        <div className="mx-auto w-full max-w-7xl">
          <div className="relative mb-10">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
                Hall of Memories
              </p>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Stormforged Moments
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400 sm:text-lg">
                A growing collection of guild memories, clears, drops, and
                events.
              </p>
            </div>

            <a
              href="/memories"
              className="absolute right-0 top-16 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#0c132b]/80 px-7 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-[55%] hover:border-blue-400/60 hover:bg-blue-500/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] lg:inline-flex"
            >
              📸 View All Memories
              <span className="text-blue-400">→</span>
            </a>

            <div className="mt-6 flex justify-center lg:hidden">
              <a
                href="/memories"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0c132b]/80 px-6 py-3 text-base font-bold text-white backdrop-blur-md transition hover:border-blue-400/60 hover:bg-blue-500/10"
              >
                📸 View All Memories
                <span className="text-blue-400">→</span>
              </a>
            </div>
          </div>

          <div className="gallery-scroll flex gap-4 overflow-x-auto pb-3 scroll-smooth sm:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="min-w-[85vw] flex-shrink-0 sm:min-w-[500px]"
              >
                <img
                  src={image}
                  alt={`Stormforged memory ${index + 1}`}
                  onClick={() => setSelectedImageIndex(index)}
                  className="h-[220px] w-full cursor-pointer rounded-3xl border border-white/10 object-cover shadow-lg shadow-black/40 transition hover:scale-[1.02] hover:border-blue-400/50 sm:h-[320px]"
                />
              </div>
            ))}
          </div>

          {selectedImage && (
            <div
              onClick={() => setSelectedImageIndex(null)}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 sm:p-6"
            >
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute right-4 top-4 rounded-xl bg-white/10 px-4 py-2 text-white hover:bg-white/20 sm:right-6 sm:top-6"
              >
                ✕
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-3xl text-white hover:bg-white/20 sm:left-6 sm:px-5 sm:py-4"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-3xl text-white hover:bg-white/20 sm:right-6 sm:px-5 sm:py-4"
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

      {/* ALLIANCES SECTION */}
      <motion.section
  id="alliances"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative z-10 px-4 pt-10 pb-16 sm:px-6 lg:pt-12 lg:pb-20"
>
        <div className="section-storm-glow" />

        <div className="mx-auto w-full max-w-7xl text-center">
          <h2 className="mt-4 font-serif text-4xl font-black tracking-[0.08em] text-white sm:text-5xl lg:text-6xl lg:tracking-[0.18em]">
            OUR ALLIANCES
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Guilds and communities standing alongside{" "}
            <span className="text-blue-400">Stormforged</span>.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "RAVENS",
                image: "/images/ravens.png",
                url: "https://ravensaqw.lol",
                colors: {
                  primary: "#ff1a1a",
                  secondary: "#ff3e4c",
                },
                desc: "SHADOW & CUNNING",
              },
              {
                name: "SOLARIS",
                image: "/images/solaris.png",
                url: "https://solarisaqw.lol",
                colors: {
                  primary: "#ffae00",
                  secondary: "#f3dba8",
                },
                desc: "FIRE & GLORY",
              },
              {
                name: "VANAHEIM",
                image: "/images/vanaheim.png",
                url: "https://vanaheim.app",
                colors: {
                  primary: "#d44969",
                  secondary: "#ffbf00",
                },
                desc: "NATURE & HONOUR",
              },
            ].map((alliance) => (
              <a
                key={alliance.name}
                href={alliance.url}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[28px] border bg-black/40 p-3 backdrop-blur-xl transition duration-500 hover:-translate-y-3 sm:rounded-[32px] sm:p-4"
                style={{
                  borderColor: `${alliance.colors.primary}55`,
                  boxShadow: `0 0 0 rgba(0,0,0,0)`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(
                      135deg,
                      ${alliance.colors.primary}15,
                      ${alliance.colors.secondary}10
                    )`,
                  }}
                />

                <div
                  className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border"
                  style={{
                    borderColor: alliance.colors.secondary,
                    background: alliance.colors.primary,
                  }}
                />

                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={alliance.image}
                    alt={alliance.name}
                    className="h-52 w-full object-cover transition duration-700 group-hover:scale-110 sm:h-60 lg:h-64"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>

                <div className="relative px-4 py-5 sm:px-5 sm:py-6">
                  <h3
                    className="font-serif text-3xl font-black sm:text-4xl"
                    style={{
                      color: alliance.colors.secondary,
                      textShadow: `0 0 20px ${alliance.colors.primary}55`,
                    }}
                  >
                    {alliance.name}
                  </h3>

                  <div
                    className="mx-auto mt-3 h-px w-20"
                    style={{
                      background: `linear-gradient(
                        90deg,
                        ${alliance.colors.primary},
                        ${alliance.colors.secondary}
                      )`,
                    }}
                  />

                  <p className="mx-auto mt-5 max-w-xs text-sm leading-6 text-gray-300">
                    {alliance.desc}
                  </p>

                  <div className="mt-7 flex justify-center">
                    <div
                      className="px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 group-hover:scale-105 sm:px-8 sm:text-sm sm:tracking-[0.2em]"
                      style={{
                        color: alliance.colors.secondary,
                        border: `1px solid ${alliance.colors.primary}`,
                        background: `linear-gradient(
                          90deg,
                          ${alliance.colors.primary}20,
                          ${alliance.colors.secondary}20
                        )`,
                        clipPath:
                          "polygon(8% 0%,92% 0%,100% 50%,92% 100%,8% 100%,0% 50%)",
                        boxShadow: `0 0 25px ${alliance.colors.primary}30`,
                      }}
                    >
                      Visit Guild
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* JOIN SECTION */}
      <section id="join" className="relative z-10 px-4 py-20 sm:px-6 lg:py-28">
        <div className="section-storm-glow" />

        <div className="mx-auto max-w-5xl rounded-[32px] border border-blue-400/20 bg-blue-500/10 p-6 text-center backdrop-blur-2xl sm:p-12 lg:rounded-[40px]">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
            Join the Forge
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
            Ready to become Stormforged?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
            Join our Discord, verify your AQW account, and become part of a
            guild built on teamwork, progress, and community.
          </p>

          <a
            href="https://discord.gg/KmPjAjtTCB"
            target="_blank"
            rel="noreferrer"
            className="mt-12 inline-block rounded-xl bg-blue-500 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-105 hover:bg-blue-400 sm:mt-14 sm:px-10"
          >
            Join Discord
          </a>

          <footer className="relative z-10 mt-12 border-t border-white/10 px-4 py-10 text-center text-sm text-gray-500 sm:px-6">
            <div className="mb-4 flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="/" className="hover:text-blue-400">
                Home
              </a>
              <a href="#features" className="hover:text-blue-400">
                Features
              </a>
              <a href="#roster" className="hover:text-blue-400">
                Roster
              </a>
              <a href="#gallery" className="hover:text-blue-400">
                Gallery
              </a>
              <a href="#alliances" className="hover:text-blue-400">
                Alliances
              </a>
              <a href="#join" className="transition hover:text-blue-400">
                Join Us
              </a>
            </div>

            <p>© 2026 Stormforged. Forged in STORM. United as LEGENDS.</p>
          </footer>
        </div>
      </section>
    </div>
  );
}
