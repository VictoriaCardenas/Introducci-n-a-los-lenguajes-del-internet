const contenedorCarrito = document.getElementById("carrito");
const carrito = {//objeto carrito
    items: [],//arreglo en el que se gusrda lo que el usuario ponga en el carrito
    agregarItem(producto) {//función para agregar al array el producto
        this.items.push(producto);
        this.actualizarContador(); //se va mostrando el número de elementos en el carrito
    },
    calcularTotal() {
        let total = 0;//Inicializar la variable del total
        this.items.forEach(item => {//recorrer todos los items
            total = total + item.price; // sumar los precios de cada pproducto dentro del carrito
        });
        return total.toFixed(2); // Devuelve el total con solo dos decimales
    },
    renderizarCarrito() {
        const contenedor = document.getElementById("carrito-items");
        contenedor.innerHTML = "";//limpiar los productos que ya estén para volver a cargarlos pero actualizados
        this.items.forEach((producto, index) => {//recorrer cada producto dentro del array
            const elemento = document.createElement("div");//para cada elemento se crea un div
            elemento.classList.add("carrito-item");//se le pone la clase carrito item a cada producto
            elemento.innerHTML = `
                <img src="${producto.image}" class="carrito-img">
                <p class="carrito-nombre">${producto.title}</p>
                <p class="carrito-precio">$${producto.price}</p>
                <button class="btn-eliminar">X</button>
            `;
            elemento.querySelector(".btn-eliminar").addEventListener("click", () => {
                this.items.splice(index, 1);// para eliminar
                this.renderizarCarrito();
                this.actualizarContador();
            });

            contenedor.appendChild(elemento);
        });

        const total = this.calcularTotal();
        document.getElementById("total").textContent = `Total: $${total}`;
    },
    actualizarContador() {
        const contador = document.getElementById("contador-carrito");
        contador.textContent = this.items.length;//se iguala el trxto del contador a la cantidad de elementos en el carrito
    }

};

function mostrarCorazon(boton) {//
    const corazon = document.createElement('div');
    corazon.className = 'corazon-animacion';
    corazon.textContent = '❤️';
    
    const rect = boton.getBoundingClientRect();
    corazon.style.left = (rect.left + rect.width/2 - 15) + 'px';
    corazon.style.top = (rect.top - 10) + 'px';
    
    document.body.appendChild(corazon);
    
    setTimeout(() => {
        corazon.remove();
    }, 1200);
}

function cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}

