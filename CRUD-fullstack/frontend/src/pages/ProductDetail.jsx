import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductByIdRequest, getProductsRequest } from "../api/products.api";
import Spinner from "../components/Spinner";
import { useCartStore } from "../store/useCartStore";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getProductByIdRequest(id);
      setProduct(res.data);
    } catch (err) {
      setError("No se pudo cargar el producto");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400 font-bold">{error}</p>

        <Link
          to="/"
          className="bg-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Volver al Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link
        to="/"
        className="bg-0blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition"
      >
        Volver
      </Link>

      <div className="my-8 bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-71 object-cover rounded-2xl mb-6"
        />
        <h1 className="text-4xl font-extrabold text-green-400 mt-6">
          {product.name}
        </h1>

        <p className="text-gray-300 mt-4">{product.description}</p>
        <p className="text-2xl font-bold text-blue-400 mt-6">
          precio: ${product.price}
        </p>

        <p className="text-gray-400 mt-2">
          Stock:{""}
          <span className="text-white font-bold">{product.stock}</span>
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-6 w-full bg-green-600 px-4 py-3 rounded-xl font-bold hover:bg-green-700 transition"
        >
          Agregar al carrito 🛒
        </button>
      </div>
    </div>
  );
}
