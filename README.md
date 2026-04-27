# Studio Dentistico Ferretti — Case study di design exploration

Portfolio personale di **Alessio Calderaro**. Lo stesso brief — uno studio dentistico ipotetico a Brescia con 10 persone, 8 servizi, compliance italiana — declinato in **4 letture visive radicalmente diverse**, più un tour 360° condiviso.

## Le 4 varianti

| # | Variante | Skill base | Mood | URL |
|---|---|---|---|---|
| V1 | Studio Caldo | `dentologie-design` | warm-editorial · family-lifestyle · anti-clinico | [/v1-warm/](v1-warm/index.html) |
| V2 | Ambulatorio Autorevole | `si-oral-surgery-design` | dark-medical · clinical-conversion · pulse glow CTA | [/v2-medical/](v2-medical/index.html) |
| V3 | Studio del Futuro | `worldofnrg-design` | light-cool · tech-wellness · weight-coded mono-family | [/v3-tech/](v3-tech/index.html) |
| V4 | Atelier del Sorriso | `prototypestudio-design` | noir-luxury · achromatic + champagne · cinematic | [/v4-atelier/](v4-atelier/index.html) |

Più: **Tour 360°** condiviso (Three.js + design `threejs-journey` + 4 themes via `?theme=v1|v2|v3|v4`)

## Stack tecnico

- HTML5 + CSS3 + JavaScript vanilla (ES modules)
- Cloudflare Pages (deploy automatico via GitHub)
- Bunny Fonts (GDPR-compliant)
- Three.js v0.160 via CDN per il tour 360°
- Lenis (V3 + V4) via CDN per smooth scroll
- Zero framework, zero build, zero npm

## Struttura

```
/                          Landing showcase root
/v1-warm/                  Variante 1 — 10 pagine HTML
/v2-medical/               Variante 2 — 10 pagine HTML
/v3-tech/                  Variante 3 — 10 pagine HTML
/v4-atelier/               Variante 4 — 10 pagine HTML
/tour-360/                 Tour virtuale Three.js (4 themes)
/shared/                   Asset comuni (immagini, video, JS helpers, blog markdown)
```

## Brief Studio Ferretti

- **Sede unica**: Via Triumplina 45, 25136 Brescia
- **Fondazione**: 1998 · 28 anni di pratica
- **Direttore sanitario**: Dr. Marco Ferretti · Albo Brescia n. 4567
- **Team**: 10 persone (5 medici + 2 igieniste + 2 assistenti + 1 segreteria)
- **Servizi**: 8 categorie (prevenzione, conservativa, endodonzia, ortodonzia, implantologia, chirurgia, parodontologia, pedodonzia) + 2 sub (estetica, sedazione cosciente)

## Differenziatori condivisi (in tutte 4 varianti)

1. **Presentazione completa del personale** — 10 membri visibili, pattern visivo per variante
2. **Casi clinici before/after** — slider drag pre→post (4 in homepage + 8 in pagina dedicata)
3. **Smile design upload** — input file + preview canvas + form lead-gen
4. **Tour 360° clinica** — pagina condivisa, tematizzata per variante via query param
5. **Pagine secondarie complete** — 10 pagine HTML reali per ogni variante
6. **Blog 4 articoli** — contenuto condiviso, styling per variante

## Test locale

```bash
python -m http.server 8000
```

Apri `http://localhost:8000/`

## Deploy

Push su `design-exploration` → Cloudflare Pages preview build automatico.
Merge su `master` → produzione.

## Crediti foto/video

- Foto **team** (10): Unsplash (licenza Unsplash free, attribution non obbligatoria ma raccomandata)
- Foto **servizi/tecnologie/blog hero/before-after/studio**: mix Unsplash + Picsum Photos placeholder
- Foto **panorami 360°** (4): Pannellum.org demo equirectangular
- Video **hero V4**: Pexels (licenza Pexels free, attribution facoltativa)
- Foto sostituibili in qualsiasi momento mantenendo la struttura cartelle.

## Note finali

Sito demo per portfolio personale. Studio Dentistico Ferretti è un'entità ipotetica — qualsiasi corrispondenza con studi reali è puramente casuale. P.IVA, numero albo, indirizzo sono placeholder.

**Compliance italiana** rispettata in ogni variante: direttore sanitario nominativo, P.IVA, ordine, schema JSON-LD `Dentist`/`BlogPosting`. Nessun aggregatore esterno (Trustpilot/Feedaty) per recensioni — solo Google Reviews integrate native.

**WCAG 2.1 AA**: contrast minimo, focus ring visibile, `prefers-reduced-motion` rispettato in tutte le 4 varianti + tour 360°.

—
[Codice GitHub](https://github.com/alessiocalderaro1-cmd/studio-dentistico-ferretti)
