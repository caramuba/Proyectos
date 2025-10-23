export function hacerCarritoArrastrable() {
    const icono = document.querySelector(".icono-carrito.flotante");
    let offsetX = 0; 
    let offsetY = 0;
    let isDragging = false;

    icono.style.position = "fixed";
    icono.style.left = icono.offsetLeft + "px";
    icono.style.top = icono.offsetTop + "px";

    icono.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - icono.offsetLeft;
        offsetY = e.clientY - icono.offsetTop;
        icono.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
            icono.style.left = `${e.clientX - offsetX}px`;
            icono.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            icono.style.cursor = "grab";
        });

        icono.addEventListener("touchstart", (e) => {
            isDragging = true;
            const touch = e.touches[0];
            offsetX = touch.clientX - icono.offsetLeft;
            offsetY = touch.clientY - icono.offsetTop;
        });

        document.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            icono.style.left = `${touch.clientX - offsetX}px`;
            icono.style.top = `${touch.clientY - offsetY}px`;
        });

        document.addEventListener("touchend", () => {
            isDragging = false;
        });
}