export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left */}
        <div>
          <h1 className="text-xl font-bold text-white">SkillBridge</h1>
          <p className="text-sm">Connecting students with opportunities</p>
        </div>

        {/* Center */}
        <div className="flex space-x-4">
          <a href="/" className="hover:text-white text-sm">
            Home
          </a>
          <a href="/browse-gigs" className="hover:text-white text-sm">
            Browse Gigs
          </a>
          <a href="/login" className="hover:text-white text-sm">
            Login
          </a>
          <a href="/signup" className="hover:text-white text-sm">
            Signup
          </a>
        </div>

        {/* Right */}
        <div className="text-sm">
          © {new Date().getFullYear()} SkillBridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