document.addEventListener("DOMContentLoaded", () => { // Espera a que el HTML exista antes de hacer el fetch

    if (!localStorage.getItem("usuario")) {
        window.location.href = "login.html";
    }

    const containerCatalogo = document.getElementById("catalogo-productos");
    const descripcionesProductos = {//La modificación de las descripciones de cada producto dentro de la API
        1: "Mochila cuadrada ideal para el trabajo, la universidad o una salida casual. Perfecta para llevar una laptop de hasta 15 pulgadas con estilo y comodidad.",
        2: "Camisa estilo slim con manga media y cuello de tres botones. Fabricada en una tela suave y respirable que te mantiene fresco durante todo el día.",
        3: "Chaqueta versátil para primavera, otoño e invierno. Cómoda, ligera y con un toque moderno ideal para quienes combinan estilo y buena vibra.",
        4: "Camisa de manga larga con un color vibrante que rejuvenece. Su tela se ajusta delicadamente al cuerpo y se siente como una caricia suave.",
        5: "Brazalete de la colección Leyendas Naga, inspirado en el mito del dragón acuático que protege la perla del océano. Un accesorio único para elevar cualquier outfit.",
        6: "Anillo de oro sólido que aporta ligereza, elegancia y sofisticación. Un accesorio sutil pero llamativo.",
        7: "Anillo plateado con brillo que evoca la realeza. Dramático pero elegante, con detalles que resaltan tu belleza.",
        8: "Aretes en oro rosa: sofisticados, planos y perfectos para un look casual con un toque refinado.",
        9: "Disco duro externo portátil de 2TB, ideal para amantes de la tecnología. Haz tus tareas más prácticas con almacenamiento rápido y seguro.",
        10: "Actualiza tu equipo con un rendimiento más rápido en arranque, apagado y carga de aplicaciones. Equilibrio perfecto entre velocidad y fiabilidad.",
        11: "Memoria flash NAND 3D con altas velocidades de transferencia para un mejor rendimiento general. Su tecnología de caché SLC optimiza la velocidad y prolonga su duración.",
        12: "Mejora tu experiencia de juego en PS4 con una instalación rápida y portátil. Diseño elegante con gran capacidad para llevar tus juegos a donde quieras.",
        13: "Pantalla panorámica IPS Full HD de 21,5 pulgadas con tecnología Radeon FreeSync. Diseño ultradelgado ideal para gaming y productividad.",
        14: "Monitor curvo súper ultra ancho de 49 pulgadas con relación 32:9. Su actualización de 144 Hz y tiempo de respuesta de 1 ms eliminan el desenfoque y reducen la latencia.",
        15: "Chaqueta 3 en 1 desmontable para mayor comodidad. Úsala en distintas estaciones combinando el forro interior o la capa exterior según el clima.",
        16: "Chaqueta de piel sintética con diseño vaquero y capucha desmontable. Incluye bolsillos frontales y costuras decorativas para un toque moderno.",
        17: "Abrigo ligero perfecto para viajes o looks casuales. Impermeable, con capucha, forro interno y cintura ajustable con cordón.",
        18: "Camiseta blanca básica: simple, elegante y siempre combinable. Un imprescindible en cualquier guardarropa.",
        19: "Tela suave y ligera con cuello en V y un corte ajustado que crea una silueta elegante y femenina sin sacrificar comodidad.",
        20: "Prenda casual y cómoda con un color vibrante que resalta tu personalidad y combina con cualquier estilo."
    };
    const nombresProductos = {// la lista de productos de la API pero traducidas
        1: "Mochila Foldsack No.1 – Para Laptop 15\"",
        2: "Camiseta Premium Slim Fit para Hombre",
        3: "Chaqueta Casual de Algodón para Hombre",
        4: "Camisa Slim Fit Manga Larga para Hombre",
        5: "Pulsera Naga – Colección Leyendas",
        6: "Anillo Micropavé en Oro Sólido",
        7: "Anillo Princess en Oro Blanco",
        8: "Aretes Rose Gold Acero Inoxidable",
        9: "Disco Duro Externo 2TB – WD Elements",
        10: "SSD Interno 1TB – SanDisk Plus",
        11: "SSD 256GB – Silicon Power A55",
        12: "WD Gaming Drive 4TB – Compatible PS4",
        13: "Monitor Acer 21.5” Full HD Ultra-Delgado",
        14: "Monitor Curvo Samsung 49” UltraWide 144Hz",
        15: "Chaqueta 3 en 1 para Nieve – Mujer",
        16: "Chaqueta Moto Biker con Capucha Removable – Mujer",
        17: "Impermeable Windbreaker a Rayas – Mujer",
        18: "Camiseta Básica Blanca Cuello Bote – Mujer",
        19: "Camiseta Cuello en V de Secado Rápido – Mujer",
        20: "Camiseta Casual de Algodón – Mujer"
    };

    fetch("https://fakestoreapi.com/products")// solicitar la respuesta de la API
        .then(res => res.json())// la respuesta se guarda en res
        .then(productos => {

            productos.forEach(producto => {//se recorre cada producto y se le crea su "espacio"
                const elemento = document.createElement("div");
                elemento.classList.add("producto");

                elemento.innerHTML = `//para poner cada característica del producto
                    <h3>${nombresProductos[producto.id]}</h3>
                    <img src="${producto.image}" alt="${nombresProductos[producto.id]}" width="150">
                    <p>${descripcionesProductos[producto.id] }</p>
                    <p>$${producto.price}</p>
                `;
                const boton = document.createElement("button");
                boton.textContent = "Añadir al carrito";// cada producto se le añade el botón para añadir al carrito
                boton.addEventListener("click", () => {
                    carrito.agregarItem(producto);
                    carrito.renderizarCarrito();
                    mostrarCorazon(boton);
                    const btnCarrito = document.getElementById("btn-carrito");
                    btnCarrito.classList.add("pulso-carrito");
                    setTimeout(() => btnCarrito.classList.remove("pulso-carrito"), 500);
                });
                elemento.appendChild(boton);
                containerCatalogo.appendChild(elemento);
            });
        })
        .catch(error => console.log("Error", error));

    const btnCarrito = document.getElementById("btn-carrito");

    btnCarrito.addEventListener("click", () => {
        contenedorCarrito.classList.toggle("mostrar");//toggle sirve en este caso para poner la clase mostrar solo si el objeto no la tiene  y si la tiene la quita
        carrito.renderizarCarrito();
    });

    const inputBuscador = document.getElementById("buscador");//para implementar un buscador
    inputBuscador.addEventListener("input", () => {
        const texto = inputBuscador.value.toLowerCase();
        const productosHTML = document.querySelectorAll(".producto");
        productosHTML.forEach(card => {
            const nombre = card.querySelector("h3").textContent.toLowerCase();
            if (nombre.includes(texto)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    function verificarLogin() {
        const usuario = localStorage.getItem('usuario');
        const infoUsuario = document.getElementById('info-usuario');
        const nombreUsuario = document.getElementById('nombre-usuario');
        
        if (usuario) {
            const datosUsuario = JSON.parse(usuario);
            infoUsuario.style.display = 'block';
            nombreUsuario.textContent = datosUsuario.firstName;
        }
    }
    verificarLogin();
});


