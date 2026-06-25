/* ============================================================
   NOSOTROS – ROTADOR DE IMÁGENES (Construcciones)
   Crossfade entre imágenes de img/Contrucciones/
   - Reutiliza la <img> del HTML como primera imagen (sin parpadeo)
   - Precarga el resto y rota con crossfade cada 4 s
   ============================================================ */

const IMAGES = [
  'img/Contrucciones/75fdb01c-ea7a-4b5a-ba3c-2400b45ccff7_670.jpg',
  'img/Contrucciones/Armas-Constantino_Fachada_Noche_v00_10-copia-e1709816207432.jpg',
  'img/Contrucciones/abtao 24.jpg',
  'img/Contrucciones/agustin del castillo.jpg',
  'img/Contrucciones/cocalan.jpg',
  'img/Contrucciones/situ.jpg',
];

const ROTATE_INTERVAL_MS = 2500;
const FADE_MS = 250;

export function initNosotrosRotator() {
  const container = document.querySelector('.nosotros-image');
  if (!container || IMAGES.length === 0) return;

  // Evitar duplicar si se reinicializa
  if (container.dataset.rotatorReady === 'true') return;
  container.dataset.rotatorReady = 'true';

  // Tomar la <img> existente como "imgA" (sin parpadeo inicial)
  const imgA = container.querySelector('img');
  if (!imgA) return;
  imgA.classList.add('nosotros-rotator-img');
  imgA.style.opacity = '1';

  // Crear segunda <img> para el crossfade
  const imgB = document.createElement('img');
  imgB.classList.add('nosotros-rotator-img');
  imgB.alt = imgA.alt || 'edificio';
  imgB.style.opacity = '0';
  container.appendChild(imgB);

  // Determinar índice inicial comparando el src del HTML con nuestra lista
  let index = IMAGES.findIndex((src) => imgA.getAttribute('src') === src);
  if (index < 0) index = 0;
  let showingA = true;

  // Precargar todas las imágenes (excepto la actual, que ya está visible)
  const preloaded = IMAGES.map((src) => {
    if (src === imgA.getAttribute('src')) return null;
    const i = new Image();
    i.src = src;
    return i;
  });

  setInterval(() => {
    index = (index + 1) % IMAGES.length;

    const incoming = showingA ? imgB : imgA;
    const outgoing = showingA ? imgA : imgB;

    incoming.src = IMAGES[index];
    // Forzar reflow antes de cambiar opacidad para que la transición arranque
    void incoming.offsetWidth;

    incoming.style.opacity = '1';
    outgoing.style.opacity = '0';

    showingA = !showingA;
  }, ROTATE_INTERVAL_MS);

  // Silenciar warning de import no usado (FADE_MS queda para referencia / tuning)
  void FADE_MS;
  void preloaded;
}
