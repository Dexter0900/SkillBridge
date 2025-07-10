import { useState } from "react";
import gigs from "../data/gigs.json";
import GigCard from "../components/GigCard";

export default function BrowseGigs() {
  const [search, setSearch] = useState("");

  const filteredGigs = gigs.filter((gig) =>
    gig.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Browse Gigs
      </h1>
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search gigs by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGigs.length > 0 ? (
          filteredGigs.map((gig) => <GigCard key={gig.id} gig={gig} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No gigs found.
          </div>
        )}
      </div>
    </div>
  );
}
