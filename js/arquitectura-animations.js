// ========================================
// ANIMACIONES INTERACTIVAS ARQUITECTURA
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Dibujar conexiones de la red neuronal
  drawNeuralConnections();

  // Animaciones de scroll
  initScrollAnimations();

  // Interactividad de tarjetas modales
  initModalityCards();

  // Actualizar conexiones al redimensionar
  window.addEventListener('resize', drawNeuralConnections);
});

// ===== DIBUJAR CONEXIONES ENTRE NEURONAS =====
function drawNeuralConnections() {
  const svg = document.querySelector('.connections');
  if (!svg) return;

  // Limpiar conexiones anteriores
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }

  const layers = document.querySelectorAll('.network-layer');
  if (layers.length < 2) return;

  // Conectar cada capa con la siguiente
  for (let i = 0; i < layers.length - 1; i++) {
    const currentLayer = layers[i];
    const nextLayer = layers[i + 1];
    
    const currentNeurons = currentLayer.querySelectorAll('.neuron');
    const nextNeurons = nextLayer.querySelectorAll('.neuron');

    currentNeurons.forEach((neuron1, idx1) => {
      nextNeurons.forEach((neuron2, idx2) => {
        const line = createConnection(neuron1, neuron2, idx1, idx2);
        if (line) svg.appendChild(line);
      });
    });
  }
}

function createConnection(neuron1, neuron2, idx1, idx2) {
  const rect1 = neuron1.getBoundingClientRect();
  const rect2 = neuron2.getBoundingClientRect();
  const svgRect = document.querySelector('.neural-network').getBoundingClientRect();

  const x1 = rect1.left + rect1.width / 2 - svgRect.left;
  const y1 = rect1.top + rect1.height / 2 - svgRect.top;
  const x2 = rect2.left + rect2.width / 2 - svgRect.left;
  const y2 = rect2.top + rect2.height / 2 - svgRect.top;

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', 'url(#lineGradient)');
  line.setAttribute('stroke-width', '1');
  line.style.opacity = '0';
  
  // Animación de aparición escalonada
  const delay = (idx1 + idx2) * 100;
  setTimeout(() => {
    line.style.transition = 'opacity 0.8s ease';
    line.style.opacity = '0.4';
  }, delay);

  return line;
}

// ===== ANIMACIONES AL HACER SCROLL =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Activar animaciones específicas
        if (entry.target.classList.contains('enhanced-card')) {
          animateCard(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observar todas las tarjetas mejoradas
  document.querySelectorAll('.enhanced-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });

  // Observar secciones especiales
  document.querySelectorAll('.comparison-section, .multimodal-section').forEach(section => {
    observer.observe(section);
  });
}

function animateCard(card) {
  card.style.transition = 'all 0.8s ease';
  card.style.opacity = '1';
  card.style.transform = 'translateY(0)';
}

// ===== INTERACTIVIDAD TARJETAS MODALIDAD =====
function initModalityCards() {
  const modalityCards = document.querySelectorAll('.modality-card');
  const fusionCore = document.querySelector('.fusion-core');

  modalityCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      // Destacar tarjeta
      card.style.zIndex = '10';
      
      // Pulso en el núcleo de fusión
      if (fusionCore) {
        fusionCore.style.transform = 'scale(1.1)';
        fusionCore.style.transition = 'transform 0.3s ease';
      }

      // Efecto de conexión visual
      createConnectionPulse(card, fusionCore);
    });

    card.addEventListener('mouseleave', () => {
      card.style.zIndex = '1';
      
      if (fusionCore) {
        fusionCore.style.transform = 'scale(1)';
      }
    });

    // Animación de entrada escalonada
    setTimeout(() => {
      card.style.animation = 'cardSlideIn 0.6s ease-out forwards';
    }, index * 100);
  });
}

