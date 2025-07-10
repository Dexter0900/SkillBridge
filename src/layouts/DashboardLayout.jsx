import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        Sidebar
      </aside>
      <main className="flex-1">
        <Navbar />
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
