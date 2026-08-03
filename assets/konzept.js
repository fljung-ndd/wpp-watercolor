/* Konzeptseite: nur was ein Lesedokument braucht.
 *
 * Bewusst nicht index_n.js: das bringt Storyleiste, Haltungsband und die
 * FAQ-Einblendung mit, die es hier alle nicht gibt - und es blendet die
 * Kopfzeile beim Scrollen aus, was auf einem so langen Dokument stört.
 */
(() => {
  const menuButton = document.querySelector('.n-menu-button');
  const navigation = document.querySelector('.n-navigation');

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation?.classList.toggle('is-open', !open);
  });
  navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  // Die Einblendanimation aus index_n.css würde ohne Beobachter dauerhaft
  // auf opacity:0 stehen bleiben.
  const reveals = [...document.querySelectorAll('.n-reveal')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    reveals.forEach(element => observer.observe(element));
  } else {
    reveals.forEach(element => element.classList.add('is-visible'));
  }
})();
