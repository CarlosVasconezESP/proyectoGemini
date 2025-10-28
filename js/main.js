// Cargar header
async function loadHeader() {
  const headerDiv = document.getElementById('header');
  if (headerDiv) {
    try {
      const response = await fetch('../components/header.html');
      const html = await response.text();
      headerDiv.innerHTML = html;
      initMenuToggle();
    } catch (error) {
      console.error('Error cargando header:', error);
    }
  }
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
  initFlipCards();
});

// Inicializar flip cards con click
function initFlipCards() {
  const flipCards = document.querySelectorAll('.flip-card');
  
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