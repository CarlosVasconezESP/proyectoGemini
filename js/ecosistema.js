(() => {
    /* ========= Filtros (pestañas) ========= */
    const tabs  = document.querySelectorAll('.pill');
    const items = document.querySelectorAll('.eco-item');
  
    const setFilter = (tag) => {
      items.forEach(it => {
        it.style.display = (tag === 'all' || it.dataset.tag === tag) ? '' : 'none';
      });
    };
  
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setFilter(btn.dataset.filter);
      });
    });
  
    /* ========= Modal ========= */
    const modal = document.getElementById('demo-modal');
    const slot  = document.getElementById('demo-slot');
  
    const DEFAULT_DEMOS = {
      gemini: 'https://www.youtube-nocookie.com/embed/M7lc1UVf-VE',
      veo:    'https://www.youtube-nocookie.com/embed/tgbNymZ7vqY',
      imagen: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
    };
  
    const openModal = (html) => {
      slot.innerHTML = html || '<p style="padding:16px">Demo no disponible.</p>';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
  
    const closeModal = () => {
      slot.innerHTML = '';
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
  
    // Helpers para construir el <video> con listeners de depuración
    const buildVideoHTML = (mp4Url, webmUrl) => {
      const webm = webmUrl ? `<source src="${webmUrl}" type="video/webm">` : '';
      return `
        <video controls autoplay muted playsinline width="100%" height="420"
               preload="metadata" style="display:block; border-radius:12px; background:#000">
          ${mp4Url ? `<source src="${mp4Url}" type="video/mp4">` : ''}
          ${webm}
          Tu navegador no soporta video HTML5.
        </video>`;
    };
  
    const attachVideoDebug = () => {
      const v = slot.querySelector('video');
      if (!v) return;
      ['loadedmetadata','canplay','playing','pause','stalled','error','abort','emptied','suspend']
        .forEach(ev => v.addEventListener(ev, () => console.log('VIDEO EVENT:', ev, v.error)));
      // Mostrar mensaje si falla
      v.addEventListener('error', () => {
        const sources = [...v.querySelectorAll('source')].map(s => s.src).join(' | ');
        slot.insertAdjacentHTML('beforeend',
          `<div style="padding:12px;color:#fff;opacity:.85">
            No se pudo reproducir el video. Verifica la ruta o el códec.<br>
            <small>Probados: ${sources}</small>
          </div>`);
      });
    };
  
    // Abrir desde botones
    document.querySelectorAll('[data-demo]').forEach(btn => {
      btn.addEventListener('click', () => {
        const mp4Url  = btn.getAttribute('data-mp4');     // p.ej. ../videos/demo-h264.mp4
        const webmUrl = btn.getAttribute('data-webm');    // opcional ../videos/demo-vp9.webm
        const embedUrl = btn.getAttribute('data-embed');  // p.ej. https://.../embed/ID
        const key      = btn.getAttribute('data-demo');   // gemini|veo|imagen
  
        // 1) Si hay video local, prioridad absoluta
        if (mp4Url || webmUrl) {
          openModal(buildVideoHTML(mp4Url, webmUrl));
          attachVideoDebug();
          return;
        }
  
        // 2) Si hay embed (YouTube/Vimeo)
        const url = embedUrl || DEFAULT_DEMOS[key];
        if (url) {
          openModal(`
            <iframe width="100%" height="420"
              src="${url}"
              title="Demo" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen></iframe>
          `);
          return;
        }
  
        // 3) Sin nada
        openModal('<p style="padding:16px">Demo no disponible. Agrega <code>data-mp4</code> / <code>data-webm</code> o <code>data-embed</code>.</p>');
      });
    });
  
    // Cerrar (click en fondo o botón)
    modal.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close')) closeModal();
    });
  
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
      }
    });
  })();
  