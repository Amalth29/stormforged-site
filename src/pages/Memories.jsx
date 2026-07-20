import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Memories() {
  const [memories, setMemories] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetch("https://aqw-bot-production.up.railway.app/memories")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMemories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const categories = [
    ["all", "All"],
    ["guild-events", "Guild Events"],
    ["boss-events", "Boss Clears"],
    ["alliance-pictorials", "Alliance Pictorials"],
    ["general", "General"],
  ];

  const filteredMemories =
    category === "all"
      ? memories
      : memories.filter((memory) => memory.category === category);

  const selectedMemory =
    selectedIndex !== null ? filteredMemories[selectedIndex] : null;

  const nextMemory = () => {
    setSelectedIndex((prev) =>
      prev === filteredMemories.length - 1 ? 0 : prev + 1
    );
  };

  const prevMemory = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? filteredMemories.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
      }

      if (e.key === "ArrowRight" && selectedMemory) {
        nextMemory();
      }

      if (e.key === "ArrowLeft" && selectedMemory) {
        prevMemory();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMemory]);

  useEffect(() => {
    document.body.style.overflow = selectedMemory ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMemory]);

  if (loading) {
    return (
      <div
        role="status"
        className="flex min-h-screen items-center justify-center bg-storm text-white"
      >
        Loading memories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-storm px-6 text-center text-white">
        <p className="text-lg font-semibold">Couldn't load memories right now.</p>
        <p className="text-gray-400">The guild API might be temporarily down. Try refreshing.</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-blue-400 hover:bg-blue-500/10"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-storm px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-blue-400 hover:bg-blue-500/10"
        >
          ← Back Home
        </Link>

        <div className="mt-12">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
            Guild Archive
          </p>

          <h1 className="mt-4 text-5xl font-black sm:text-6xl">
            Stormforged Memories
          </h1>

          <p className="mt-4 max-w-2xl text-gray-400">
            Browse guild events, boss clears, alliance moments, and memories.
           
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map(([value, label]) => (
            <button
              key={value}
              onClick={() => setCategory(value)}
              className={`rounded-xl px-5 py-3 font-semibold transition ${
                category === value
                  ? "bg-blue-500 text-white"
                  : "border border-white/10 bg-white/5 text-gray-300 hover:border-blue-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {filteredMemories.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-gray-400">
            No memories found in this category.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMemories.map((memory, index) => (
              <button
  key={memory.id}
  onClick={() => setSelectedIndex(index)}
  aria-label={`View ${memory.title || "Stormforged memory"}`}
  className="group relative h-80 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] text-left transition hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/10"
>
  <img
    src={memory.imageUrl}
    alt=""
    loading="lazy"
    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

  <div className="absolute bottom-0 left-0 right-0 p-6">
    <span className="rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-300">
      {memory.category || "general"}
    </span>

    <h3 className="mt-4 text-2xl font-black">
      {memory.title || "Stormforged Memory"}
    </h3>

    {memory.description && (
      <p className="mt-2 line-clamp-2 text-sm text-gray-300">
        {memory.description}
      </p>
    )}
  </div>
</button>
            ))}
          </div>
        )}
      </div>
      {selectedMemory && (
  <div
    onClick={() => setSelectedIndex(null)}
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 sm:p-6"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-storm shadow-2xl shadow-blue-500/10"
    >
      <button
        onClick={() => setSelectedIndex(null)}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-black/60 text-white backdrop-blur-md hover:bg-white/20"
      >
        ✕
      </button>

      {filteredMemories.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevMemory();
            }}
            aria-label="Previous memory"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-2xl text-white backdrop-blur-md hover:bg-white/20"
          >
            ‹
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextMemory();
            }}
            aria-label="Next memory"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-2xl text-white backdrop-blur-md hover:bg-white/20"
          >
            ›
          </button>
        </>
      )}

      <img
        src={selectedMemory.imageUrl}
        alt={selectedMemory.title || "Stormforged Memory"}
        className="max-h-[75vh] w-full object-contain"
      />

      <div className="border-t border-white/10 p-6">
        <span className="rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-300">
          {selectedMemory.category || "general"}
        </span>

        <h2 className="mt-4 text-3xl font-black">
          {selectedMemory.title || "Stormforged Memory"}
        </h2>

        {selectedMemory.description && (
          <p className="mt-3 text-gray-300">
            {selectedMemory.description}
          </p>
        )}

        <p className="mt-4 text-sm text-gray-400">
          Added by {selectedMemory.uploadedBy || "Unknown"}
        </p>
      </div>
    </div>
  </div>
)}
    </div>
  );
}