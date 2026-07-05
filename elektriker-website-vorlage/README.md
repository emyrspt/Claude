# Elektriker-Website – Vorlage

Diese Website wurde als **Vorlage** erstellt, weil beim Auftrag keine Kundendaten
(Abschnitt 1 des Master-Prompts) angegeben waren. Es wurden **keine Fakten erfunden** –
alle firmenspezifischen Angaben (Name, Adresse, Leistungen, Erfahrung, Bewertungen, Zitate …)
sind als klar erkennbare Platzhalter in eckigen Klammern `[...]` markiert, z. B. `[Firmenname]`,
`[Telefonnummer]`, `[Ort]`.

## 1. Vor dem Live-Gang: Platzhalter ausfüllen

Durchsuche alle Dateien nach `[` und ersetze die Platzhalter mit den echten Kundendaten:

- `index.html` – Firmenname, Kontaktdaten, Leistungen, Öffnungszeiten, Trust-Signale,
  Über-uns-Text, Einzugsgebiet, Schema.org-Daten (JSON-LD im `<head>`)
- `impressum.html` – vollständige Pflichtangaben nach § 5 TMG/DDG
- `datenschutz.html` – Hosting-Anbieter, eingesetzte Formular-/Analytics-Dienste
- `images/README.md` – sobald Logo/Fotos vorliegen

**Sektionen ohne Daten:** Wo keine echten Angaben vorliegen (z. B. Google-Bewertungen,
Testimonials, Notdienst), entweder die Platzhalter durch echte Inhalte ersetzen oder die
betreffende Sektion/Karte vollständig aus dem HTML entfernen – niemals Platzhalter online
stehen lassen.

**Rechtliches:** `impressum.html` und `datenschutz.html` enthalten einen deutlich sichtbaren
Hinweis, dass die Angaben vor Veröffentlichung von einem Rechtsanwalt bzw. Steuerberater
geprüft werden sollten. Dieser Hinweis sollte erst entfernt werden, nachdem die Prüfung
stattgefunden hat.

## 2. Design-System (zur Orientierung)

Konzept „Leiterbahn / Schaltplan" statt generischem Business-Template:

| Token      | Hex       | Verwendung                                   |
|------------|-----------|-----------------------------------------------|
| `--ink`    | `#1A1F26` | Header, Hero, Footer, „Warum wir"-Fläche      |
| `--slate`  | `#3A4552` | Fließtext                                      |
| `--paper`  | `#F4F6F8` | Content-Hintergrund                            |
| `--copper` | `#B5652D` | Sekundärakzent (Icons, Rahmen)                 |
| `--volt`   | `#F5B400` | Primärakzent (CTAs, Leiterbahn-Signature-Element) |
| `--safety` | `#D93B3B` | Notdienst-/Warnhinweise                        |

Schriften: **Space Grotesk** (Headline) + **Inter** (Fließtext), eingebunden über Google Fonts.
Signature-Element: die „Leiterbahn" – eine gepunktete vertikale Linie mit Lötpunkt-Knoten
(`css/style.css`, Klassen `.circuit-rail` / `.circuit-node`), die die Sections wie eine
Schaltung verbindet; auf Mobile wird sie durch horizontale Trenner (`.circuit-divider`) ersetzt.

Farben/Schriften lassen sich zentral in der `tailwind.config`-Angabe im `<head>` jeder Seite
sowie in `css/style.css` (`:root`-Variablen) anpassen.

## 3. Kontaktformular einrichten

Das Formular in `index.html` (`#contact-form`) ist aktuell auf **Web3Forms** vorbereitet.
Wähle eine der drei Optionen:

