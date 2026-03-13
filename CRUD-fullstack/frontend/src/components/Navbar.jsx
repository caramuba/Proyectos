import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

export default function navbar() {
  const location = useLocation();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black/40 border-b border-white/30 backdrop-blur-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold text-blue-400">
        CRUD-O
      </Link>

      <div className="flex gap-4 items-center">
        <Link
          to="/"
          className={`px-4 py-2 ronded-xl font-bold transition ${
            isActive("/")
              ? "bg-blue-600 text-white"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Home
        </Link>

        <Link
          to="/admin"
          className={`px-4 py-2 ronded-xl font-bold transition ${
            isActive("/admin")
              ? "bg-green-600 text-white"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Admin
        </Link>

        <Link
          to="/cart"
          className={`px-4 py-2 ronded-xl font-bold transition ${
            isActive("/cart")
              ? "bg-blue-600 text-white"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Carrito 🛍️ ({totalItems})
        </Link>
      </div>
    </nav>
  );
}
