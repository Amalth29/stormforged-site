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
  .then(res => res.json())
  .then(data => {
    console.log("API DATA:", data);
    setRoster(data.members || []);
    setTotalMembers(data.totalMembers || 0);
   
    setLoading(false);
  })
}, []);
const filteredRoster = roster
  .filter(member => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase());

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
if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
      Loading guild roster...
    </div>
  );
}
    return (

    <div className="min-h-screen bg-[#050816] text-white px-6 pt-4 pb-20">

      <div className="mx-auto max-w-7xl">
        <Link
  to="/"
  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-blue-400 hover:bg-blue-500/10"
>
  ← Back to Home
</Link>

        <h1 className="text-6xl font-black">
          Full Guild Roster
        </h1>

        <p className="text-gray-400">
          Stormforged active member list.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

    <p className="text-sm text-gray-400">
      Total Members
    </p>

    <h2 className="mt-2 text-4xl font-black text-blue-400">
      {totalMembers}
    </h2>

  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

    <p className="text-sm text-gray-400">
      Officers
    </p>

    <h2 className="mt-2 text-4xl font-black text-cyan-400">
      {
        roster.filter(member => member.rank === "Officer").length
      }
    </h2>

  </div>



</div>
<p className="mt-2 text-sm text-gray-500">
  Showing {filteredRoster.length} members
</p>
<input
  type="text"
  placeholder="Search members..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mt-4 mb-6 w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none backdrop-blur-xl"
/>
<div className="mb-8 flex flex-wrap items-center gap-4">

  <div className="flex flex-wrap gap-3">
    {["All", "Leader", "Officer", "Member"].map(rank => (
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
    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white outline-none backdrop-blur-xl"
  >
    <option value="rank">Sort by Rank</option>
    <option value="name">Sort by Name</option>
    <option value="level">Sort by Level</option>
  </select>

</div>
        <div className="mt-12 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl">

          {/* HEADER */}

         <div className="sticky top-0 z-10 grid grid-cols-3 border-b border-white/10 bg-[#0b1120]/90 px-8 py-5 text-sm uppercase tracking-widest text-gray-400 backdrop-blur-xl">

            <div>Name</div>
            <div>Rank</div>
            <div>Level</div>

          </div>

          {/* MEMBERS */}
<div className="max-h-[700px] overflow-y-auto">
          {filteredRoster.map((member, index) => (

            <div
  key={index}
  className="grid grid-cols-[1.6fr_0.9fr_0.5fr] border-b border-white/5 px-4 py-5 text-sm transition hover:bg-white/5 sm:px-8 sm:text-base"
>
  <div className="min-w-0">
    <a
      href={`https://account.aq.com/CharPage?id=${encodeURIComponent(member.name)}`}
      target="_blank"
      rel="noreferrer"
      className="block max-w-[120px] truncate font-semibold transition hover:text-blue-400 sm:max-w-none"
    >
      {member.name}
    </a>
  </div>

  <span className="text-blue-400">
    {member.rank}
  </span>

  <div className="text-gray-300">
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