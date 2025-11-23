(function() {
    const isLoginPage = window.location.pathname.includes('index.html') || 
                        window.location.pathname === '/' ||
                        window.location.pathname.endsWith('/');
    
    const usuario = localStorage.getItem('usuario');
    
    if (!usuario && !isLoginPage) {
        window.location.href = '/index.html';
    } else if (usuario && isLoginPage) {
        window.location.href = '/paginas/proyectos.html';
    }
})();

function cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = '/index.html';
}