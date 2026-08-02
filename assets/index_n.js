(() => {
  ['assets/index_n_dots.css', 'assets/index_n_dividers.css'].forEach(href => {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = href;
    document.head.append(stylesheet);
  });

  const knowledgeSection = document.querySelector('#wissen');
  if (knowledgeSection && !document.querySelector('#fragen')) {
    knowledgeSection.insertAdjacentHTML('beforebegin', `
      <section class="n-section n-faq" id="fragen" data-story-step data-story-label="Fragen">
        <div class="n-shell n-faq__grid">
          <div class="n-faq__intro n-reveal">
            <p class="n-eyebrow n-eyebrow--petrol">Vielleicht fragst du dich</p>
            <h2>Häufige Fragen</h2>
            <p>Du musst vor einer Anfrage noch nicht alles sortiert haben. Diese Antworten geben dir eine erste Orientierung.</p>
            <img src="assets/chars/16_pinguin_sprechblase.webp" alt="" width="512" height="512" loading="lazy">
          </div>
          <div class="n-faq__list n-reveal">
            <details>
              <summary>Für wen ist das hier geeignet?</summary>
              <p>Für Familien, Väter, Kinder und Jugendliche – und für Fachkräfte in Kitas, Schulen und Teams. Immer dann, wenn Verhalten, Beziehungen und Anforderungen so ineinandergreifen, dass einfache Lösungen nicht mehr passen.</p>
            </details>
            <details>
              <summary>Und wofür bin ich nicht die richtige Adresse?</summary>
              <p>Ich mache keine Diagnostik, keine Psychotherapie und keine akute Krisenintervention. Wenn es unmittelbar um Sicherheit geht, gehört das in andere Hände – und ich sage das offen, statt etwas zu übernehmen, das einen anderen Rahmen braucht.</p>
            </details>
            <details>
              <summary>Online oder vor Ort?</summary>
              <p>Beides. Vieles lässt sich online erstaunlich nah und konkret bearbeiten. Für die direkte Arbeit mit Kindern, Teamtage und bestimmte gemeinsame Situationen komme ich auch vor Ort.</p>
            </details>
            <details>
              <summary>Muss mein Kind mitkommen?</summary>
              <p>Nein. Oft beginnen wir allein mit den Eltern oder einer beteiligten Fachperson. Wer wann dazukommt, entscheiden wir gemeinsam – nicht nach einem festen Schema.</p>
            </details>
            <details>
              <summary>Wie schnell kann es losgehen?</summary>
              <p>Ich antworte in der Regel innerhalb von 24 bis 48 Stunden. Einen Termin für ein erstes Gespräch finden wir meistens innerhalb von ein bis zwei Wochen.</p>
            </details>
          </div>
        </div>
      </section>
    `);
  }

  const knowledgeStoryLink = document.querySelector('[data-story-link="wissen"]');
  if (knowledgeStoryLink && !document.querySelector('[data-story-link="fragen"]')) {
    knowledgeStoryLink.insertAdjacentHTML(
      'beforebegin',
      '<a href="#fragen" data-story-link="fragen"><i></i><span>Fragen</span></a>'
    );
  }

  const faqItems = [...document.querySelectorAll('.n-faq details')];
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach(other => {
        if (other !== item) other.open = false;
      });
    });
  });

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
