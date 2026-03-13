import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const TotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">
        Tu Carrito🛍️
      </h1>
      {cart.length === 0 ? (
        <div className="bg-white/10 border border-white/20 p-6 rounded-2xl text-center">
          <p className="text-gray-300 text-lg">Tu carrito está vacío </p>
          <Link
            to="/"
            className="inline-block mt-4 bg-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Volver a la tienda
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white/10 border border-white/20 p-4 rounded-2xl"
              >
                <div>
                  <h2 className="text-xl font-bold text-white">{item.name}</h2>

                  <p className="text-gray-300">
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="text-green-400 font-bold">
                    subtotal:: ${item.price * item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white/10 border border-white/20 p-6 rounded-2xl flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              Total: <span className="text-yellow-400">${TotalPrice()}</span>
            </h2>

            <button
              onClick={clearCart}
              className="bg-gray-600 px-4 py-2 rounded-xl font-bold hover:bg-gray-700 transition"
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}
