(function () {
  'use strict';

  var CONSENT_KEY = 'cookie_consent';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }

  function loadGoogleFonts() {
    if (document.getElementById('google-fonts-link')) return;
    var link = document.createElement('link');
    link.id = 'google-fonts-link';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('hidden');
      setTimeout(function () { banner.remove(); }, 400);
    }
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML =
      '<div class="cookie-inner">' +
        '<div class="cookie-text">' +
          '<p><strong>Cookie Settings</strong></p>' +
          '<p>We use external services (Google Fonts) that may process your data. ' +
          'See our <a href="privacy.html">Privacy Policy</a> for details.</p>' +
        '</div>' +
        '<div class="cookie-actions">' +
          '<button id="cookie-decline" class="cookie-btn cookie-btn--decline">Decline</button>' +
          '<button id="cookie-accept" class="cookie-btn cookie-btn--accept">Accept</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      setConsent('accepted');
      loadGoogleFonts();
      hideBanner();
    });

    document.getElementById('cookie-decline').addEventListener('click', function () {
      setConsent('declined');
      hideBanner();
    });
  }

  // Initialize
  var consent = getConsent();
  if (consent === 'accepted') {
    loadGoogleFonts();
  } else if (!consent) {
    // Show banner after short delay so page renders first
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        setTimeout(showBanner, 300);
      });
    } else {
      setTimeout(showBanner, 300);
    }
  }
  // If declined: do nothing, fallback fonts are used
})();
