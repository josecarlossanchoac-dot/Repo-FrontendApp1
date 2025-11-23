async function cargarUsuario() {
    try {
        // Obtener el usuario guardado en localStorage del login
        const usuarioGuardado = localStorage.getItem('usuario');
        
        if (usuarioGuardado) {
            const usuario = JSON.parse(usuarioGuardado);
            
            // Actualizar el saludo en el header
            const saludoElement = document.querySelector('.header-right span');
            if (saludoElement) {
                saludoElement.innerHTML = `¡Hola <strong>${usuario.nombre}</strong>!`;
            }

            const profileIcon = document.getElementById('profileIcon');
            if (profileIcon && usuario.nombre) {
                const iniciales = usuario.nombre.charAt(0);
                profileIcon.textContent = iniciales.toUpperCase();
            }
        }
    } catch (error) {
        console.error('Error cargando datos del usuario:', error);
    }
}


cargarUsuario();