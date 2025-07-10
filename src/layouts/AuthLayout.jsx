export default function AuthLayout({ children }) {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
