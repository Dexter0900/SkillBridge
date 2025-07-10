export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow max-w-md w-full">
        <button
          onClick={onClose}
          className="text-red-500 float-right font-bold"
        >
          X
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
