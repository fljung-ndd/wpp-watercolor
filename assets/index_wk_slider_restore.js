(() => {
  if (!document.querySelector('link[href="assets/index_wk_slider_polish.css"]')) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'assets/index_wk_slider_polish.css';
    document.head.append(stylesheet);
  }

  const apply = () => {
    const horizontal = document.querySelector('#haltung');
    if (!horizontal) return;

    const panels = [...horizontal.querySelectorAll('.n-horizontal-panel')];
    if (panels.length < 4) return;

    /* Panel 1: vollständiger Haltungstext aus index_ws. */
    const attitudeLead = panels[0].querySelector('.n-horizontal-panel__copy > p:not(.n-eyebrow):not(.n-panel-quote):not(.n-panel-more)');
    if (attitudeLead) {
      attitudeLead.textContent = 'Kein Kind verhält sich schwierig ohne Grund. Waldkätzchen ist beziehungs-, autonomie- und regulationsorientiert – keine der drei Orientierungen darf allein regieren.';
    }
    const triad = [
      ['Beziehung', 'Verlässlichkeit, Interesse, die Bereitschaft zur Reparatur.'],
      ['Selbstbestimmung', 'Wahl, Einfluss, Nein-Räume, Würde.'],
      ['Ko-Regulation', 'Ruhe leihen, Tempo anpassen, gemeinsam wieder handlungsfähig werden.'],
    ];
    panels[0].querySelectorAll('.n-triad article').forEach((item, index) => {
      const [title, copy] = triad[index] || [];
      if (!title) return;
      const strong = item.querySelector('strong');
      const paragraph = item.querySelector('p');
      if (strong) strong.textContent = title;
      if (paragraph) paragraph.textContent = copy;
    });

    /* Panel 2: alle acht Waldorte aus index_ws. */
    const forestLead = panels[1].querySelector('.n-horizontal-panel__copy > p:not(.n-eyebrow):not(.n-panel-more)');
    if (forestLead) {
      forestLead.textContent = 'Acht Waldorte helfen, Kontext, Geschichte und Hindernisse auseinanderzuhalten. Mehrere Orte können gleichzeitig bedeutsam sein – das ist keine Reise mit fester Reihenfolge.';
    }
    const symbols = panels[1].querySelector('.n-forest-symbols');
    if (symbols) {
      symbols.innerHTML = `
        <span><img src="assets/icons/21_blumenwiese.webp" alt="" loading="lazy">Lichtung<i>ankommen und sehen</i></span>
        <span><img src="assets/icons/10_waldhoehle.webp" alt="" loading="lazy">Höhle<i>Schutz und Pause</i></span>
        <span><img src="assets/icons/tree.webp" alt="" loading="lazy">Alter Wald<i>alte Stimmen</i></span>
        <span><img src="assets/icons/18_gedankenknaeuel.webp" alt="" loading="lazy">Echos<i>verinnerlichte Sätze</i></span>
        <span><img src="assets/icons/stones.webp" alt="" loading="lazy">Felsenmeer<i>echte Hindernisse</i></span>
        <span><img src="assets/icons/compass.webp" alt="" loading="lazy">Nebel<i>Unklarheit</i></span>
        <span><img src="assets/icons/02_sprechblasen.webp" alt="" loading="lazy">Waldpost<i>Wissen und Impulse</i></span>
        <span><img src="assets/icons/15_beziehung.webp" alt="" loading="lazy">Brücke<i>Kooperation</i></span>`;
    }
    panels[1].querySelector('.n-panel-more')?.remove();

    /* Panel 3: ursprünglicher Erklärungstext plus eine neue Vertiefung. */
    const perspectivesLead = panels[2].querySelector('.n-horizontal-panel__copy > p:not(.n-eyebrow):not(.n-panel-more)');
    if (perspectivesLead) {
      perspectivesLead.textContent = 'Sie erzeugen Hypothesen, keine Diagnosen. Die Macherin kommt bewusst zuletzt: Handeln, ohne vorher zu beobachten, zu spüren und das Umfeld anzusehen, erzeugt meist nur mehr Druck.';
    }
    panels[2].querySelector('.n-panel-more')?.remove();
    const perspectives = panels[2].querySelector('.n-cat-perspectives');
    if (perspectives && !panels[2].querySelector('.n-perspective-note')) {
      perspectives.insertAdjacentHTML('afterend', `
        <aside class="n-perspective-note">
          <strong>Die fünf Blicke müssen sich nicht einig sein.</strong>
          <p>Sie dürfen nebeneinanderstehen und sich widersprechen. Gerade das schützt davor, eine plausible Vermutung zu schnell zur Wahrheit zu machen.</p>
          <p>Auch „Das wissen wir noch nicht“ ist ein hilfreicher Blick. Offenheit ist hier kein Mangel, sondern Sorgfalt.</p>
        </aside>`);
    }

    /* Panel 4: vollständige Tigi- und Tierpassage aus index_ws. */
    const whyToys = panels[3].querySelector('.n-why-toys');
    if (whyToys) {
      whyToys.innerHTML = `
        <div>
          <p>Ein Kind sitzt schweigend in der Ecke. Tigi kommt zuerst – klein, frech, und braucht selbst Zuneigung, um zu wissen, dass er willkommen ist. Er stupst an. Zuckt zurück. Bleibt. Ich komme danach.</p>
          <p>Das Kind kommt aus dem Ausnahmezustand zurück. Und ich bin plötzlich nicht mehr der Gegner, sondern derjenige, der mit ihm zusammen zuschaut.</p>
          <p>Figuren und Handpuppen schaffen einen Abstand, der Verbindung erst möglich macht – aus „du bist aggressiv“ wird „gerade zeigt sich viel von Luis“. Kein Trick. Eine Haltung.</p>
          <p class="n-panel-quote n-panel-quote--dark">Kein Kind ist ein Tier. Tiere kommen und gehen. Sie beschreiben Situationen, keine Menschen.</p>
          <p class="n-why-toys__aside">Am liebsten wären es Ziegen. Die gibt es noch nicht – ich darf bisher keine eigenen halten.</p>
        </div>
        <ul class="n-animal-strip">
          <li><img src="assets/chars/03_leopard_krone.webp" alt="Leopard mit Krone" loading="lazy"><strong>Tigi</strong><span>Kontrolle und Vorhersehbarkeit</span></li>
          <li><img src="assets/chars/11_schnecke_rakete.webp" alt="Schnecke" loading="lazy"><strong>Etana</strong><span>Rückzug und Schutz</span></li>
          <li><img src="assets/chars/04_roter_panda.webp" alt="Roter Panda" loading="lazy"><strong>Elfriede</strong><span>Anpassung und verborgene Spannung</span></li>
          <li><img src="assets/chars/05_pinguin.webp" alt="Pinguin" loading="lazy"><strong>Wadda</strong><span>Reduktion und Sprachlosigkeit</span></li>
          <li><img src="assets/chars/02_katta.webp" alt="Katta" loading="lazy"><strong>Kata-Rina</strong><span>Nähe und Festhalten</span></li>
        </ul>`;
    }
  };

  if (document.readyState === 'complete') apply();
  else window.addEventListener('load', apply, { once: true });
})();