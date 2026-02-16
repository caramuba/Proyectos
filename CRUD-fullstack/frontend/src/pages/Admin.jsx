import { useEffect, useState } from "react";
import {
  getProductsRequest,
  createProductRequest,
  deleteProductRequest,
  updateProductRequest,
} from "../api/products.api";

import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import ConfirmModal from "../components/ConfirmModal";
import FiltersBar from "../components/FiltersBar";

import { Link } from "react-router-dom";

export default function Admin() {
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

  const hundleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hundleSubmit = async (e) => {
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

  const hundleEdit = (product) => {
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
      if (sortOption === "priceAsc") return a.price - b.price;
      if (sortOption === "priceDesc") return b.price - a.price;
      if (sortOption === "az") return a.name.localeCompare(b.name);
      if (sortOption === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-green-400">
          Panel Administrador ⚙️
        </h1>

        <Link
          to="/"
          className="bg-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Ir al Home 🏠
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductForm
          form={form}
          hundleChange={hundleChange}
          hundleSubmit={hundleSubmit}
          editingId={editingId}
          cancelEdit={cancelEdit}
        />

        <div className="bg-white/10 border border-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-extrablod mb-2 text-blue-400">
            Productos
          </h2>

          <FiltersBar
            search={search}
            setSearch={setSearch}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onlyStock={onlyStock}
            setOnlyStock={setOnlyStock}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

          {filteredProducts.length === 0 ? (
            <p className="text-gray-300">No hay productos disponibles. 📦</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  hundleEdit={hundleEdit}
                  askDelete={askDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        showModal={showModal}
        productToDelete={productToDelete}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />
    </div>
  );
}
