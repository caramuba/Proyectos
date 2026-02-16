import { use, useEffect, useState } from "react";
import { getProductsRequest } from "../api/products.api";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const loadProducts = async () => {
    const res = await getProductsRequest();
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-blue-400">
          Tienda Online 🛒
        </h1>

        <Link
          to="/admin"
          className="bg-green-600 px-4 py-2 rounded-xl font-bold hover:bg-green-700 transition"
        >
          Ir a Admin
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-300">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
