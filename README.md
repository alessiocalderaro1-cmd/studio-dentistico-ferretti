# Studio Dentistico Ferretti — 2 demo del portfolio

Portfolio personale di **Alessio Calderaro**. Due interpretazioni visive radicalmente diverse dello stesso brief — uno studio dentistico ipotetico a Brescia con 10 persone, 8 servizi e compliance italiana — più un tour 360° condiviso.

## Le 2 demo ufficiali

| Demo | Mood | Skill base | URL |
|---|---|---|---|
| **V1 — Studio Caldo** | warm-editorial · family-lifestyle · anti-clinico | `dentologie-design` | [/v1-warm/](v1-warm/index.html) |
| **V3 — Studio del Futuro** | light-cool · tech-wellness · digital-first | `worldofnrg-design` + `prototypestudio-design` | [/v3-tech/](v3-tech/index.html) |

Più: **Tour 360°** condiviso (Three.js + 4 panorami SVG mockup dental + 2 themes via `?theme=v1|v3`)

La root del repo (`/`) reindirizza a V3 (demo principale). V1 resta accessibile via `/v1-warm/`.

## Stack tecnico

- HTML5 + CSS3 + JavaScript vanilla (ES modules)
- Cloudflare Pages (deploy automatico via GitHub)
- Bunny Fonts (GDPR-compliant)
- Three.js v0.160 via CDN per il tour 360°
- Lenis via CDN per smooth scroll (V3)
- Zero framework, zero build, zero npm

## Struttura repo

```
/                          → redirect a /v3-tech/ (Cloudflare Pages _redirects)
/v1-warm/                  Demo 1 — 10 pagine HTML (Studio Caldo)
/v3-tech/                  Demo 3 — 10 pagine HTML (Studio del Futuro)
/tour-360/                 Tour virtuale Three.js (themes V1 + V3)
/shared/                   Asset comuni (immagini, video, JS helpers, blog markdown)
```

## Cosa contiene ogni demo

Ogni demo è un sito completo standalone con 10 pagine HTML:
- `index.html` — homepage
- `servizi.html` — 8 aree cliniche
- `team.html` — 10 membri staff
- `chi-siamo.html` / `chi-siamo.html` — storia, valori, compliance
- `prenotazione.html` — form prenotazione
- `contatti.html` — NAP + mappa + orari
- `casi-clinici.html` — 8 casi prima/dopo con slider drag
- `smile-design.html` — upload sorriso + preview canvas
- `blog.html` + `blog/[4 articoli].html` — pubblicazioni educative

Differenziatori condivisi tra V1 e V3:
- Presentazione completa team (10 persone)
- Casi clinici before/after con slider drag (16 SVG dental specifici)
- Smile design upload con preview canvas
- Tour 360° (su `/tour-360/?theme=v1` o `?theme=v3`)
- Compliance IT (direttore sanitario, P.IVA, schema JSON-LD `Dentist`)

V3 ha in più:
- Mesh gradient background mouse-reactive (lavender/cyan blobs)
- Calendar inline mockup per prenotazione online
- Layout servizi asymmetric Prototype-style con counter + parallax hover

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

Apri `http://localhost:8000/v3-tech/` o `http://localhost:8000/v1-warm/`

## Deploy

Push su `design-exploration` → Cloudflare Pages preview build automatico.
Merge su `master` → produzione.

## Crediti foto/video

- Foto **team** (10): Unsplash (licenza Unsplash free)
- Foto **servizi/tecnologie/blog hero/studio**: mix Unsplash + Picsum Photos placeholder
- **Before/after** (16 file): SVG dental mockup originali
- **Panorami 360°** (4 file): SVG mockup originali (illustrazioni stilizzate degli ambienti clinici)
- **Video hero** (V1/V3 non lo usano più dopo cleanup): Pexels free

## Note

Sito demo per portfolio personale. Studio Dentistico Ferretti è un'entità ipotetica — qualsiasi corrispondenza con studi reali è puramente casuale. P.IVA, numero albo, indirizzo sono placeholder.

**Compliance italiana** rispettata in entrambe le demo: direttore sanitario nominativo, P.IVA, ordine, schema JSON-LD `Dentist`/`BlogPosting`. Nessun aggregatore esterno per recensioni — solo Google Reviews integrate native.

**WCAG 2.1 AA**: contrast minimo, focus ring visibile, `prefers-reduced-motion` rispettato in V1, V3 e tour 360°.

—
[Codice GitHub](https://github.com/alessiocalderaro1-cmd/studio-dentistico-ferretti)
