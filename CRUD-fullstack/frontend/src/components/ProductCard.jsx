export default function ProductCard({ product, hundleEdit, ascDelete }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-xl overflow-hidden shadow-xl hover:scale-[1.02] transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-44 object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-gray-300 text-sm line-clamp-2">
          {product.description}
        </p>
        <p className="text-green-400 font-bold mt-1">${product.price}</p>

        <p className="text-gray-400 text-sm">
          stock:{" "}
          <span
            className={
              product.stock > 0
                ? "text-green-400 font-bold"
                : "text-red-400 font-bold"
            }
          >
            {product.stock}
          </span>
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleEdit(product)}
            className="bg-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Editar
          </button>

          <button
            onClick={() => askDelete(product)}
            className="bg-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-700 transition"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}
