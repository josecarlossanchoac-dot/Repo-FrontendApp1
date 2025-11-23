document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError'); // nuevo

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita recargar la página

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Limpiar mensaje anterior
        loginError.textContent = '';

        // Llamada a la API
        fetch('http://localhost:8080/api/usuarios/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Email o contraseña incorrectos');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login exitoso:', data);
            localStorage.setItem('usuario', JSON.stringify(data));
            window.location.href = 'paginas/proyectos.html';
        })
        .catch(error => {
            console.error('Error:', error);
            // Mostrar el mensaje en el párrafo en negro
            loginError.textContent = error.message;
            loginError.style.color = 'black'; // si quieres negro en vez de rojo
        });
    });
});
