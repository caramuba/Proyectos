import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsRequest } from "../api/products.api";

export default function ProductDetail() {
  const { id } = useParams;

  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    const res = await getProductsRequest();
    const foundProduct = res.data.find((p) => p._id === id);
    setProduct(foundProduct);
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (!product) {
    return <p className="text-white p-6">Cargando producto...</p>;
  }

  return (
    <div className="p-6">
      <Link
        to="/"
        className="bg-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition"
      >
        Volver
      </Link>

      <div className="mt-8 bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover rounded-2xl mb-6"
        />
        <h1 className="text-4xl font-extrabold text-green-400">
          {product.name}
        </h1>
        <p className="text-gray-300 mt-4">{product.description}</p>
        <p className="text-2xl font-bold text-blue-400 mt-6">
          precio: &{product.price}
        </p>
        <p className="text-gray-400 mt-2">
          stock disponible:{" "}
          <span className="text-white font-bold">{product.stock}</span>
        </p>
      </div>
    </div>
  );
}
