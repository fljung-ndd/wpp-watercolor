/* Wissens-Slider auf der Startseite.
 *
 * Bewusst ohne Slider-Bibliothek: die Spur ist ein normaler Scroll-Container
 * mit scroll-snap. Touch, Trackpad, Mausrad und Tastatur funktionieren damit
 * ohne eigenes Zutun; die Pfeile sind nur eine Zugabe für die Maus. Fällt
 * JavaScript aus, bleibt die Spur scrollbar - nur die Pfeile fehlen.
 */
(() => {
  document.querySelectorAll('[data-rail]').forEach(rail => {
    const track = rail.querySelector('[data-rail-track]');
    const prev = rail.querySelector('[data-rail-prev]');
    const next = rail.querySelector('[data-rail-next]');
    if (!track || !prev || !next) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Eine Karte plus Abstand - aus dem Layout gelesen statt geraten.
    const step = () => {
      const [first, second] = track.children;
      if (first && second) return second.getBoundingClientRect().left - first.getBoundingClientRect().left;
      return first ? first.getBoundingClientRect().width + 18 : track.clientWidth;
    };

    const scrollByCards = direction => {
      track.scrollBy({
        left: direction * step(),
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
      });
    };

    const syncButtons = () => {
      // Toleranz, weil die Ruhelage nicht exakt 0 ist: das seitliche Padding der
      // Spur (Platz für den Kartenschatten) verschiebt die erste Rastposition um
      // ein paar Pixel, und das Maximum wird subpixelgenau nie ganz erreicht.
      const slack = 8;
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= slack;
      next.disabled = track.scrollLeft >= max - slack;
    };

    prev.addEventListener('click', () => scrollByCards(-1));
    next.addEventListener('click', () => scrollByCards(1));
    track.addEventListener('scroll', syncButtons, { passive: true });
    window.addEventListener('resize', syncButtons, { passive: true });
    syncButtons();
  });
})();
