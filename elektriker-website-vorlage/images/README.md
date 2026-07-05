# Bilder-Ordner

Aktuell liegen hier keine echten Bilder, da in Abschnitt 1 (Kundendaten) kein Logo und keine
Fotos angegeben wurden. Die Website nutzt stattdessen:

- ein Text-/Emoji-Logo im Header und Footer,
- ein per SVG gezeichnetes „Schaltplan"-Panel im Hero (kein Foto nötig),
- gestrichelte Platzhalter-Boxen mit Beschreibungstext (z. B. bei „Über uns" und „Referenzen").

## Sobald echte Bilder vorhanden sind

1. Logo als `logo.png` oder `logo.svg` hier ablegen und im Header/Footer von `index.html`,
   `impressum.html`, `datenschutz.html` sowie im `og:image`/Schema.org-Feld verlinken.
2. Firmen-/Teamfotos hier ablegen (empfohlen: komprimiertes JPG/WebP, max. ~200 KB pro Bild)
   und die `.placeholder-box`-Elemente in `index.html` durch `<img>`-Tags mit `loading="lazy"`
   und aussagekräftigem `alt`-Text ersetzen.
3. Bilder vor dem Hochladen komprimieren (z. B. mit Squoosh oder TinyPNG), um die Ladezeit
   auf Mobilgeräten niedrig zu halten.
