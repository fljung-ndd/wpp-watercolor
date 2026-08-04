/* Startseite: finale Dramaturgie, mobile Entlastung und Interaktionen. */
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
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!main) return;

  /* ----------------------------------------------------------------------
   * Hero: weniger Aussagen gleichzeitig, dafür eine wechselnde zweite Zeile.
   * Die wechselnde Zeile ist für Screenreader verborgen; die statische
   * Kernaussage bleibt als visuell versteckter Text erhalten.
   * ---------------------------------------------------------------------- */
  const heroContent = document.querySelector('.n-hero__content');
  if (heroContent) {
    heroContent.innerHTML = `
      <p class="n-hero__brandline">Waldkätzchen <span>· Torsten Macht</span></p>
      <h1 id="hero-title">
        Verstehen statt bewerten.<br>
        <span class="n-hero__cycling" id="hero-cycling" aria-hidden="true">Verbindung statt Druck.</span>
        <span class="n-visually-hidden">Verbindung statt Druck.</span>
      </h1>
      <p class="n-hero__lead n-hero__lead--short">Heilpädagogisch-systemische Begleitung für Familien, Väter und Fachkräfte.</p>
      <p class="n-hero__signature">wild sein dürfen / und verbunden bleiben <span aria-hidden="true">♡</span></p>
      <div class="n-actions">
        <a class="n-button n-button--pink" href="#kontakt">Erst einmal erzählen <span aria-hidden="true">♡</span></a>
        <a class="n-button n-button--petrol" href="#erkennen">Wie Waldkätzchen schaut <span aria-hidden="true">↓</span></a>
      </div>`;

    const cycling = byId('hero-cycling');
    const phrases = [
      'Verbindung statt Druck.',
      'Mitgefühl statt Urteilen.',
      'Sicherheit statt Strenge.',
      'Verstehen statt Kämpfen.',
    ];
    let phraseIndex = 0;
    if (cycling && !reduceMotion.matches) {
      window.setInterval(() => {
        cycling.classList.add('is-changing');
        window.setTimeout(() => {
          phraseIndex = (phraseIndex + 1) % phrases.length;
          cycling.textContent = phrases[phraseIndex];
          cycling.classList.remove('is-changing');
        }, 360);
      }, 4300);
    }
  }

  /* Vertrauensband: vier belastbare Aussagen, keine horizontale Laufleiste. */
  const trust = byId('vertrauen');
  trust?.removeAttribute('data-story-step');
  trust?.removeAttribute('data-story-label');
  const trustList = trust?.querySelector('.n-trust-band__list');
  if (trustList) {
    trustList.innerHTML = `
      <li><img class="n-trust-band__icon" src="assets/icons/01_lupe_blatt.webp" alt="" width="96" height="96" loading="lazy"><span>Heilpädagogisch fundiert</span></li>
      <li><img class="n-trust-band__icon" src="assets/icons/03_herz.webp" alt="" width="96" height="96" loading="lazy"><span>Beziehungsorientiert</span></li>
      <li><img class="n-trust-band__icon" src="assets/icons/13_kita_haus.webp" alt="" width="96" height="96" loading="lazy"><span>Online &amp; vor Ort</span></li>
      <li><img class="n-trust-band__icon" src="assets/icons/handshake.webp" alt="" width="96" height="96" loading="lazy"><span>Kostenfreies Erstgespräch</span></li>`;
  }

  /* Großer Wendepunkt direkt vor dem Haltungserlebnis. */
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

  /* Sidescroller bleibt auf großen Bildschirmen, wird aber inhaltlich zum
   Teaser. Auf Mobilgeräten stapelt das CSS die vier kurzen Panels vertikal. */
  const panels = horizontal ? [...horizontal.querySelectorAll('.n-horizontal-panel')] : [];
  if (panels[0]) {
    const lead = panels[0].querySelector('.n-horizontal-panel__copy > p:not(.n-eyebrow):not(.n-panel-quote):not(.n-panel-more)');
    if (lead) lead.textContent = 'Wir halten drei Dinge gleichzeitig im Blick – keines darf allein regieren.';
    const triadCopy = [
      ['Beziehung', 'Verbindung und Reparatur.'],
      ['Selbstbestimmung', 'Einfluss, Nein-Räume und Würde.'],
      ['Ko-Regulation', 'Ruhe leihen und gemeinsam wieder handlungsfähig werden.'],
    ];
    panels[0].querySelectorAll('.n-triad article').forEach((item, index) => {
      const [title, text] = triadCopy[index] || [];
      if (title) item.querySelector('strong').textContent = title;
      if (text) item.querySelector('p').textContent = text;
    });
  }

  if (panels[1]) {
    const lead = panels[1].querySelector('.n-horizontal-panel__copy > p:not(.n-eyebrow):not(.n-panel-more)');
    if (lead) lead.textContent = 'Vier Orte reichen hier als Einstieg. Sie zeigen Schutz, Unklarheit, alte Stimmen und einen gemeinsamen Ausgangspunkt.';
    const symbols = panels[1].querySelector('.n-forest-symbols');
    const keep = ['Lichtung', 'Höhle', 'Echos', 'Nebel'];
    symbols?.querySelectorAll(':scope > span').forEach(item => {
      if (!keep.some(label => item.textContent.trim().startsWith(label))) item.remove();
    });
    if (symbols && !panels[1].querySelector('.n-panel-more')) {
      symbols.insertAdjacentHTML('afterend', '<p class="n-panel-more"><a class="n-text-link n-text-link--light" href="./Konzept.dc.html#orte">Alle acht Waldorte entdecken <span aria-hidden="true">→</span></a></p>');
    }
  }

  if (panels[2]) {
    const lead = panels[2].querySelector('.n-horizontal-panel__copy > p:not(.n-eyebrow):not(.n-panel-more)');
    if (lead) lead.textContent = 'Erst beobachten, dann spüren, vermuten und das Umfeld sehen. Die Macherin kommt bewusst zuletzt.';
    const perspectives = panels[2].querySelector('.n-cat-perspectives');
    if (perspectives && !panels[2].querySelector('.n-panel-more')) {
      perspectives.insertAdjacentHTML('afterend', '<p class="n-panel-more"><a class="n-text-link n-text-link--dark" href="./Konzept.dc.html#blicke">Die fünf Blicke im Detail <span aria-hidden="true">→</span></a></p>');
    }
  }

  if (panels[3]) {
    const toyCopy = panels[3].querySelector('.n-why-toys > div');
    if (toyCopy) {
      toyCopy.innerHTML = `
        <p>Ein Kind sitzt schweigend in der Ecke. Tigi kommt zuerst. Er stupst an, bleibt – und nimmt der Situation den direkten Druck.</p>
        <p>Über die Figur kann etwas gesagt werden, ohne dass sofort über das Kind gesprochen werden muss.</p>
        <p class="n-panel-quote n-panel-quote--dark">Tigi kam zuerst. Ich kam danach.</p>`;
    }
    panels[3].querySelector('.n-animal-strip')?.remove();
  }

  /* Persönliche Verankerung: Name im Hero und klar im Über-mich-Abschnitt. */
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

    const aboutHeading = about.querySelector('.n-about__grid > div:last-child h2');
    if (aboutHeading && !about.querySelector('.n-about__name')) {
      aboutHeading.insertAdjacentHTML(
        'beforebegin',
        '<p class="n-about__name"><strong>Ich bin Torsten Macht.</strong> Heilpädagoge, IT-ler und Familienmensch.</p>'
      );
    }
  }
  const portrait = byId('begegnung');
  portrait?.removeAttribute('data-story-step');
  portrait?.removeAttribute('data-story-label');
  document.querySelectorAll('a[href="#ueber-mich"]').forEach(link => {
    link.setAttribute('href', '#warum-waldkaetzchen');
  });

  /* Waldtiere und Situationen. */
  const animalIntro = animals?.querySelector('.n-section-heading p:last-child');
  if (animalIntro) {
    animalIntro.textContent = 'Die Waldtiere sind Figuren mit Eigenheiten, Widersprüchen und eigenen Geschichten. Sie geben Situationen eine Gestalt, ohne Menschen festzulegen.';
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

  situations?.classList.add('n-situationen--readable');
  const situationTitle = situations?.querySelector('.n-section-heading h2');
  if (situationTitle) situationTitle.textContent = 'Was wird sichtbar, wenn wir das Urteil verlangsamen?';
  const luisSituationArt = situations?.querySelector('.n-situation__art');
  if (luisSituationArt) {
    luisSituationArt.innerHTML = '<img src="assets/chars/13_ueberforderung.webp" alt="Symbolbild für Luis und Überforderung" width="512" height="512" loading="lazy">';
  }

  const compactSituations = situations ? [...situations.querySelectorAll('.n-situation-compact')] : [];
  const autonomySituation = compactSituations.find(item => /Iella sagt Nein|Niko sagt Nein/.test(item.textContent));
  if (autonomySituation && /Iella/.test(autonomySituation.textContent)) {
    autonomySituation.querySelector('summary strong').textContent = 'Niko sagt Nein – und alle hören nur Widerstand.';
    autonomySituation.innerHTML = autonomySituation.innerHTML.replaceAll('Iella', 'Niko');
  }

  /* Angebot auf der Startseite als Einstiege, nicht als zweite Zielgruppenliste. */
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

  /* Podcast und wiederkehrende Signatur. */
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

  /* Storyrail: auf Desktop wenige klare Kapitel, mobil wird sie ausgeblendet. */
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
    ['warum-waldkaetzchen', 'Torsten'],
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
  let storyTicking = false;
  const requestStorySync = () => {
    if (storyTicking) return;
    storyTicking = true;
    requestAnimationFrame(() => {
      syncStory();
      storyTicking = false;
    });
  };
  window.addEventListener('scroll', requestStorySync, { passive: true });
  window.addEventListener('resize', requestStorySync, { passive: true });
  requestStorySync();

  /* Horizontale Kartenleisten bleiben ohne Bibliothek bedienbar. */
  document.querySelectorAll('[data-rail]').forEach(rail => {
    const track = rail.querySelector('[data-rail-track]');
    const prev = rail.querySelector('[data-rail-prev]');
    const next = rail.querySelector('[data-rail-next]');
    if (!track || !prev || !next) return;

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