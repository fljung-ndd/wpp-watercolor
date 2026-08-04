/* Startseite: finale Dramaturgie und Interaktionen.
 *
 * Die bestehende HTML-Fassung bleibt die inhaltliche Basis. Dieses Skript
 * ordnet die Kapitel so, dass zuerst Wiedererkennen, Wendepunkt und das
 * horizontale Haltungserlebnis kommen. Danach folgen Waldtiere und konkrete
 * Situationen; die fachliche Einordnung schließt sich erst anschließend an.
 */
(() => {
  const addStylesheet = href => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.append(link);
  };
  addStylesheet('assets/index_wk_final.css');

  const byId = id => document.getElementById(id);
  const main = document.querySelector('main');
  if (!main) return;

  document.querySelector('.n-hero__soft')?.remove();
  const heroActions = document.querySelector('.n-hero .n-actions');
  if (heroActions && !document.querySelector('.n-hero__signature')) {
    heroActions.insertAdjacentHTML(
      'beforebegin',
      '<p class="n-hero__signature">wild sein dürfen / und verbunden bleiben <span aria-hidden="true">♡</span></p>'
    );
  }

  const trust = byId('vertrauen');
  trust?.removeAttribute('data-story-step');
  trust?.removeAttribute('data-story-label');
  const trustItems = trust ? [...trust.querySelectorAll('li')] : [];
  const podcastTrust = trustItems.find(item => /Podcast/i.test(item.textContent));
  if (podcastTrust) podcastTrust.querySelector('span').textContent = 'Online & vor Ort';

  const story = document.querySelector('.n-story');
  let pivot = byId('wendepunkt');
  if (story && !pivot) {
    pivot = document.createElement('section');
    pivot.id = 'wendepunkt';
    pivot.className = 'n-section n-pivot';
    pivot.dataset.storyStep = '';
    pivot.dataset.storyLabel = 'Wendepunkt';
    pivot.innerHTML = `
      <div class="n-shell n-pivot__inner">
        <p class="n-pivot__main">Vielleicht ist niemand falsch.<br>Vielleicht ist nur zu viel gleichzeitig.</p>
        <p class="n-pivot__sub">Dann hilft es nicht, schneller zu urteilen.<br>Dann müssen wir genauer hinschauen.</p>
      </div>`;
    story.after(pivot);
  }

  const horizontal = byId('haltung');
  const animals = byId('waldtiere');
  const situations = byId('situationen-aus-dem-wald');
  if (pivot && horizontal) {
    pivot.after(horizontal);
    if (animals) horizontal.after(animals);
    if (animals && situations) animals.after(situations);
  }

  const about = byId('ueber-mich');
  if (about) {
    const alias = document.createElement('span');
    alias.id = 'ueber-mich';
    alias.className = 'n-anchor-alias';
    alias.setAttribute('aria-hidden', 'true');
    about.before(alias);
    about.id = 'warum-waldkaetzchen';
    about.dataset.storyStep = '';
    about.dataset.storyLabel = 'Warum Waldkätzchen';
  }
  const portrait = byId('begegnung');
  portrait?.removeAttribute('data-story-step');
  portrait?.removeAttribute('data-story-label');

  document.querySelectorAll('a[href="#ueber-mich"]').forEach(link => {
    link.setAttribute('href', '#warum-waldkaetzchen');
  });

  const animalIntro = animals?.querySelector('.n-section-heading p:last-child');
  if (animalIntro) {
    animalIntro.textContent = 'Die Waldtiere sind keine perfekten Vorbilder. Sie sind Figuren mit Eigenheiten, Widersprüchen und eigenen Geschichten. Sie geben Situationen eine Gestalt, ohne Menschen festzulegen.';
  }

  const replacePlaceholder = (article, src, alt) => {
    const holder = article?.querySelector('.n-rail-card__art--placeholder');
    if (!holder) return;
    holder.classList.remove('n-rail-card__art--placeholder');
    holder.innerHTML = `<img src="${src}" alt="${alt}" width="512" height="512" loading="lazy">`;
  };
  const animalCards = animals ? [...animals.querySelectorAll('.n-rail-card')] : [];
  replacePlaceholder(animalCards.find(card => /Luis/.test(card.textContent)), 'assets/chars/13_ueberforderung.webp', 'Symbolbild für Luis und Überforderung');
  replacePlaceholder(animalCards.find(card => /Niko/.test(card.textContent)), 'assets/chars/18_katze_kompass.webp', 'Symbolbild für Niko und Selbstbestimmung');
  replacePlaceholder(animalCards.find(card => /Iella/.test(card.textContent)), 'assets/chars/17_katze_pinguin_umarmung.webp', 'Symbolbild für Iella und sichere Verbindung');

  const luisSituationArt = situations?.querySelector('.n-situation__art');
  if (luisSituationArt) {
    luisSituationArt.innerHTML = '<img src="assets/chars/13_ueberforderung.webp" alt="Symbolbild für Luis und Überforderung" width="512" height="512" loading="lazy">';
  }

  const compactSituations = situations ? [...situations.querySelectorAll('.n-situation-compact')] : [];
  const autonomySituation = compactSituations.find(item => /Iella sagt Nein/.test(item.textContent));
  if (autonomySituation) {
    autonomySituation.querySelector('summary strong').textContent = 'Niko sagt Nein – und alle hören nur Widerstand.';
    autonomySituation.innerHTML = autonomySituation.innerHTML.replaceAll('Iella', 'Niko');
  }

  const offer = byId('angebot');
  if (offer) {
    const eyebrow = offer.querySelector('.n-section-heading .n-eyebrow');
    const title = offer.querySelector('.n-section-heading h2');
    if (eyebrow) eyebrow.textContent = 'Für wen ich da bin';
    if (title) title.textContent = 'Vier Einstiege – je nachdem, wer gerade Unterstützung sucht.';
  }
  const audienceBlock = document.querySelector('.n-domain-audience .n-audience');
  const domainAudience = document.querySelector('.n-domain-audience');
  audienceBlock?.remove();
  domainAudience?.classList.add('n-domain-audience--single');

  const podcast = byId('podcast');
  if (podcast) {
    podcast.removeAttribute('data-story-step');
    podcast.removeAttribute('data-story-label');
    const copy = podcast.querySelector('.n-podcast-teaser__inner > div > p:last-child');
    const badge = podcast.querySelector('.n-podcast-teaser__badge');
    if (copy) copy.textContent = 'Geschichten und fachliche Einordnungen für Situationen, in denen schnelle Tipps zu kurz greifen. Der Waldkätzchen-Podcast ist in Vorbereitung.';
    if (badge) {
      badge.textContent = '🎙 Podcast in Vorbereitung';
      badge.setAttribute('aria-label', 'Ankündigung: Podcast ist in Vorbereitung und noch nicht verfügbar');
    }
  }

  const closingSignoff = document.querySelector('.wk-abschluss__signoff');
  if (closingSignoff) closingSignoff.innerHTML = 'wild sein dürfen / und verbunden bleiben <span aria-hidden="true">♡</span>';
  const principle = byId('grundsatz');
  if (principle && !principle.querySelector('.n-principle__signature')) {
    principle.querySelector('.n-two-columns > div:first-child')?.insertAdjacentHTML(
      'beforeend',
      '<p class="n-principle__signature">wild sein dürfen / und verbunden bleiben <span aria-hidden="true">♡</span></p>'
    );
  }

  const storyNav = document.querySelector('.n-story-rail nav');
  const storyEntries = [
    ['start', 'Ankommen'],
    ['erkennen', 'Wiedererkennen'],
    ['wendepunkt', 'Wendepunkt'],
    ['haltung', 'Haltung'],
    ['waldtiere', 'Waldtiere'],
    ['situationen-aus-dem-wald', 'Situationen'],
    ['anders', 'Anders schauen'],
    ['weg', 'Der Weg'],
    ['grundsatz', 'Grundsatz'],
    ['logik', 'Von außen nach innen'],
    ['fundament', 'Fundament'],
    ['warum-waldkaetzchen', 'Warum Waldkätzchen'],
    ['angebot', 'Angebot'],
    ['fragen', 'Fragen'],
    ['wissen', 'Wissen'],
    ['kontakt', 'Kontakt'],
  ].filter(([id]) => byId(id));

  if (storyNav) {
    storyNav.innerHTML = storyEntries.map(([id, label]) =>
      `<a href="#${id}" data-story-link="${id}"><i></i><span>${label}</span></a>`
    ).join('');
  }

  const storyRail = document.querySelector('[data-story-rail]');
  const storyProgress = document.querySelector('[data-story-progress]');
  const storyCurrent = document.querySelector('[data-story-current]');
  const syncStory = () => {
    if (!storyRail || storyEntries.length === 0) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    if (storyProgress) storyProgress.style.transform = `scaleY(${progress})`;

    const marker = window.innerHeight * 0.43;
    let activeId = storyEntries[0][0];
    let activeLabel = storyEntries[0][1];
    storyEntries.forEach(([id, label]) => {
      const section = byId(id);
      if (section && section.getBoundingClientRect().top <= marker) {
        activeId = id;
        activeLabel = label;
      }
    });
    storyNav?.querySelectorAll('[data-story-link]').forEach(link => {
      const current = link.dataset.storyLink === activeId;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (storyCurrent) storyCurrent.value = activeLabel;
  };
  window.addEventListener('scroll', syncStory, { passive: true });
  window.addEventListener('resize', syncStory, { passive: true });
  requestAnimationFrame(syncStory);

  document.querySelectorAll('[data-rail]').forEach(rail => {
    const track = rail.querySelector('[data-rail-track]');
    const prev = rail.querySelector('[data-rail-prev]');
    const next = rail.querySelector('[data-rail-next]');
    if (!track || !prev || !next) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const step = () => {
      const [first, second] = track.children;
      if (first && second) return second.getBoundingClientRect().left - first.getBoundingClientRect().left;
      return first ? first.getBoundingClientRect().width + 18 : track.clientWidth;
    };
    const scrollByCards = direction => track.scrollBy({
      left: direction * step(),
      behavior: reduceMotion.matches ? 'auto' : 'smooth',
    });
    const syncButtons = () => {
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
