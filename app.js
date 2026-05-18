/* ============================================
   MARIEM HMAIED — Scroll choreography
   GSAP ScrollTrigger reveals, horizontal pin,
   navbar state, marquee, parallax
============================================ */

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  const languageStorageKey = 'hmaied-portfolio-language';
  const originalText = new Map();
  const originalPlaceholder = new Map();
  const originalValue = new Map();
  const titleNode = document.querySelector('title');
  const descriptionMeta = document.querySelector('meta[name="description"]');

  const frenchCopy = {
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.experience': 'Expérience',
    'nav.skills': 'Compétences',
    'nav.contact': 'Contact',
    'nav.downloadCv': 'Télécharger le CV',
    'loader.subtitle': 'Décoration d’intérieur — Depuis 2017',
    'hero.viewportRec': '<span class="vp-rec-dot"></span> EN DIRECT · REC',
    'hero.viewportSoftware': 'KITCHENDRAW · AUTOCAD · 2020 DESIGN',
    'hero.viewportAxis': '[ Perspective ]',
    'hero.viewportShade': 'Fil de fer + arêtes visibles',
    'hero.cursorLabel': 'Déplacer <span>+X</span>',
    'hero.pinKicker': 'Modèle cuisine',
    'hero.pinName': 'Implantation îlot · ébauche 3D',
    'hero.pinMeta': 'Mariem · KitchenDraw · étude menuiserie',
    'hero.interiorLabel': '— Mariem Hmaied · du concept au suivi de chantier',
    'hero.eyebrow': 'Décoratrice d’intérieur',
    'hero.title': '<span class="word-mask"><span>Décoration intérieure,</span></span><span class="word-mask"><span class="accent">dressing</span></span><span class="word-mask"><span>&amp; aménagement d’espace</span></span>',
    'hero.sub': 'Designer basée à Tunis qui crée des plans intérieurs, des concepts de dressings et de cuisines, des plans techniques, des visuels 3D réalistes, des choix de matériaux et un suivi de chantier pratique.',
    'hero.cta.view': 'Voir le projet réel',
    'hero.cta.cv': 'Télécharger le CV',
    'hero.stat.years': 'Années en décoration intérieure',
    'hero.stat.software': 'Logiciels de design',
    'hero.stat.languages': 'Langues',
    'hero.scroll.explore': 'Faire défiler pour explorer',
    'hero.scroll.location': 'Tunis, Tunisie',
    'marquee.text': 'Décoration intérieure <span class="star">✦</span> Dressing <span class="star">✦</span> Cuisines <span class="star">✦</span> Plans techniques <span class="star">✦</span> Rendus 3D <span class="star">✦</span> Suivi de chantier <span class="star">✦</span>',
    'about.sectionNum': '— 01 / À propos',
    'about.title': 'À propos <span class="display italic" style="color:var(--gold);">Mariem</span><br />Hmaied',
    'about.lead': 'Mariem Hmaied crée des intérieurs <span class="gold italic">fonctionnels, précis et centrés sur le client</span> pour les maisons, les dressings, les cuisines et les aménagements sur mesure.',
    'about.body': 'Diplômée du Collège LaSalle Tunis (BTP, Décoration d\'Intérieur, 2016), Mariem a travaillé en bureaux d\'architecture, ateliers de menuiserie, showrooms cuisines et aluminium, puis depuis octobre 2022 comme designer freelance avec JK Building. Son travail couvre les croquis, APS et APD, les plans techniques, les rendus 3D réalistes, les échantillons de matériaux, la coordination fournisseurs et le suivi de chantier.',
    'about.signature': '— Mariem Hmaied',
    'about.badge': 'Depuis 2017',
    'about.role': 'Décoratrice d’intérieur',
    'about.stats.start': 'Début de carrière',
    'about.stats.freelance': 'Pratique freelance',
    'about.stats.languages': 'Langues',
    'manifesto.eyebrow': '— Méthode de travail · Vol. 01',
    'manifesto.line1': '<span>Écouter attentivement,</span>',
    'manifesto.line2': '<span class="display italic gold">dessiner avec précision,</span>',
    'manifesto.line3': '<span>rendre clairement,</span>',
    'manifesto.line4': '<span class="display italic">puis suivre le chantier</span>',
    'manifesto.line5': '<span>jusqu\'à obtenir le bon détail.</span>',
    'manifesto.body': 'Le CV de Mariem réunit conception, dessin technique, conseil client, négociation commerciale et suivi de chantier. Cette combinaison pratique rend chaque projet lisible pour le client et réalisable pour l\'atelier.',
    'manifesto.signature': '— Mariem Hmaied, décoratrice d’intérieur',
    'services.eyebrow': '— 02 / Services',
    'services.title': 'Pratique<br /><span class="display italic" style="color:var(--gold);">— affinée.</span>',
    'services.desc': 'Services issus du CV de Mariem : études de conception, plans techniques, concepts 3D, conseil client, coordination fournisseurs et suivi de chantier.',
    'services.items.1.title': 'Intérieur<span class="svc-italic"> Design</span>',
    'services.items.1.tag': 'Croquis · APS · APD',
    'services.items.2.title': 'Dressing<span class="svc-italic"> &amp; Cuisine</span>',
    'services.items.2.tag': 'KitchenDraw · 2020 Design',
    'services.items.3.title': 'Plans<span class="svc-italic"> techniques</span>',
    'services.items.3.tag': 'AutoCAD · Détails',
    'services.items.4.title': 'Rendus<span class="svc-italic"> 3D</span>',
    'services.items.4.tag': 'Vues réalistes',
    'services.items.5.title': 'Fournisseurs<span class="svc-italic"> &amp; matériaux</span>',
    'services.items.5.tag': 'Qualité · Échantillons',
    'services.items.6.title': 'Suivi<span class="svc-italic"> de chantier</span>',
    'services.items.6.tag': 'Délais · Coûts',
    'portfolio.eyebrow': '— 03 / Sélection',
    'portfolio.title': 'Sélection<br /><span class="display italic" style="color:var(--gold);">d’intérieurs.</span>',
    'portfolio.desc': 'Un aperçu de portfolio par catégorie avec des images de référence réelles : design intérieur, dressing et cuisine, plans techniques, rendus, matériaux et suivi de chantier.',
    'portfolio.cards.1.tag': 'Intérieur',
    'portfolio.cards.1.cat': 'Résidentiel · Étude intérieure',
    'portfolio.cards.1.name': 'Design<br/>d’intérieur',
    'portfolio.cards.1.year': '01',
    'portfolio.cards.2.cat': 'Dressing · Cuisine',
    'portfolio.cards.2.name': 'Dressing<br/>&amp; Cuisine',
    'portfolio.cards.2.year': '02',
    'portfolio.cards.3.cat': 'AutoCAD · Plans détaillés',
    'portfolio.cards.3.name': 'Plans<br/>techniques',
    'portfolio.cards.3.year': '03',
    'portfolio.cards.4.cat': 'Rendu · Vue réaliste',
    'portfolio.cards.4.name': 'Rendus<br/>3D',
    'portfolio.cards.4.year': '04',
    'portfolio.cards.5.cat': 'Fournisseurs · Échantillons',
    'portfolio.cards.5.name': 'Fournisseurs<br/>&amp; Matériaux',
    'portfolio.cards.5.year': '05',
    'portfolio.cards.6.tag': 'Chantier',
    'portfolio.cards.6.cat': 'Site · Contrôle qualité',
    'portfolio.cards.6.name': 'Suivi<br/>de chantier',
    'portfolio.cards.6.year': '06',
    'gallery.kicker': 'Projet',
    'gallery.title': 'Galerie projet',
    'gallery.note': 'Cliquez sur une vignette pour l’afficher en grand.',
    'showcase.sectionNum': '— 04 / Dossier projet',
    'showcase.title': 'De la vue 3D<br /><span class="gold">au plan atelier.</span>',
    'showcase.body': 'Le PDF Dressing Malek comprend des vues 3D destinées au client ainsi que des fiches techniques pour les dimensions, l’implantation des modules, les étagères, les tiroirs, les jeux de portes et la discussion finale avec l’atelier.',
    'showcase.spec.software': 'Logiciel',
    'showcase.spec.scope': 'Périmètre',
    'showcase.spec.scopeValue': 'Dressing intégré',
    'showcase.spec.width': 'Largeur totale',
    'showcase.spec.date': 'Date du dessin',
    'showcase.glassLabel': '— Dressing Malek',
    'showcase.glassText': '4,60 m,<br/><span style="color:var(--gold);">dessiné à l’échelle.</span>',
    'process.eyebrow': '— 05 / Processus',
    'process.title': 'Comment un projet<br /><span class="display italic" style="color:var(--gold);">avance.</span>',
    'process.body': 'Le workflow suit l’expérience de Mariem : écoute active, études de conception, dessins détaillés, coordination des fournisseurs et contrôle du chantier.',
    'process.steps.1.title': 'Écouter &amp; mesurer',
    'process.steps.1.desc': 'Clarifier les besoins du client, les préférences, le budget, les contraintes de sécurité et les mesures du site avant de commencer le dessin.',
    'process.steps.2.title': 'Croquis <span class="italic">APS / APD</span>',
    'process.steps.2.desc': 'Construire la première direction du projet avec croquis, références, proportions, matériaux et options claires.',
    'process.steps.3.title': 'Plans &amp; <span class="italic">3D</span>',
    'process.steps.3.desc': 'Préparer des dessins techniques détaillés, des vues KitchenDraw ou 2020 Design, et des rendus réalistes pour la validation client.',
    'process.steps.4.title': 'Fournisseurs &amp; devis',
    'process.steps.4.desc': 'Coordonner les matériaux, fournisseurs, entrepreneurs, offres commerciales et solutions pratiques aux difficultés techniques.',
    'process.steps.5.title': 'Suivi <span class="italic">de chantier</span>',
    'process.steps.5.desc': 'Suivre l’avancement du chantier, les prescriptions techniques, les délais, les coûts, la qualité des matériaux et la livraison jusqu’à la réception.',
    'experience.eyebrow': '— 06 / Expérience',
    'experience.title': 'Parcours<br/><span class="display italic" style="color:var(--gold);">professionnel.</span>',
    'experience.cards.1.quote': 'Design d’intérieur et aménagement d’espace en freelance avec <span class="italic">JK Building</span> : croquis, APS/APD, plans détaillés, visuels 3D, échantillons de matériaux, coordination fournisseurs et suivi de chantier.',
    'experience.cards.1.name': 'Designer d’intérieur',
    'experience.cards.1.role': 'Oct 2022 — Présent',
    'experience.cards.2.quote': 'Expérience technico-commerciale avec <span class="italic">SBA Tunisia</span> et ECO Cuisine : besoins clients, relevés de chantier, devis, suivi des ventes, concepts 3D cuisine/dressing et transfert des dossiers techniques.',
    'experience.cards.2.name': 'Technico-commerciale',
    'experience.cards.2.role': 'Mar 2021 — Juil 2022',
    'experience.cards.3.quote': 'Décoration intérieure avec <span class="italic">Atelier Mohamed Limam</span> et Archigroup Design : conseil client, propositions 3D, devis, plans, élévations, mood boards et suivi de chantier.',
    'experience.cards.3.name': 'Décoratrice d’intérieur',
    'experience.cards.3.role': 'Jan 2017 — Nov 2019',
    'skills.eyebrow': '— Compétences &amp; formation',
    'skills.title': 'Compétences professionnelles',
    'skills.body': 'Profil pratique façonné par la décoration intérieure, les ateliers de menuiserie, les showrooms cuisines et dressings, la vente technique et le suivi de chantier.',
    'skills.items.1.name': 'Travail d’équipe &amp; précision',
    'skills.items.1.meta': 'Habitudes de projet organisées, exactes et attentives aux détails',
    'skills.items.2.name': 'Communication client',
    'skills.items.2.meta': 'S’adapte à différents interlocuteurs et attentes projet',
    'skills.items.3.name': 'Écoute active',
    'skills.items.3.meta': 'Écoute, reformule les besoins et clarifie les priorités',
    'skills.items.4.name': 'Connaissance menuiserie &amp; bâtiment',
    'skills.items.4.meta': 'Compréhension technique des contraintes de menuiserie et de construction',
    'skills.items.5.name': 'Résolution de problèmes techniques',
    'skills.items.5.meta': 'Anticipe les difficultés du projet et prépare des solutions réalisables',
    'skills.items.6.name': 'Compétences commerciales',
    'skills.items.6.meta': 'Négociation, suivi commercial, devis et développement client',
    'skills.items.7.name': 'Techniques marketing',
    'skills.items.7.meta': 'Présentation produit, positionnement et plan d’action commercial',
    'skills.items.8.name': 'Gestion du temps',
    'skills.items.8.meta': 'Organise les tâches, délais, priorités et suivi de chantier',
    'skills.items.9.name': 'Initiative &amp; fiabilité',
    'skills.items.9.meta': 'Ponctualité, sens du détail et initiative autonome',
    'skills.items.10.name': 'Logiciels de design',
    'skills.items.10.meta': 'AutoCAD · KitchenDraw · 2020 Design',
    'skills.items.11.name': 'Outils bureautiques',
    'skills.items.11.meta': 'Word · Excel · PowerPoint',
    'skills.items.12.name': 'Traduction française',
    'skills.items.12.meta': 'Peut traduire notes de projet, briefs client et contenus techniques en français',
    'skills.items.13.name': 'Langues',
    'skills.items.13.meta': 'Français · Anglais · Arabe',
    'skills.items.14.name': 'Formation',
    'skills.items.14.meta': 'BTP Décoration d’intérieur · Collège LaSalle Tunis · Oct 2016',
    'contact.sectionNum': '— 07 / Contact',
    'contact.title': 'Lancez votre<br/>projet avec<br/><span class="italic">Mariem Hmaied.</span>',
    'contact.body': 'Pour des plans intérieurs, des concepts de dressing et de cuisine, des plans techniques, des rendus 3D, des choix de matériaux ou un suivi de chantier, envoyez directement les détails du projet à Mariem.',
    'contact.details.studio': 'Studio',
    'contact.details.studioValue': 'Tunis, Tunisie',
    'contact.details.email': 'E-mail',
    'contact.details.phone': 'Téléphone',
    'contact.details.languages': 'Langues',
    'contact.details.languagesValue': 'Français · Anglais · Arabe',
    'contact.socials.email': 'E-mail',
    'contact.socials.cv': 'CV PDF',
    'contact.socials.project': 'PDF projet',
    'contact.socials.call': 'Appeler',
    'contact.form.subject': 'Demande de projet portfolio',
    'contact.form.nameLabel': 'Votre nom',
    'contact.form.namePlaceholder': 'Votre nom complet',
    'contact.form.phoneLabel': 'Téléphone',
    'contact.form.phonePlaceholder': '+216 ...',
    'contact.form.emailLabel': 'E-mail',
    'contact.form.emailPlaceholder': 'client@exemple.com',
    'contact.form.projectLabel': 'Type de projet',
    'contact.form.projectPlaceholder': 'Dressing · Cuisine · Appartement · Plans techniques',
    'contact.form.messageLabel': 'Parlez-nous de l’espace',
    'contact.form.messagePlaceholder': 'Mesures, pièces, matériaux, délais et ce que vous souhaitez concevoir…',
    'contact.form.submit': 'Contacter Mariem Hmaied',
    'contact.form.sending': 'Envoi...',
    'contact.form.sent': 'Message envoyé',
    'contact.form.error': 'Envoi impossible',
    'footer.body': 'Décoratrice d’intérieur à Tunis, spécialisée en aménagement d’espace, dressing, cuisines, plans techniques, concepts 3D et suivi de chantier.',
    'footer.columns.studio': 'Studio',
    'footer.columns.services': 'Services',
    'footer.columns.connect': 'Contact',
    'footer.links.about': 'À propos',
    'footer.links.process': 'Processus',
    'footer.links.portfolio': 'Portfolio',
    'footer.links.experience': 'Expérience',
    'footer.links.skills': 'Compétences',
    'footer.links.service1': 'Décoration intérieure',
    'footer.links.service2': 'Dressing &amp; cuisine',
    'footer.links.service3': 'Plans techniques',
    'footer.links.service4': 'Rendus 3D',
    'footer.links.email': 'E-mail',
    'footer.links.phone': 'Téléphone',
    'footer.links.cv': 'CV PDF',
    'footer.links.project': 'PDF projet',
    'footer.bottom.left': '© 2026 Mariem Hmaied · Tous droits réservés',
    'footer.bottom.right': 'Conçu à Tunis · Réalisé à partir du vrai CV et des fichiers projet',
    'meta.title': 'Mariem Hmaied — Décoratrice d’intérieur & aménagement',
    'meta.description': 'Décoration intérieure, dressings, cuisines, plans techniques, concepts 3D et suivi de chantier par Mariem Hmaied.'
  };

  const getCurrentLanguage = () => localStorage.getItem(languageStorageKey) || 'en';

  const cacheOriginalContent = () => {
    $$('[data-i18n]').forEach((el) => {
      if (!originalText.has(el)) originalText.set(el, el.innerHTML);
    });
    $$('[data-i18n-placeholder]').forEach((el) => {
      if (!originalPlaceholder.has(el)) originalPlaceholder.set(el, el.getAttribute('placeholder') || '');
    });
    $$('[data-i18n-value]').forEach((el) => {
      if (!originalValue.has(el)) originalValue.set(el, el.getAttribute('value') || '');
    });
    if (titleNode && !titleNode.dataset.i18nOriginal) titleNode.dataset.i18nOriginal = titleNode.textContent || '';
    if (descriptionMeta && !descriptionMeta.dataset.i18nOriginal) descriptionMeta.dataset.i18nOriginal = descriptionMeta.getAttribute('content') || '';
  };

  const applyLanguage = (language) => {
    const isFrench = language === 'fr';
    document.documentElement.lang = isFrench ? 'fr' : 'en';

    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (isFrench && frenchCopy[key]) el.innerHTML = frenchCopy[key];
      else if (originalText.has(el)) el.innerHTML = originalText.get(el);
    });

    $$('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const value = isFrench ? frenchCopy[key] : originalPlaceholder.get(el);
      if (value != null) el.setAttribute('placeholder', value);
    });

    $$('[data-i18n-value]').forEach((el) => {
      const key = el.dataset.i18nValue;
      const value = isFrench ? frenchCopy[key] : originalValue.get(el);
      if (value != null) el.setAttribute('value', value);
    });

    if (titleNode) {
      titleNode.textContent = isFrench ? frenchCopy['meta.title'] : titleNode.dataset.i18nOriginal;
    }
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', isFrench ? frenchCopy['meta.description'] : descriptionMeta.dataset.i18nOriginal);
    }

    const toggle = document.querySelector('.lang-toggle');
    if (toggle) {
      const code = toggle.querySelector('.lang-toggle-code');
      const label = toggle.querySelector('.lang-toggle-label');
      if (code) code.textContent = isFrench ? 'EN' : 'FR';
      if (label) label.textContent = isFrench ? 'English' : 'Français';
      toggle.setAttribute('aria-label', isFrench ? 'Passer à l’anglais' : 'Switch to French');
      toggle.setAttribute('aria-pressed', isFrench ? 'true' : 'false');
      toggle.setAttribute('title', isFrench ? 'Passer à l’anglais' : 'Switch to French');
    }

    localStorage.setItem(languageStorageKey, language);
    window.dispatchEvent(new CustomEvent('portfolio-language-change', { detail: { language } }));
  };

  const copyForCurrentLanguage = (key, fallback) => {
    return getCurrentLanguage() === 'fr' && frenchCopy[key] ? frenchCopy[key] : fallback;
  };

  cacheOriginalContent();

  // ----- Loader -----
  const langToggle = $('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const nextLanguage = getCurrentLanguage() === 'fr' ? 'en' : 'fr';
      applyLanguage(nextLanguage);
    });
  }

  applyLanguage(getCurrentLanguage());

  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = $('.loader');
      if (loader) loader.classList.add('is-done');
      document.body.classList.add('is-loaded');
    }, 2400);
  });

  // ----- Navbar scroll state -----
  const nav = $('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Smooth-scroll anchor links -----
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ----- IntersectionObserver reveals (fallback if GSAP not present) -----
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  $$('.reveal, .reveal-image, .manifesto-statement').forEach((el) => io.observe(el));

  // ----- Count-up numbers ----------
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const to = parseInt(el.dataset.to, 10) || 0;
        const dur = 1600;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * to);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = to;
        };
        requestAnimationFrame(tick);
        countIO.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  $$('.count-up').forEach((el) => countIO.observe(el));

  // ----- Custom cursor ----------
  const cursorDot = $('.cursor-dot');
  const cursorRing = $('.cursor-ring');
  if (cursorDot && cursorRing && window.matchMedia('(pointer:fine)').matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    });
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      cursorRing.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('mouseover', (e) => {
      const hover = e.target.closest('[data-cursor="hover"], a, button');
      const image = e.target.closest('.proj-card, .about-img, .hero-interior');
      cursorRing.classList.toggle('is-hover', !!hover && !image);
      cursorRing.classList.toggle('is-image', !!image);
    });
  }

  // ----- Magnetic buttons ----------
  $$('.magnetic').forEach((el) => {
    let r = el.getBoundingClientRect();
    const refresh = () => (r = el.getBoundingClientRect());
    window.addEventListener('resize', refresh, { passive: true });
    el.addEventListener('mouseenter', refresh);
    el.addEventListener('mousemove', (e) => {
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      const label = el.querySelector('.btn-label');
      if (label) label.style.transform = `translate(${x * 0.1}px, ${y * 0.18}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      const label = el.querySelector('.btn-label');
      if (label) label.style.transform = '';
    });
  });

  // ----- Services list hover preview ----------
  const preview = $('.svc-preview');
  const previewImg = preview ? preview.querySelector('img') : null;
  if (preview && previewImg) {
    let px = 0, py = 0, tx = 0, ty = 0;
    let visible = false;
    const lerp = () => {
      tx += (px - tx) * 0.18;
      ty += (py - ty) * 0.18;
      if (visible) preview.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%) scale(1)`;
      requestAnimationFrame(lerp);
    };
    lerp();

    $$('.svc-row').forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const src = row.getAttribute('data-img');
        if (src && previewImg.src !== src) previewImg.src = src;
        preview.classList.add('is-visible');
        visible = true;
      });
      row.addEventListener('mousemove', (e) => {
        px = e.clientX + 120;
        py = e.clientY;
      });
      row.addEventListener('mouseleave', () => {
        preview.classList.remove('is-visible');
        visible = false;
      });
    });
  }

  // ----- Service project galleries ----------
  const gallery = $('.project-gallery');
  if (gallery) {
    const galleryTitle = $('.project-gallery-title', gallery);
    const galleryKicker = $('.project-gallery-kicker', gallery);
    const galleryDesc = $('.project-gallery-desc', gallery);
    const galleryHero = $('.project-gallery-hero img', gallery);
    const galleryGrid = $('.project-gallery-grid', gallery);
    const galleryClose = $('.project-gallery-close', gallery);
    let lastGalleryTrigger = null;

    function setHero(src, title) {
      if (!galleryHero || !src) return;
      const isFrench = getCurrentLanguage() === 'fr';
      galleryHero.src = src;
      galleryHero.alt = isFrench ? `Image du projet ${title}` : `${title} project image`;
      $$('.project-gallery-thumb', gallery).forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset.src === src);
      });
    }

    function openGallery(row) {
      const isFrench = getCurrentLanguage() === 'fr';
      const title = isFrench
        ? row.dataset.galleryTitleFr || row.dataset.galleryTitle || 'Galerie projet'
        : row.dataset.galleryTitle || 'Project Gallery';
      const kicker = isFrench
        ? row.dataset.galleryKickerFr || row.dataset.galleryKicker || 'Projet'
        : row.dataset.galleryKicker || 'Project';
      const desc = isFrench
        ? row.dataset.galleryDescriptionFr || row.dataset.galleryDescription || ''
        : row.dataset.galleryDescription || '';
      const images = (row.dataset.galleryImages || row.dataset.img || '')
        .split(',')
        .map((src) => src.trim())
        .filter(Boolean);

      if (!images.length) return;
      lastGalleryTrigger = row;
      if (galleryTitle) galleryTitle.textContent = title;
      if (galleryKicker) galleryKicker.textContent = kicker;
      if (galleryDesc) galleryDesc.textContent = desc;

      if (galleryGrid) {
        galleryGrid.innerHTML = '';
        images.forEach((src, i) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'project-gallery-thumb';
          btn.dataset.src = src;
          btn.setAttribute('aria-label', isFrench ? `Aperçu image ${i + 1} pour ${title}` : `Preview image ${i + 1} for ${title}`);

          const img = document.createElement('img');
          img.src = src;
          img.alt = isFrench ? `${title} vignette ${i + 1}` : `${title} thumbnail ${i + 1}`;
          btn.appendChild(img);
          btn.addEventListener('click', () => setHero(src, title));
          galleryGrid.appendChild(btn);
        });
      }

      setHero(images[0], title);
      gallery.classList.add('is-open');
      gallery.setAttribute('aria-hidden', 'false');
      document.body.classList.add('gallery-open');
      if (galleryClose) galleryClose.focus();
    }

    function closeGallery() {
      gallery.classList.remove('is-open');
      gallery.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('gallery-open');
      if (lastGalleryTrigger) lastGalleryTrigger.focus();
    }

    $$('.svc-row').forEach((row) => {
      row.addEventListener('click', () => openGallery(row));
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openGallery(row);
        }
      });
    });

    if (galleryClose) galleryClose.addEventListener('click', closeGallery);
    gallery.addEventListener('click', (e) => {
      if (e.target === gallery) closeGallery();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && gallery.classList.contains('is-open')) closeGallery();
    });
    window.addEventListener('portfolio-language-change', () => {
      if (lastGalleryTrigger && gallery.classList.contains('is-open')) openGallery(lastGalleryTrigger);
    });
  }

  // ----- GSAP setup -----
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // About image gentle parallax — different rates per image for depth
    gsap.to('.about-img-main', {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    });
    gsap.to('.about-img-sub', {
      yPercent: -16,
      ease: 'none',
      scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    });
    gsap.to('.about-img-mini', {
      yPercent: -22,
      ease: 'none',
      scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    });

    // Hero interior parallax
    gsap.to('.hero-interior', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });

    // Hero content lift
    gsap.to('.hero-content', {
      yPercent: -8,
      opacity: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });

    // ----- Horizontal scroll portfolio -----
    const hScroll = $('.h-scroll');
    const hTrack = $('.h-track');
    if (hScroll && hTrack) {
      const getOffset = () => hTrack.scrollWidth - window.innerWidth + 80;
      gsap.to(hTrack, {
        x: () => -getOffset(),
        ease: 'none',
        scrollTrigger: {
          trigger: hScroll,
          start: 'top top',
          end: () => '+=' + getOffset(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const fill = $('.h-progress-fill');
            if (fill) fill.style.width = (self.progress * 100).toFixed(2) + '%';
          },
        },
      });
    }

    // Services list rows
    gsap.from('.svc-row', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.services-list', start: 'top 75%' },
    });

    // Skills / education rows
    gsap.from('.press-list li', {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.07,
      scrollTrigger: { trigger: '.press-list', start: 'top 80%' },
    });

    // Process steps
    gsap.utils.toArray('.process-step').forEach((step, i) => {
      gsap.from(step, {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
        },
      });
    });

    // Testimonials
    gsap.from('.t-card', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.t-grid',
        start: 'top 75%',
      },
    });

    // Section titles word-mask
    $$('.section-title-anim').forEach((title) => {
      gsap.from(title, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
        },
      });
    });

    // Refresh on resize
    window.addEventListener('resize', () => ScrollTrigger.refresh());
  }

  // ----- Contact form: send directly through a static-site form endpoint -----
  const form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"] .btn-label');
      const original = btn ? btn.textContent : '';
      const submitBtn = form.querySelector('button[type="submit"]');
      const data = new FormData(form);

      if (btn) btn.textContent = copyForCurrentLanguage('contact.form.sending', 'Sending...');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fetch('https://formsubmit.co/ajax/hmaiedmeriem148@gmail.com', {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });
        const result = await res.json().catch(() => ({}));
        if (!res.ok || result.success === false) {
          throw new Error(result.message || 'Message not sent');
        }
        if (btn) btn.textContent = copyForCurrentLanguage('contact.form.sent', 'Message sent');
        form.reset();
        setTimeout(() => {
          if (btn) btn.textContent = original;
        }, 2600);
      } catch (err) {
        if (btn) btn.textContent = copyForCurrentLanguage('contact.form.error', 'Could not send');
        setTimeout(() => {
          if (btn) btn.textContent = original;
        }, 3200);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  // ----- Hero viewport HUD: timecode + frame counter -----
  const tcEl = $('#vp-tc');
  const frameEl = $('#vp-frame');
  if (tcEl || frameEl) {
    const start = performance.now();
    const fps = 25;
    const tickHud = () => {
      const elapsed = (performance.now() - start) / 1000;
      if (tcEl) {
        const h = Math.floor(elapsed / 3600);
        const m = Math.floor((elapsed % 3600) / 60);
        const s = Math.floor(elapsed % 60);
        const f = Math.floor((elapsed * fps) % fps);
        const pad = (n) => String(n).padStart(2, '0');
        tcEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
      }
      if (frameEl) {
        const total = Math.floor(elapsed * fps);
        frameEl.textContent = String(total % 100000).padStart(5, '0');
      }
      requestAnimationFrame(tickHud);
    };
    requestAnimationFrame(tickHud);
  }

  // ----- Live time in nav (Mediterranean studio time) -----
  function tickTime() {
    const el = $('#studio-time');
    if (!el) return;
    const now = new Date();
    const tunis = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Tunis' }));
    const hh = String(tunis.getHours()).padStart(2, '0');
    const mm = String(tunis.getMinutes()).padStart(2, '0');
    el.textContent = `${hh}:${mm}`;
  }
  tickTime();
  setInterval(tickTime, 30000);
})();
