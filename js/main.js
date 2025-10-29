// Cargar header
async function loadHeader() {
  const headerDiv = document.getElementById('header');
  if (headerDiv) {
    try {
      const response = await fetch('../components/header.html');
      const html = await response.text();
      headerDiv.innerHTML = html;
      initMenuToggle();
      setActiveNavLink();
    } catch (error) {
      console.error('Error cargando header:', error);
    }
  }
}

// Marcar el enlace activo según la página actual
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.site-nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Obtener el nombre del archivo de la URL actual
    const currentPage = currentPath.split('/').pop();
    
    // Verificar si es la página de inicio
    if (currentPage === '' || currentPage === 'index.html') {
      if (linkPath.includes('index.html')) {
        link.classList.add('active');
      }
    } 
    // Verificar otras páginas
    else if (linkPath.includes(currentPage)) {
      link.classList.add('active');
    }
  });
}

// Toggle menú móvil
function initMenuToggle() {
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      siteNav.classList.toggle('open');
    });
  }

  // Cerrar menú al hacer clic en enlace
  const navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle) {
        menuToggle.classList.remove('active');
        siteNav.classList.remove('open');
      }
    });
  });
}

// Cargar componentes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  initFlipCards(); // <- Mantiene tu funcionalidad adicional
});

// Inicializar flip cards con click
function initFlipCards() {
  const flipCards = document.querySelectorAll('.flip-card');
  
  // Solo ejecutar si existen flip cards en la página
  if (flipCards.length === 0) return;
  
  flipCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Evitar que el click en enlaces o botones internos active el flip
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        return;
      }
      
      const inner = this.querySelector('.flip-card-inner');
      if (inner) {
        inner.classList.toggle('flipped');
      }
    });
  });
}
