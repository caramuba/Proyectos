export async function cargarProductos() {
    try {
        const ruta = location.hostname === "localhost"
            ? "./data/productos.json"
            : "/data/productos.json";
        const res = await fetch(ruta);
        if (!res.ok) throw new Error("Error al cargar los productos");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("error al cargar los productos:", error)
        return [];
    }
}

export function filtrarProductos(productos, categoria) {
    if (categoria === "todos") return productos;
    return productos.filter(prod => prod.categoria === categoria);
}