const formularioLogin = document.getElementById('formulario-login');
const mensajeError = document.getElementById('mensaje-error');
const infoDemo = document.querySelector('.info-demo');

// Cargar usuarios de la API al iniciar
async function cargarUsuariosDemo() {
    try {
        const respuesta = await fetch('https://dummyjson.com/users?limit=5');
        const datos = await respuesta.json();
        
        if (respuesta.ok) {
            mostrarUsuariosDemo(datos.users);
        }
    } catch (error) {
        console.error('Error cargando usuarios demo:', error);
        // Usuarios por defecto si falla la API
        infoDemo.innerHTML = `
            <strong>Usuarios de prueba:</strong><br>
            Usuario: <span>emilys</span> - Contraseña: <span>emilyspass</span><br>
            Usuario: <span>kminchelle</span> - Contraseña: <span>0lelplR</span>
        `;
    }
}

function mostrarUsuariosDemo(usuarios) {
    let html = '<strong>Usuarios de prueba:</strong><br>';
    
    usuarios.forEach(usuario => {
        html += `
            Usuario: <span>${usuario.username}</span> - 
            Contraseña: <span>${usuario.password}</span><br>
        `;
    });
    
    infoDemo.innerHTML = html;
}

// Llamar a la función cuando cargue la página
document.addEventListener('DOMContentLoaded', cargarUsuariosDemo);

// Si ya está logueado, redirigir directamente a index.html (tienda)
if (localStorage.getItem('usuario')) {
    window.location.href = 'index.html';
}

formularioLogin.addEventListener('submit', async function(evento) {
    evento.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
    
    // Mostrar loading en el botón
    const botonEnviar = formularioLogin.querySelector('button');
    const textoOriginal = botonEnviar.textContent;
    botonEnviar.textContent = 'Ingresando...';
    botonEnviar.disabled = true;
    
    try {
        const respuesta = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usuario,
                password: contrasena
            })
        });
        
        const datos = await respuesta.json();
        
        if (respuesta.ok) {
            localStorage.setItem('usuario', JSON.stringify(datos));
            window.location.href = 'index.html'; // Redirige a la tienda
        } else {
            throw new Error(datos.message || 'Error en el login');
        }
        
    } catch (error) {
        mensajeError.textContent = 'Usuario o contraseña incorrectos';
        mensajeError.style.display = 'block';
    } finally {
        botonEnviar.textContent = textoOriginal;
        botonEnviar.disabled = false;
    }
});