### Option A – Web3Forms (kein eigener Server-Code, kostenloses Kontingent)
1. Auf [web3forms.com](https://web3forms.com) einen kostenlosen Access Key erstellen.
2. In `index.html` den Platzhalter `[WEB3FORMS_ACCESS_KEY_EINTRAGEN]` im Hidden-Input
   `access_key` durch den echten Key ersetzen.
3. Fertig – das Formular sendet direkt an Web3Forms, keine weitere Konfiguration auf
   Hostinger nötig.

### Option B – Formspree (Alternative, ebenfalls ohne eigenen Server-Code)
1. Formular unter [formspree.io](https://formspree.io) anlegen, Form-ID kopieren.
2. In `index.html` das `<form>`-Tag anpassen: `action="https://formspree.io/f/DEINE_FORM_ID"`.
3. Hidden-Inputs `access_key`/`subject` für Web3Forms entfernen bzw. gemäß Formspree-Doku anpassen.

### Option C – Eigenes PHP-Skript mit PHPMailer + Hostinger-SMTP
Empfohlen, wenn keine Daten an einen externen Formular-Dienstleister übertragen werden sollen.
1. In Hostinger unter **E-Mail-Konten** ein Postfach anlegen (z. B. `kontakt@deinedomain.de`)
   und Zugangsdaten notieren.
2. [PHPMailer](https://github.com/PHPMailer/PHPMailer) per Composer oder als ZIP in einen
   `mail/`-Ordner auf dem Server laden.
3. Ein `send-mail.php`-Skript erstellen, das:
   - die POST-Daten des Formulars entgegennimmt,
   - alle Eingaben serverseitig validiert/escaped (Spam- und Injection-Schutz, z. B. mit
     `filter_var()` für E-Mail und `htmlspecialchars()` für Textfelder),
   - per PHPMailer über SMTP versendet:
     - Host: `smtp.hostinger.com`
     - Port: `587` (STARTTLS)
     - Auth: Postfach-Adresse + Passwort aus Schritt 1
4. In `index.html` das `<form>`-Tag auf `action="send-mail.php"` und `method="POST"` setzen,
   die Web3Forms-Hidden-Inputs entfernen.
5. Ein zusätzliches Honeypot-Feld (`_gotcha`, bereits im Formular vorhanden) serverseitig
   prüfen: Ist es ausgefüllt, Anfrage verwerfen statt versenden.

## 4. Google Maps & Cookie-Consent

Im Abschnitt „Kontakt" ist eine Google-Maps-Einbindung vorbereitet, die **erst nach
Zustimmung** über den Cookie-Banner geladen wird (DSGVO-konform, siehe `js/main.js`).

1. In `index.html` beim `<iframe id="map-frame">` das Attribut `data-src` mit der echten
   Google-Maps-Embed-URL der Firmenadresse ersetzen (Google Maps → Teilen → Karte
   einbetten → HTML-Code → nur die `src`-URL übernehmen).
2. Den Platzhaltertext in `#map-placeholder` entfernen/anpassen.

## 5. Upload & Test auf Hostinger

1. Im **hPanel** von Hostinger unter „Dateien" → „Dateimanager" öffnen (oder per FTP/SFTP
   mit den Zugangsdaten aus dem hPanel verbinden, z. B. mit FileZilla).
2. In das Verzeichnis `public_html` (bzw. den Ordner der gewünschten Domain/Subdomain)
   wechseln.
3. Den kompletten Inhalt dieses Ordners (alle HTML-Dateien sowie `css/`, `js/`, `images/`)
   dorthin hochladen – **nicht** den übergeordneten Projektordner selbst hochladen, sondern
   nur seinen Inhalt.
4. Bei Nutzung von Option C (PHPMailer) zusätzlich `send-mail.php` und den `mail/`-Ordner
   mit hochladen und Dateirechte prüfen (üblich: 644 für Dateien, 755 für Ordner).
5. Domain im hPanel mit dem Hosting-Paket verknüpfen (falls noch nicht geschehen) und ein
   SSL-Zertifikat aktivieren (Hostinger bietet kostenloses Let's-Encrypt-SSL).
6. Nach dem Upload testen:
   - Alle Seiten auf Mobile und Desktop öffnen (Responsive-Verhalten prüfen).
   - Telefonnummer-Links (`tel:`) auf einem Smartphone antippen.
   - Kontaktformular mit Testdaten abschicken und prüfen, ob die E-Mail ankommt (Spam-Ordner
     nicht vergessen).
   - Google-Maps-Cookie-Banner testen (Ablehnen/Akzeptieren).
   - `impressum.html` und `datenschutz.html` auf Vollständigkeit prüfen.
   - Ladezeit/Mobile-Darstellung z. B. mit Google PageSpeed Insights oder den
     Chrome-DevTools testen.

## 6. Dateistruktur

```
elektriker-website-vorlage/
├── index.html
├── impressum.html
├── datenschutz.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── README.md
└── README.md
```
