export default function productForm({
  form,
  hundleChange,
  hundleSubmit,
  editingId,
  cancelEdit,
}) {
  return (
    <div className="bg-white/10 border border-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
      {/* Titulo Dinamico dependiendo si creamos o editamos */}
      <h1 className="text-3xl font-extrabold mb-2">
        {editingId ? "Editar Producto ✍️" : "Nuevo Producto 📦"}
      </h1>

      {/* Subtitulo */}
      <p className="text-gray-500 mb-6">
        Administra tu tienda de manera sencilla y eficiente. ¡Agrega, edita o
        elimina productos fácilmente! 🛒
      </p>

      {/* Formulario */}
      <form onSubmit={hundleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre del Producto"
          value={form.name}
          onChange={hundleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={hundleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={hundleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        <input
          type="text"
          name="image"
          placeholder="URL de la imagen"
          value={form.image}
          onChange={hundleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        <textarea
          type="text"
          name="description"
          placeholder="Descripcion"
          value={form.description}
          onChange={hundleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        <button
          type="submit"
          className="w-full bg-green-600 py-3 rounded-xl text-white/50 font-bold hover:bg-green-700 transition shadow-lg"
        >
          {editingId ? "Actualizar Producto" : "Crear Producto"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
            className="w-full bg-green-600 py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg"
          >
            Cancelar Edición
          </button>
        )}
      </form>
    </div>
  );
}
