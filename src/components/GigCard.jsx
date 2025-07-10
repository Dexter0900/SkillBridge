import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function GigCard({ gig }) {
  const handleApply = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to apply.");
      return;
    }

    try {
      await addDoc(collection(db, "applications"), {
        userId: user.uid,
        gigId: gig.id,
        appliedAt: serverTimestamp(),
      });
      alert("Application submitted!");
    } catch (err) {
      console.error(err);
      alert("Failed to apply. Try again.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col hover:shadow-2xl transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-blue-700">{gig.title}</h2>
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {gig.budget}
        </span>
      </div>
      <div className="flex items-center text-gray-500 text-sm mb-3 gap-2">
        <span className="font-medium">{gig.company}</span>
        <span>•</span>
        <span>{gig.location}</span>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-3">{gig.description}</p>
      <button
        onClick={handleApply}
        className="mt-auto bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold px-5 py-2 rounded-lg shadow"
      >
        Apply
      </button>
    </div>
  );
}
