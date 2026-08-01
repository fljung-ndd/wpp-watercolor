(() => {
  const dotStylesheet = document.createElement('link');
  dotStylesheet.rel = 'stylesheet';
  dotStylesheet.href = 'assets/index_n_dots.css';
  document.head.append(dotStylesheet);

  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.n-menu-button');
  const navigation = document.querySelector('.n-navigation');
  const horizontal = document.querySelector('[data-horizontal]');
  const horizontalTrack = document.querySelector('[data-horizontal-track]');
  const horizontalProgress = document.querySelector('[data-horizontal-progress]');
  const storyRail = document.querySelector('[data-story-rail]');
  const storyProgress = document.querySelector('[data-story-progress]');
  const storyCurrent = document.querySelector('[data-story-current]');
  const storySections = [...document.querySelectorAll('[data-story-step]')];
  const storyLinks = [...document.querySelectorAll('[data-story-link]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let previousY = window.scrollY;
  let pageTicking = false;

  const setHeroMood = () => {
    const hour = new Date().getHours();
    const mood = hour >= 6 && hour < 10
      ? 'morning'
      : hour >= 10 && hour < 18
        ? 'day'
        : hour >= 18 && hour < 21
          ? 'dusk'
          : 'night';
    document.documentElement.dataset.heroMood = mood;
  };

  const closeMenu = () => {
    if (!navigation || !menuButton) return;
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation?.classList.toggle('is-open', !open);
  });
  navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  const updateHeader = currentY => {
    if (!header) return;
    const movingUp = currentY < previousY - 4;
    const nearTop = currentY < 24;

    if (nearTop) {
      header.classList.remove('is-visible');
      closeMenu();
    } else if (movingUp) {
      header.classList.add('is-visible');
    } else if (currentY > previousY + 4) {
      header.classList.remove('is-visible');
      closeMenu();
    }
    previousY = currentY;
  };

  const updateHorizontal = () => {
    if (!horizontal || !horizontalTrack || reduceMotion.matches) {
      if (horizontalTrack) horizontalTrack.style.transform = '';
      if (horizontalProgress) horizontalProgress.style.transform = 'scaleX(0)';
      return;
    }
    const rect = horizontal.getBoundingClientRect();
    const distance = horizontal.offsetHeight - window.innerHeight;
    const value = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
    horizontalTrack.style.transform = `translate3d(${-value * 75}%, 0, 0)`;
    if (horizontalProgress) horizontalProgress.style.transform = `scaleX(${value})`;
  };

  const updateStory = currentY => {
    if (!storyRail || storySections.length === 0) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, currentY / maxScroll)) : 0;
    if (storyProgress) storyProgress.style.transform = `scaleY(${progress})`;

    const marker = window.innerHeight * 0.43;
    let active = storySections[0];
    storySections.forEach(section => {
      if (section.getBoundingClientRect().top <= marker) active = section;
    });

    const activeId = active.id;
    const activeLabel = active.dataset.storyLabel || '';
    storyLinks.forEach(link => {
      const current = link.dataset.storyLink === activeId;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (storyCurrent) storyCurrent.value = activeLabel;
  };

  const updatePage = () => {
    const currentY = window.scrollY;
    updateHeader(currentY);
    updateHorizontal();
    updateStory(currentY);
    pageTicking = false;
  };

  const requestPageUpdate = () => {
    if (!pageTicking) {
      pageTicking = true;
      requestAnimationFrame(updatePage);
    }
  };

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  document.querySelectorAll('.n-reveal').forEach(element => {
    if (revealObserver) revealObserver.observe(element);
    else element.classList.add('is-visible');
  });

  setHeroMood();
  window.addEventListener('scroll', requestPageUpdate, { passive: true });
  window.addEventListener('resize', requestPageUpdate, { passive: true });
  reduceMotion.addEventListener?.('change', requestPageUpdate);
  requestPageUpdate();
})();
