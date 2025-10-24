
class Usuario { // Definición de la clase Usuario
    constructor(nombre, email) { // Constructor que inicializa nombre y email
        this.nombre = nombre; 
        this.email = email; // Asignacion de nombre y email
    }
    mostrar() { // Método para mostrar la información del usuario
        return `
        <div class="usuario">
        <h3>${this.nombre}</h3> 
        <p>${this.email}</p>
        </div>
        `; // Retorna una plantilla HTML con la información del usuario
    }
}


// Arrow function para mostrar usuarios en el DOM
const mostrarUsuarios = (usuarios) => {
    const contenedor = document.getElementById("contenedor"); // Selecciona el contenedor donde se mostrarán los usuarios
    contenedor.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos usuarios
    usuarios.forEach(usuario => { // Itera sobre cada usuario en el array
        contenedor.innerHTML += usuario.mostrar(); // Agrega la representación HTML del usuario al contenedor
        });
};

// Async function para cargar usuarios desde una API
async function cargarUsuarios() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users"); // Realiza una solicitud fetch a la API
        const data = await res.json(); // Convierte la respuesta a JSON

        const usuarios = data.map(u => new Usuario(u.name, u.email)); // Mapea los datos recibidos a instancias de la clase Usuario

        mostrarUsuarios(usuarios); // Llama a la función para mostrar los usuarios en el DOM
    } catch (error) {
        console.error("Error al cargar los datos de usuarios:", error); // Manejo de errores en caso de fallo en la solicitud

    }
}

document.getElementById("btn-cargar").addEventListener("click", cargarUsuarios); // Agrega un event listener al botón para cargar usuarios al hacer clic