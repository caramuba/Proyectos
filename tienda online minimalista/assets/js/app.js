import { cargarProductos, filtrarProductos } from "./fetchProductos.js";
import { agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, cargarCarritoDesdeStorage } from "./carrito.js";
import { renderizarProductos, renderizarCarrito, actualizarTotal, mostrarCarrito } from "./ui.js";
import { hacerCarritoArrastrable } from "./dragCarrito.js";

let productos = [];
let carrito = [];

document.addEventListener("DOMContentLoaded", async () => {
    try {
        productos = await cargarProductos();
        renderizarProductos(productos);

        carrito = cargarCarritoDesdeStorage();
        renderizarCarrito(carrito);
        actualizarTotal(carrito);

        configurarFiltros();
        configurarEventosDelCarrito();
    } catch (error) {
        console.error("Error al cargar la app:", error);
    }
});

function configurarFiltros() {
    const botonesFiltro = document.querySelectorAll(".filtro");
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", () => {
            botonesFiltro.forEach(b => b.classList.remove("activo"));
            boton.classList.add("activo");
            const categoria = boton.dataset.categoria;
            const filtrados = filtrarProductos(productos, categoria);
            renderizarProductos(filtrados);
        });
    });
}

function configurarEventosDelCarrito() {
    const iconoCarrito = document.querySelector(".icono-carrito");
    const btnVaciar = document.getElementById("vaciar-carrito");

    iconoCarrito.addEventListener("click", mostrarCarrito);
    btnVaciar.addEventListener("click", () => {
        carrito = vaciarCarrito();
        renderizarCarrito(carrito);
        actualizarTotal(carrito);
    });

    document.addEventListener("click", e => {
        if (e.target.classList.contains("btn-agregar")) {
            const id = Number(e.target.dataset.id);
            const productoSeleccionado = productos.find(p => p.id === id);
            carrito = agregarAlCarrito(carrito, productoSeleccionado);
            renderizarCarrito(carrito);
            actualizarTotal(carrito);
        }
        if (e.target.classList.contains("btn-eliminar")) {
            const id = Number(e.target.dataset.id);
            carrito = eliminarDelCarrito(carrito, id);
            renderizarCarrito(carrito);
            actualizarTotal(carrito);
        }
    });

    hacerCarritoArrastrable();
}
