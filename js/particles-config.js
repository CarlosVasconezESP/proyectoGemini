// Configuración de partículas con colores de Gemini
particlesJS('particles-js', {
    // ===== PARTÍCULAS =====
    particles: {
        // Cantidad de partículas
        number: { 
            value: 100,  // 100 partículas en pantalla
            density: {
                enable: true,
                value_area: 800  // Se ajusta según tamaño de pantalla
            }
        },
        
        // Colores azules de Gemini
        color: { 
            value: ['#2C6CBF', '#3574F2', '#3084F2', '#4BA4F2']
        },
        
        // Opacidad (transparencia)
        opacity: { 
            value: 0.6,  // 60% visible
            random: true,  // Algunas más visibles que otras
            anim: {
                enable: true,  // Se animan
                speed: 1,
                opacity_min: 0.1  // Mínimo 10% visible
            }
        },
        
        // Tamaño de las partículas
        size: { 
            value: 4,  // Tamaño base: 4px
            random: true,  // Tamaños variables
            anim: {
                enable: true,  // Crecen y encogen
                speed: 2
            }
        },
        
        // Líneas que conectan partículas cercanas
        line_linked: {
            enable: true,
            distance: 150,  // Se conectan si están a menos de 150px
            color: '#4BA4F2',  // Color de las líneas
            opacity: 0.3  // 30% visible
        },
        
        // Movimiento
        move: {
            enable: true,
            speed: 1.5,  // Velocidad lenta
            random: true  // Movimiento orgánico
        }
    },
    
    // ===== INTERACTIVIDAD CON EL MOUSE =====
    interactivity: {
        events: {
            // Al pasar el mouse: conecta partículas cercanas al cursor
            onhover: { 
                enable: true, 
                mode: 'grab'
            },
            // Al hacer clic: añade 4 partículas nuevas
            onclick: { 
                enable: true, 
                mode: 'push'
            }
        },
        modes: {
            // Configuración del efecto 'grab'
            grab: {
                distance: 200,  // Conecta partículas a 200px del cursor
                line_linked: {
                    opacity: 0.8  // Líneas más visibles al conectar
                }
            },
            // Configuración del efecto 'push' (clic)
            push: {
                particles_nb: 4  // Añade 4 partículas por clic
            }
        }
    }
});