# Studio Dentistico Ferretti — sito ufficiale + V1 preview

Portfolio personale di **Alessio Calderaro**. Sito di uno studio dentistico ipotetico a Brescia, con due interpretazioni visive disponibili come demo del portfolio.

## Demo

| Demo | URL | Mood | Skill base |
|---|---|---|---|
| **Sito ufficiale** | `/` (root) | light-cool · tech-wellness · digital-first | `worldofnrg-design` + `prototypestudio-design` |
| **Preview alternativa** | [/v1-warm/](v1-warm/index.html) | warm-editorial · family-lifestyle · anti-clinico | `dentologie-design` |

Più: **Tour 360°** condiviso (Three.js + 4 panorami SVG mockup dental + 2 themes via `?theme=v1|v3`)

Per backward-compat: `/v3-tech/*` viene reindirizzato 301 alla root (il vecchio path della demo tech).

## Stack tecnico

- HTML5 + CSS3 + JavaScript vanilla (ES modules)
- Cloudflare Pages (deploy automatico via GitHub)
- Bunny Fonts (GDPR-compliant)
- Three.js v0.160 via CDN per il tour 360°
- Lenis via CDN per smooth scroll
- Zero framework, zero build, zero npm

## Struttura repo

```
/                          ← Sito ufficiale (V3 promossa)
├── index.html             Homepage
├── style.css
├── script.js
├── logo.svg
├── servizi.html           8 aree cliniche
├── team.html              10 membri staff
├── chi-siamo.html         Storia, valori, compliance
├── prenotazione.html      Form prenotazione + calendar inline
├── contatti.html          NAP + mappa + orari
├── casi-clinici.html      8 casi prima/dopo con slider drag
├── smile-design.html      Upload sorriso + preview canvas
├── blog.html              Lista 4 articoli
├── blog/                  4 articoli divulgativi
├── _headers
├── _redirects             Backward-compat /v3-tech/* → /
├── shared/                Asset comuni (immagini, video, JS helpers)
├── tour-360/              Tour virtuale Three.js (themes V1 + root)
└── v1-warm/               Preview V1 (Studio Caldo) — 10 pagine HTML
```

## Cosa contiene il sito ufficiale (root)

- Mesh gradient background mouse-reactive (lavender/cyan/mint blobs)
- Hero con "Cura gentile. Risultati veri." weight-coded
- Sezione servizi asymmetric Prototype-style con counter + parallax hover
- Team completo con portrait desat→satura on hover
- Casi clinici slider drag prima/dopo con 8 SVG dental specifici
- Smile design upload con preview canvas client-side
- Calendar inline mockup per prenotazione online (Cal.com style)
- Tour 360° dello studio
- Blog con 4 articoli divulgativi
- Compliance IT (direttore sanitario, P.IVA, schema JSON-LD `Dentist`)

## Brief Studio Ferretti

- **Sede unica**: Via Triumplina 45, 25136 Brescia
- **Fondazione**: 1998 · 28 anni di pratica
- **Direttore sanitario**: Dr. Marco Ferretti · Albo Brescia n. 4567
- **Team**: 10 persone (5 medici + 2 igieniste + 2 assistenti + 1 segreteria)
- **Servizi**: 8 categorie (prevenzione, conservativa, endodonzia, ortodonzia, implantologia, chirurgia, parodontologia, pedodonzia) + 2 sub (estetica, sedazione cosciente)

## Test locale

```bash
python -m http.server 8000
```

Apri `http://localhost:8000/` (sito ufficiale) o `http://localhost:8000/v1-warm/` (preview V1).

## Deploy

Branch `master` → produzione automatica su Cloudflare Pages.
Branch `design-exploration` → preview deploy separato.

## Crediti foto/video

- Foto **team** (10): Unsplash (licenza Unsplash free)
- Foto **servizi/tecnologie/blog hero/studio**: mix Unsplash + Picsum Photos placeholder
- **Before/after** (16 file): SVG dental mockup originali
- **Panorami 360°** (4 file): SVG mockup originali (illustrazioni stilizzate degli ambienti clinici)

## Note

Sito demo per portfolio personale. Studio Dentistico Ferretti è un'entità ipotetica — qualsiasi corrispondenza con studi reali è puramente casuale. P.IVA, numero albo, indirizzo sono placeholder.

**Compliance italiana** rispettata: direttore sanitario nominativo, P.IVA, ordine, schema JSON-LD `Dentist`/`BlogPosting`. Nessun aggregatore esterno per recensioni — solo Google Reviews integrate native.

**WCAG 2.1 AA**: contrast minimo, focus ring visibile, `prefers-reduced-motion` rispettato in entrambe le demo + tour 360°.

—
[Codice GitHub](https://github.com/alessiocalderaro1-cmd/studio-dentistico-ferretti)
