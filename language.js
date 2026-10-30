(() => {
  'use strict';
  const storageKey = 'khadija-portfolio-language';
  const switches = document.querySelectorAll('[data-language]');
  const textNodes = document.querySelectorAll('[data-en][data-es]');
  const labelledNodes = document.querySelectorAll('[data-label-en]');
  const metadata = {
    en: {
      title: 'Khadija Hammawa · Research & Projects',
      description: 'Khadija Hammawa — biomedical engineer and PhD researcher in Barcelona. Medical imaging, research software, and co-founding SíChef.',
      status: 'Language changed to English.'
    },
    es: {
      title: 'Khadija Hammawa · Investigación y proyectos',
      description: 'Khadija Hammawa — ingeniera biomédica e investigadora predoctoral en Barcelona. Imagen médica, software de investigación y cofundadora de SíChef.',
      status: 'Idioma cambiado a español.'
    }
  };

  function setLanguage(language, announce = false) {
    const lang = language === 'es' ? 'es' : 'en';
    textNodes.forEach(node => { node.textContent = node.getAttribute(`data-${lang}`); });
    labelledNodes.forEach(node => { node.setAttribute('aria-label', node.getAttribute(`data-label-${lang}`)); });
    document.querySelectorAll('[data-alt-en]').forEach(node => { node.alt = node.getAttribute(`data-alt-${lang}`); });
    document.documentElement.lang = lang;
    document.title = metadata[lang].title;
    document.querySelector('meta[name="description"]').content = metadata[lang].description;
    switches.forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.language === lang)); });
    if (announce) {
      document.getElementById('language-status').textContent = metadata[lang].status;
      // A blocked storage policy must never prevent switching languages.
      try { localStorage.setItem(storageKey, lang); } catch (_) { /* Preference is optional. */ }
    }
  }

  let savedLanguage = 'en';
  try { savedLanguage = localStorage.getItem(storageKey) || 'en'; } catch (_) { /* Default to English. */ }
  setLanguage(savedLanguage);
  switches.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language, true)));
  document.querySelector('.language-switch').hidden = false;
})();
