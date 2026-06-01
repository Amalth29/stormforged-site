import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Roster() {
  const [search, setSearch] = useState("");
  const [rankFilter, setRankFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rank");

  const [roster, setRoster] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);

  const rankOrder = {
    Leader: 1,
    Officer: 2,
    Member: 3,
  };

  useEffect(() => {
    fetch("https://aqw-bot-production.up.railway.app/guild-roster")
      .then((res) => res.json())
      .then((data) => {
        setRoster(data.members || []);
        setTotalMembers(data.totalMembers || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        Loading guild roster...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] px-4 pb-20 pt-4 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-blue-400 hover:bg-blue-500/10"
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
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-gray-400">Total Members</p>
            <h2 className="mt-2 text-4xl font-black text-blue-400">
              {totalMembers}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-gray-400">Officers</p>
            <h2 className="mt-2 text-4xl font-black text-cyan-400">
              {roster.filter((member) => member.rank === "Officer").length}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Showing {filteredRoster.length} members
        </p>

        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 mb-6 w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none backdrop-blur-xl"
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
            className="w-full rounded-xl border border-white/10 bg-[#0c132b] px-5 py-3 font-semibold text-white outline-none backdrop-blur-xl sm:w-auto"
          >
            <option value="rank">Sort by Rank</option>
            <option value="name">Sort by Name</option>
            <option value="level">Sort by Level</option>
          </select>
        </div>

        <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl">
          <div className="hidden grid-cols-[4fr_1fr_0.7fr] border-b border-white/10 px-8 py-5 text-sm uppercase tracking-widest text-gray-400 sm:grid">
            <div>Name</div>
            <div>Rank</div>
            <div>Level</div>
          </div>

          <div className="max-h-[720px] overflow-y-auto">
            {filteredRoster.map((member, index) => (
              <div
                key={index}
                className="border-b border-white/5 px-5 py-5 transition hover:bg-white/5 sm:grid sm:grid-cols-[4fr_1fr_0.7fr] sm:px-8"
              >
                <a
                  href={`https://account.aq.com/CharPage?id=${encodeURIComponent(
                    member.name
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block min-w-0 truncate pr-4 text-lg font-bold transition hover:text-blue-400 sm:text-base"
                >
                  {member.name}
                </a>

                <div
                  className={`mt-2 text-sm font-semibold sm:mt-0 sm:text-base ${rankColor(
                    member.rank
                  )}`}
                >
                  {member.rank}
                </div>

                <div className="mt-1 text-sm text-gray-300 sm:mt-0 sm:text-base">
                  {member.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}