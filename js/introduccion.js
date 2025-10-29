/* ========================================
   JAVASCRIPT PARA PÁGINA DE INTRODUCCIÓN
   ======================================== */

// Inicializar las tarjetas expandibles del timeline
function initTimelineExpand() {
  const expandableCards = document.querySelectorAll('.expandable-card');
  
  expandableCards.forEach(card => {
    // Crear un elemento wrapper para el contenido clickeable
    const clickableArea = document.createElement('div');
    clickableArea.style.cursor = 'pointer';
    
    // Obtener los elementos principales (excepto subtimeline-container)
    const year = card.querySelector('.timeline-year');
    const title = card.querySelector('.card-title');
    const description = card.querySelector('.card-description');
    const subtimelineContainer = card.querySelector('.subtimeline-container');
    
    // Agregar evento de click directo a estos elementos
    const elements = [year, title, description];
    
    elements.forEach(element => {
      if (element) {
        element.style.cursor = 'pointer';
        element.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          
          // Solo toggle esta tarjeta específica
          card.classList.toggle('expanded');
          
          return false;
        });
      }
    });
    
    // Prevenir que clicks en subtarjetas propaguen
    if (subtimelineContainer) {
      subtimelineContainer.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });
}

// ========================================
// CARRUSEL DE IMPACTO TECNOLÓGICO
// ========================================
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelectorAll('.indicator');
  
  if (!slides.length) return; // Salir si no hay slides
  
  let currentSlide = 0;
  let autoplayInterval;
  
  // Función para mostrar un slide específico
  function showSlide(index) {
    // Asegurar que el índice esté en rango
    if (index < 0) {
      currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    
    // Remover clase active de todos los slides e indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Agregar clase active al slide e indicator actual
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }
  
  // Función para ir al siguiente slide
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  // Función para ir al slide anterior
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  // Event listeners para los botones
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }
  
  // Event listeners para los indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      resetAutoplay();
    });
  });
  
  // Autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  // Pausar autoplay cuando el mouse está sobre el carrusel
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
  }
  
  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    }
  });
  
  // Iniciar autoplay
  startAutoplay();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initTimelineExpand();
  initCarousel();
});
