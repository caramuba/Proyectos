export function agregarAlCarrito(carrito, producto) {
    if (!producto) return carrito;
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarEnStorage(carrito);
    return carrito;
}

export function eliminarDelCarrito(carrito, id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarEnStorage(carrito);
    return carrito;
}

export function vaciarCarrito() {
    localStorage.removeItem('carrito');
    return [];
}

export function cargarCarritoDesdeStorage() {
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
}

function guardarEnStorage(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
