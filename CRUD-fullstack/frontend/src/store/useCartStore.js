import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const cart = get().cart;
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      set({
        cart: cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      set({
        cart: [...cart, { ...product, quantity: 1 }],
      });
    }
  },

  removeFromCart: (id) => {
    set({
      cart: get().cart.filter((item) => item._id !== id),
    });
  },

  clearCart: () => set({ cart: [] }),

  getTotalItems: () => {
    return get().cart.reduce((acc, item) => acc + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  },
}));
