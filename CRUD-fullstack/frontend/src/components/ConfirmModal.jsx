export default function ConfirmModal({
  showModal,
  productToDelete,
  confirmDelete,
  cancelDelete,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-1 bg-black/60 flex justify-center items-center z-50">
      <div className="w-full bg-zinc-900 border border-white/20 p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">
          Eliminar Producto
        </h2>

        <p className="text-gray-300 mb-4">
          Estas a punto de eliminar{" "}
          <span className="font-bold text-red-400">
            {productToDelete?.name}
          </span>
          .
        </p>
        <p className="text-gray-300 flex justify-center mb-4">
          Esta accion no se puede deshacer.
        </p>

        <div className="flex justify-between">
          <button
            onClick={confirmDelete}
            className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-700 transition font-bold text-white"
          >
            Si, borrar.
          </button>

          <button
            onClick={cancelDelete}
            className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-700 transition font-bold text-white"
          >
            No, no lo borres!
          </button>
        </div>
      </div>
    </div>
  );
}
