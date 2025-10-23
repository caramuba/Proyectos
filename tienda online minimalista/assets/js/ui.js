export function renderizarProductos(lista) {
    const contenedor = document.getElementById("productos-container");
    contenedor.innerHTML = "";

    lista.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.nombre}">
            <div class="card-content">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <button class="btn-agregar" data-id="${prod.id}">Agregar al carrito</button>
            </div>
            `;
        contenedor.appendChild(card);
        console.log("Cargando imagen", prod.img);
    });
}

export function renderizarCarrito(carrito) {
    const lista = document.getElementById("lista-carrito");
    const contador = document.getElementById("contador-carrito");
    lista.innerHTML = "";

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("item-carrito");
        li.innerHTML = `
            <img src="${item.img}" alt="${item.nombre}">
            <span>${item.nombre} x${item.cantidad}</span>
            <span>$${item.precio * item.cantidad}</span>
            <button class="btn-eliminar" data-id="${item.id}">X</button>
        `;
        lista.appendChild(li);
    });

    contador.textContent = carrito.reduce((acc, i) => acc + i.cantidad, 0);
}

export function actualizarTotal(carrito) {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    document.getElementById("total-carrito").textContent = `$${total}`;
}

export function mostrarCarrito() {
    const carrito = document.getElementById("carrito-contenedor");
    carrito.classList.toggle("visible");
}