import { useEffect, useState } from "react";
import {
  getProductsRequest,
  createProductRequest,
  deleteProductRequest,
  updateProductRequest,
} from "./api/products.api";

export default function App() {
  //==================================================
  // ESTADOS PRINCIPALES
  //==================================================
  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [productToDelete, setProductToDelete] = useState(null);

  const [editingId, setEditingId] = useState(null);

  //==================================================
  // ESTADO DEL FORMULARIO
  //==================================================
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: "",
  });

  //==================================================
  // ESTADO DE FILTROS
  //==================================================
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyStock, setOnlyStock] = useState(false);

  //==================================================
  //ESTADO DE ORDENAMIENTO
  //==================================================
  const [sortOption, setSortOption] = useState("none");

  //==================================================
  //FUNCION PARA CARGAR PRODUCTOS
  //==================================================
  const loadProducts = async () => {
    const res = await getProductsRequest();
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.trim() === "") return;
    if (form.price === "") return;

    if (editingId) {
      await updateProductRequest(editingId, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      setEditingId(null);
    } else {
      await createProductRequest({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
    }

    setForm({
      name: "",
      price: "",
      description: "",
      stock: "",
      image: "",
    });

    loadProducts();
  };

  const askDelete = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    await deleteProductRequest(productToDelete._id);
    setShowModal(false);
    setProductToDelete(null);

    loadProducts();
  };

  const cancelDelete = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);
      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);
      const matchesStock = onlyStock ? product.stock > 0 : true;
      return (
        matchesSearch && matchesMinPrice && matchesMaxPrice && matchesStock
      );
    })
    .sort((a, b) => {
      if (sortOption === "priceAsc")
        if (sortOption === "priceDesc")
          if (sortOption === "az") if (sortOption === "za") return 0;
    });

  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      image: product.image,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);

    setForm({
      name: "",
      price: "",
      description: "",
      stock: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-slate-900 to-black text-blue-500 flex justify-center items-center p-6">
      {/* Contenedor principal */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda formulario */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
          {/* Titulo Dinamico dependiendo si creamos o editamos */}
          <h1 className="text-3xl font-extrabold mb-2">
            {editingId ? "Editar Producto ✍️" : "Nuevo Producto 📦"}
          </h1>

          {/* Subtitulo */}
          <p className="text-gray-500 mb-6">
            Administra tu tienda de manera sencilla y eficiente. ¡Agrega, edita
            o elimina productos fácilmente! 🛒
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre del Producto"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <input
              type="text"
              name="image"
              placeholder="URL de la imagen"
              value={form.image}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <textarea
              type="text"
              name="description"
              placeholder="Descripcion"
              value={form.description}
              onChange={handleChange}
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

        {/* Columna derecha lista de productos */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
          {/* Titulo Lista de productos */}
          <h2 className="text-3xl font-extrabold mb-2">
            Lista de Productos 🛒
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-blue-500 transition"
            />

            <input
              type="number"
              placeholder="Precio min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="number"
              placeholder="Precio max"
              value={minPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <select
              value={sotOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="none">Sin orden</option>
              <option value="priceAsc">Precio: Menor a Mayor</option>
              <option value="priceDesc">Precio: Mayor a Menor</option>
              <option value="az">Nombre: A-Z</option>
              <option value="za">Nombre: Z-A</option>
            </select>
          </div>

          <label className="flex items-center gap-2 mb-6 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyStock}
              onChange={(e) => setOnlyStock(e.target.checked)}
              className="w-5 h-4"
            />
            Solo mostrar productos en stock
          </label>

          {products.length === 0 ? (
            <p className="text-gray-300">No hay productos disponibles. 📦</p>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Buscar producto..."
                className="w-full mb-4 py-3 rounded-2xl bg-white/20 text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex gap-4 items-center bg-white/10 border border-white/20 p-4 rounded-2xl hover:bg-white/20 transition shadow-md"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/20 hover:scale-105 transition shadow-md"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-green-400 font-bold mt-1">
                      ${product.price} | Stock: {product.stock}
                    </p>
                  </div>

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
              ))}
            </div>
          )}
        </div>

        {showModal && (
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
        )}
      </div>
    </div>
  );
}
