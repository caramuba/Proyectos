class Usuario {
  // Definición de la clase Usuario
  constructor(nombre, email, ciudad) {
    // Constructor que inicializa nombre y email
    this.nombre = nombre;
    this.email = email; // Asignacion de nombre, ciudad y email
    this.ciudad = ciudad;

  }
  mostrar() {
    // Método para mostrar la información del usuario
    return `
        <div class="usuario">
        <h3> ${this.nombre}</h3> 
        <p><strong>Email:</strong> ${this.email}</p>
        <p><strong>Ciudad:</strong> ${this.ciudad}</p>
        </div>
        `; // Retorna una plantilla HTML con la información del usuario
  }
}

// Arrow function para mostrar usuarios en el DOM
const mostrarUsuarios = (usuarios) => {
  const contenedor = document.getElementById("contenedor"); // Selecciona el contenedor donde se mostrarán los usuarios
  contenedor.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos usuarios

  if (usuarios.length === 0) {// Verifica si el array de usuarios está vacío
    contenedor.innerHTML = "<p>No hay usuarios para mostrar.</p>"; // Muestra un mensaje si no hay usuarios
    return; // Sale de la función
  }

  usuarios.forEach(usuario => {// Itera sobre cada usuario en el array
    contenedor.innerHTML += usuario.mostrar(); // Agrega la representación HTML del usuario al contenedor
  });
};

let usuariosTotales = []; // Array para almacenar todos los usuarios

// Async function para cargar usuarios desde una API
async function cargarUsuarios() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users"); // Realiza una solicitud fetch a la API
    if (!res.ok) throw new Error("Error al cargar los datos"); // Lanza un error si la respuesta no es exitosa

    const data = await res.json(); // Convierte la respuesta a JSON

    usuariosTotales = data.map(u => new Usuario(u.name, u.email, u.address.city)); // Mapea los datos a instancias de la clase Usuario

    mostrarUsuarios(usuariosTotales); // Muestra los usuarios en el DOM
  } catch (error) {
    console.error("Error al cargar los usuarios", error); // Manejo de errores en la carga de usuarios
  }
}

const filtrarUsuarios = () => { // Función para filtrar usuarios por ciudad
  const texto = document.getElementById("buscador").value.toLowerCase(); // Obtiene el texto del input y lo convierte a minúsculas
  const filtrados = usuariosTotales.filter(usuario => // Filtra los usuarios cuyo nombre o ciudad incluye el texto buscado
    usuario.ciudad.toLowerCase().includes(texto)
  );
  mostrarUsuarios(filtrados); // Muestra los usuarios filtrados en el DOM
};

document.getElementById("btn-cargar").addEventListener("click", cargarUsuarios); // Agrega un event listener al botón de cargar usuarios
document.getElementById("buscador").addEventListener("input", filtrarUsuarios); // Agrega un event listener al input de búsqueda