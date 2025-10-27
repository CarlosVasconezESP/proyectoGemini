// Función para iniciar la app (solo para index.html)
function startApp() {
    window.location.href = './pages/introduccion.html';
}

// Toggle menú móvil
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const siteNav = document.getElementById('siteNav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            siteNav.classList.toggle('open');
        });
    }

    const navLinks = document.querySelectorAll('.site-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) {
                menuToggle.classList.remove('active');
                siteNav.classList.remove('open');
            }
        });
    });
});