// Crear pulso de conexión visual
function createConnectionPulse(card, target) {
  if (!target) return;

  const pulse = document.createElement('div');
  pulse.className = 'connection-pulse';
  
  const cardRect = card.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  
  const startX = cardRect.left + cardRect.width / 2;
  const startY = cardRect.top + cardRect.height / 2;
  const endX = targetRect.left + targetRect.width / 2;
  const endY = targetRect.top + targetRect.height / 2;

  pulse.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 20px var(--accent);
    left: ${startX}px;
    top: ${startY}px;
    pointer-events: none;
    z-index: 1000;
    animation: pulseFly 0.8s ease-out forwards;
  `;

  document.body.appendChild(pulse);

  // Eliminar después de la animación
  setTimeout(() => pulse.remove(), 800);
}

// Añadir estilos dinámicos para animaciones
const style = document.createElement('style');
style.textContent = `
  @keyframes cardSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes pulseFly {
    to {
      transform: translate(
        calc(var(--target-x, 50vw) - 50vw),
        calc(var(--target-y, 50vh) - 50vh)
      );
      opacity: 0;
    }
  }

  .enhanced-card.visible {
    animation: cardReveal 0.8s ease-out forwards;
  }

  @keyframes cardReveal {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ===== EFECTO PARALLAX SUAVE =====
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      applyParallax();
      ticking = false;
    });
    ticking = true;
  }
});

function applyParallax() {
  const scrolled = window.pageYOffset;
  
  // Parallax en el hero
  const hero = document.querySelector('.architecture-hero');
  if (hero) {
    const heroTop = hero.offsetTop;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled > heroTop - window.innerHeight && scrolled < heroTop + heroHeight) {
      const speed = (scrolled - heroTop + window.innerHeight) * 0.05;
      hero.style.transform = `translateY(${speed}px)`;
    }
  }

  // Parallax en neuronas
  const neurons = document.querySelectorAll('.neuron');
  neurons.forEach((neuron, index) => {
    const speed = 0.02 + (index * 0.005);
    neuron.style.transform = `translateY(${scrolled * speed}px)`;
  });
}

// ===== CONTADOR ANIMADO PARA MÉTRICAS =====
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Observar medidores para animar cuando sean visibles
const meterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.meter-fill');
      if (fill && !fill.classList.contains('animated')) {
        fill.classList.add('animated');
        fill.style.animation = 'fillMeter 2s ease-out forwards';
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.meter').forEach(meter => {
  meterObserver.observe(meter);
});

// ===== EFECTO HOVER AVANZADO EN NODOS DE ESCALABILIDAD =====
document.querySelectorAll('.scale-node').forEach(node => {
  node.addEventListener('mouseenter', function() {
    // Crear efecto de onda
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: 12px;
      border: 2px solid var(--primary);
      animation: rippleOut 1s ease-out;
      pointer-events: none;
    `;
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
  });
});

const modalityCards = document.querySelectorAll('.modality-card');
const hoverGif = document.getElementById('hover-gif');

const gifs = {
  text: { src: '../assets/gifs/text-modal.gif', text: 'Gemini procesa texto de manera multimodal...' },
  image: { src: '../assets/gifs/image-modal.gif', text: 'Gemini interpreta contenido visual con precisión.' },
  audio: { src: '../assets/gifs/audio-modal.gif', text: 'Reconoce y analiza audio de forma contextual.' },
  video: { src: '../assets/gifs/video-modal.gif', text: 'Comprende escenas y secuencias en movimiento.' },
  code: { src: '../assets/gifs/code-modal.gif', text: 'Analiza, depura y genera código en múltiples lenguajes.' }
};

modalityCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const key = card.dataset.modality;
    hoverGif.querySelector('img').src = gifs[key].src;
    hoverGif.querySelector('p').textContent = gifs[key].text;
    hoverGif.style.opacity = 1;
  });

  card.addEventListener('mouseleave', () => {
    hoverGif.style.opacity = 0;
  });
});

// Añadir animación de onda
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleOut {
    from {
      transform: scale(1);
      opacity: 1;
    }
    to {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

console.log('🚀 Animaciones de Arquitectura Gemini cargadas correctamente');