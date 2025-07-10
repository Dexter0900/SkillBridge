import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [appliedGigs, setAppliedGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        const db = getFirestore();
        // Fetch first name
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setFirstName(userDoc.data().firstName || "");
        } else {
          setFirstName("");
        }
        // Fetch applied gigs
        const q = query(
          collection(db, "applications"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const gigs = [];
        for (let docSnap of querySnapshot.docs) {
          gigs.push({ id: docSnap.id, ...docSnap.data() });
        }
        setAppliedGigs(gigs);
      } else {
        setUser(null);
        setFirstName("");
        setAppliedGigs([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Dashboard</h1>
        {user ? (
          <>
            <p className="text-lg mb-8">
              Welcome,{" "}
              <span className="font-semibold text-blue-600">
                {firstName ? firstName : user.email}
              </span>
              !
            </p>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Applied Gigs
              </h2>
              {loading ? (
                <div className="text-gray-500">Loading...</div>
              ) : appliedGigs.length === 0 ? (
                <div className="text-gray-500">
                  You have not applied to any gigs yet.
                </div>
              ) : (
                <ul className="space-y-4">
                  {appliedGigs.map((gig) => (
                    <li
                      key={gig.id}
                      className="border border-blue-100 rounded-lg p-4 bg-blue-50 flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <div className="font-semibold text-blue-700">
                          Gig ID: {gig.gigId}
                        </div>
                        <div className="text-gray-600 text-sm">
                          Applied At:{" "}
                          {gig.appliedAt?.toDate
                            ? gig.appliedAt.toDate().toLocaleString()
                            : "N/A"}
                        </div>
                      </div>
                      {/* You can add more gig info here if available */}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-600">
            Please log in to access your dashboard.
          </p>
        )}
      </div>
    </div>
  );
}
