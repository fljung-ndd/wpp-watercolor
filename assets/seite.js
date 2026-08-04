/* Unterseiten: Menü, Einblendungen und einheitliche Startseitenlinks. */
(() => {
  const menuButton = document.querySelector('.n-menu-button');
  const navigation = document.querySelector('.n-navigation');

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const match = href.match(/^(?:\.\/)?(?:index_ws|index_wk|index)\.html(.*)$/i);
    if (match) link.setAttribute('href', `./${match[1] || ''}`);
  });

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation?.classList.toggle('is-open', !open);
  });
  navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

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
