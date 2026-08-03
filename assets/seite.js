/* Unterseiten: Menü und Einblendungen.
 *
 * Bewusst nicht index_n.js: das bringt Storyleiste, Haltungsband und die
 * FAQ-Einblendung mit, die es auf den Unterseiten alle nicht gibt - und es
 * blendet die Kopfzeile beim Scrollen aus, was auf einer Leseseite stört.
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

  // Ohne Beobachter bliebe die Einblendanimation aus index_n.css auf
  // opacity:0 stehen.
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
