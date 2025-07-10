import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-blue-400 py-16 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to SkillBridge
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
          Connecting skilled professionals with the best freelance
          opportunities. Find your next gig or your next star performer, all in
          one place.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded shadow hover:bg-blue-50 transition"
        >
          Get Started
        </Link>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="font-semibold text-lg mb-2">Sign Up</h3>
            <p className="text-gray-600">
              Create your free account in seconds and set up your profile.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="font-semibold text-lg mb-2">Browse & Apply</h3>
            <p className="text-gray-600">
              Explore gigs or post your own. Apply or connect with top talent
              easily.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="font-semibold text-lg mb-2">Get Hired</h3>
            <p className="text-gray-600">
              Start working, collaborate, and get paid securely through
              SkillBridge.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-14 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-700">
          What Our Users Say
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <p className="text-gray-700 mb-4 italic">
              "SkillBridge made it so easy to find quality gigs. I landed my
              first project within a week!"
            </p>
            <span className="font-semibold text-blue-600">— Priya S.</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <p className="text-gray-700 mb-4 italic">
              "As a business owner, I found amazing freelancers quickly. The
              process is seamless and secure."
            </p>
            <span className="font-semibold text-blue-600">— Rahul M.</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <p className="text-gray-700 mb-4 italic">
              "The platform is intuitive and support is great. Highly
              recommended for both clients and freelancers."
            </p>
            <span className="font-semibold text-blue-600">— Anjali T.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
