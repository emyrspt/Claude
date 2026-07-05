document.addEventListener('DOMContentLoaded', function () {
  // Mobile Navigation Toggle
  var navToggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenu.style.maxHeight = isOpen ? mobileMenu.scrollHeight + 'px' : '0px';
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        mobileMenu.style.maxHeight = '0px';
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Footer-Jahr automatisch aktuell halten
  document.querySelectorAll('[data-current-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Kontaktformular: einfache Client-seitige Validierung
  var form = document.getElementById('contact-form');
  var statusBox = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (event) {
      var honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        // Spam-Bot hat das versteckte Feld ausgefüllt -> Abbruch ohne Fehlermeldung
        event.preventDefault();
        return;
      }

      if (!form.checkValidity()) {
        event.preventDefault();
        if (statusBox) {
          statusBox.textContent = 'Bitte fülle alle Pflichtfelder korrekt aus.';
          statusBox.className = 'mt-4 text-sm font-medium text-[var(--safety)]';
        }
        return;
      }

      if (statusBox) {
        statusBox.textContent = 'Anfrage wird gesendet …';
        statusBox.className = 'mt-4 text-sm font-medium text-[var(--slate)]';
      }
      // Hinweis: Das eigentliche Versenden übernimmt der Formular-Endpunkt
      // (Web3Forms/Formspree/PHPMailer-Skript), siehe README.md.
    });
  }

  // DSGVO Cookie-Consent (relevant sobald Google Maps/Analytics aktiv ist)
  var consent = document.getElementById('cookie-consent');
  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');
  var mapFrame = document.getElementById('map-frame');
  var mapPlaceholder = document.getElementById('map-placeholder');

  function applyConsent(granted) {
    localStorage.setItem('cookieConsent', granted ? 'granted' : 'denied');
    if (granted && mapFrame && mapFrame.dataset.src) {
      mapFrame.src = mapFrame.dataset.src;
      mapFrame.classList.remove('hidden');
      if (mapPlaceholder) mapPlaceholder.classList.add('hidden');
    }
  }

  var storedConsent = localStorage.getItem('cookieConsent');
  if (consent) {
    if (storedConsent === 'granted') {
      applyConsent(true);
      consent.classList.add('is-hidden');
    } else if (storedConsent === 'denied') {
      consent.classList.add('is-hidden');
    } else {
      consent.classList.remove('is-hidden');
    }
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      applyConsent(true);
      consent.classList.add('is-hidden');
    });
  }
  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      applyConsent(false);
      consent.classList.add('is-hidden');
    });
  }
});
