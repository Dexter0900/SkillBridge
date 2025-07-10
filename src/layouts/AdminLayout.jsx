export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-red-800 text-white min-h-screen p-4">
        Admin Sidebar
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
