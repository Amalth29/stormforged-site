import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HudPanel from "../components/HudPanel";

export default function Roster() {
  const [search, setSearch] = useState("");
  const [rankFilter, setRankFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rank");

  const [roster, setRoster] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rankOrder = {
    Leader: 1,
    Officer: 2,
    Member: 3,
  };

  useEffect(() => {
    fetch("https://aqw-bot-production.up.railway.app/guild-roster")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setRoster(data.members || []);
        setTotalMembers(data.totalMembers || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredRoster = roster
    .filter((member) => {
      const matchesSearch = member.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesRank =
        rankFilter === "All" || member.rank === rankFilter;

      return matchesSearch && matchesRank;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "level") {
        return b.level - a.level;
      }

      return rankOrder[a.rank] - rankOrder[b.rank];
    });

  const rankColor = (rank) => {
    if (rank === "Leader") return "text-yellow-300";
    if (rank === "Officer") return "text-blue-400";
    return "text-gray-400";
  };

  if (loading) {
    return (
      <div
        role="status"
        className="flex min-h-screen items-center justify-center bg-storm text-white"
      >
        Loading guild roster...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-storm px-6 text-center text-white">
        <p className="text-lg font-semibold">Couldn't load the roster right now.</p>
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
    <div className="min-h-screen bg-storm px-4 pb-20 pt-4 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-5 py-3 text-sm font-semibold text-white transition hover:border-blue-400 hover:bg-blue-500/10"
        >
          ← Back to Home
        </Link>

        <div className="mt-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
            Guild Roster
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-6xl">
            Full Guild Roster
          </h1>

          <p className="mt-4 text-gray-400">
            Stormforged active member list.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6">
            <p className="text-sm text-gray-400">Total Members</p>
            <h2 className="mt-2 text-4xl font-black text-blue-400">
              {totalMembers}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6">
            <p className="text-sm text-gray-400">Officers</p>
            <h2 className="mt-2 text-4xl font-black text-cyan-400">
              {roster.filter((member) => member.rank === "Officer").length}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          Showing {filteredRoster.length} members
        </p>

        <label htmlFor="roster-search" className="sr-only">
          Search members
        </label>
        <input
          id="roster-search"
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 mb-6 w-full rounded-2xl border border-white/10 bg-white/[0.07] px-6 py-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            {["All", "Leader", "Officer", "Member"].map((rank) => (
              <button
                key={rank}
                onClick={() => setRankFilter(rank)}
                className={`rounded-xl px-5 py-3 font-semibold transition ${
                  rankFilter === rank
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "border border-white/10 bg-white/5 text-gray-300 hover:border-blue-400"
                }`}
              >
                {rank}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0c132b] px-5 py-3 font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:w-auto"
          >
            <option value="rank">Sort by Rank</option>
            <option value="name">Sort by Name</option>
            <option value="level">Sort by Level</option>
          </select>
        </div>

        <HudPanel className="mx-auto mt-10 max-w-6xl">
          <div className="relative overflow-hidden border border-blue-400/20 bg-[#050b1c]/80 shadow-[0_0_40px_-12px_rgba(59,130,246,0.25)]">
            <div className="hud-scanline pointer-events-none absolute inset-x-0 opacity-[0.07]" />

            <div className="max-h-[720px] overflow-y-auto">
              <div className="sticky top-0 z-10 hidden grid-cols-[4fr_1fr_0.7fr] border-b border-blue-400/20 bg-[#050b1c] px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-blue-400/80 sm:grid">
                <div>Name</div>
                <div>Rank</div>
                <div>Lvl</div>
              </div>

              {filteredRoster.map((member, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${Math.min(index, 20) * 30}ms` }}
                  className="hud-row group relative border-b border-white/5 px-5 py-4 font-mono transition hover:bg-blue-500/[0.06] sm:grid sm:grid-cols-[4fr_1fr_0.7fr] sm:items-center sm:px-8"
                >
                  <span className="absolute left-0 top-0 h-full w-0 bg-blue-400 transition-all duration-300 group-hover:w-0.5" />

                  <a
                    href={`https://account.aq.com/CharPage?id=${encodeURIComponent(
                      member.name
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-w-0 items-center truncate pr-4 text-lg font-bold tracking-wide transition group-hover:text-blue-300 sm:text-base"
                  >
                    {member.name}
                  </a>

                  <div
                    className={`mt-2 truncate text-sm font-bold tracking-wider sm:mt-0 sm:text-sm ${rankColor(
                      member.rank
                    )}`}
                  >
                    [{(member.rank || "").toUpperCase()}]
                  </div>

                  <div className="mt-1 text-sm text-gray-400 sm:mt-0 sm:text-base">
                    <span className="text-gray-600 sm:hidden">LV</span>
                    {String(member.level ?? "").padStart(3, "0")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HudPanel>
      </div>
    </div>
  );
}