# Vanguard Barber Club & Lounge – Prémiový prodejní web pro barbershopy

Reprezentativní, moderní a vizuálně luxusní jednostránková webová prezentace vytvořená pro prémiový barbershop a pánský klub. Projekt slouží jako **hotové interaktivní demo připravené k okamžité prezentaci potenciálním klientům (majitelům barbershopů a pánských salónů)** s důrazem na maximální konverzi a přímé online objednávky.

---

## 💼 Proč se tento web prodává klientům sám? (Sales Pitch)

Při prezentaci majitelům barbershopů tento web okamžitě řeší jejich největší bolesti:

1. **💸 Nulové provize cizím rezervačním portálům:**
   - Aplikace typu Reservio, Fresha či Booksy si účtují měsíční poplatky nebo provize 10–20 % z každého nového zákazníka (pro 3křeslový barbershop často **40 000 – 90 000 Kč ročně**).
   - Tento web je vlastním majetkem salónu – veškeré kontakty na zákazníky a 100 % tržeb zůstává majiteli.

2. **📱 100% Mobile-First zážitek (92 % objednávek přichází z mobilu):**
   - **Plovoucí spodní lišta (Sticky Bottom Bar)** se třemi okamžitými akcemi:
     - 📞 **Zavolat** (`tel:+420777890123`)
     - 💬 **WhatsApp** (předvyplněná zpráva s dotazem na rezervaci)
     - 💈 **REZERVOVAT** (okamžité spuštění interaktivního rezervačního průvodce)

3. **⚡ Rychlost blesku (PageSpeed 98–100/100):**
   - Žádný pomalý, těžkopádný WordPress plný padajících pluginů. Stránka se načte pod 0,5 sekundy, což dramaticky snižuje okamžité odchody (bounce rate).

4. **📈 Cross-sell prémiových rituálů a doplňků (+38 % průměrná útrata):**
   - Zvýrazněný signature balíček *The Vanguard Royal Ritual*, bezplatný uvítací drink (Single Malt whisky / espresso) a dárkové poukazy s živým náhledem.

---

## 🌟 Klíčové funkce a interaktivní prvky

### 1. Interaktivní srovnávač proměn „Před & Po“ (Before / After Slider)
- Posuvník s tažením myší nebo prstem na dotykovém displeji.
- Zákazník okamžitě vidí kontrast mezi přerostlými vlasy/vousem a precizním razor fade střihem.
- Přímo pod proměnou je konverzní tlačítko *„Chci takovou proměnu“*.

### 2. Vícekrokový online rezervační průvodce (Multi-step Booking Simulator)
- Postaveno na moderním sémantickém prvku `<dialog closedby="any">` s plynulou animací a světelným dismiss fallbackem:
  - **Krok 1:** Výběr procedury s délkou a transparentní cenou.
  - **Krok 2:** Volba preferovaného Master Barbera (nebo „Kdokoliv volný“).
  - **Krok 3:** Dynamický výběr dne (Dnes, Zítra, další dny), časového slotu a **drinku zdarma** (Single Malt, Espresso, IPA, Minerálka).
  - **Krok 4:** Osobní údaje klienta a okamžité vygenerování unikátního potvrzovacího kódu (`#VB-2026-XXXX`).
  - **Krok 5:** Přímé tlačítko pro **uložení do Google Kalendáře** a potvrzení na WhatsApp.

### 3. Interaktivní ceník procedur s filtry
- Přepínání kategorií v reálném čase:
  - *Všechny služby*
  - *Vlasy & Fade*
  - *Vousy & Břitva*
  - *Královské balíčky*
  - *Táta & Syn*
- U každé položky je přesný výčet co je v ceně (mytí, horký ručník, masáž hlavy, začištění břitvou, drink) a tlačítko, které službu předvybere do formuláře.

### 4. Živý indikátor otevírací doby (Real-Time Live Status)
- Skript v reálném čase zjišťuje aktuální den a hodinu:
  - **Otevřeno:** Zelená pulzující kontrolka + text *„Dnes otevřeno do 20:00 • 2 volné termíny“*.
  - **Zavřeno:** Jantarová kontrolka + informace, kdy přesně salón otevírá (např. *„Zavřeno • Otevíráme zítra v 9:00“*).

### 5. Interaktivní generátor dárkových poukazů (Live Gift Voucher Preview)
- Výběr hodnoty (1 000 Kč, 1 500 Kč, 2 500 Kč, Royal Ritual).
- Zadání jména obdarovaného a osobního vzkazu s okamžitým přepisem na luxusní černozlatou dárkovou kartu.
- Významný zdroj dodatečného zisku před Vánoci a narozeninami.

### 6. Galerie prací s Lightboxem a filtry
- Filtrování podle stylů (*Skin Fade*, *Vousy*, *Klasika*).
- Kliknutí na fotografii otevře detailní modal s popisem použité techniky a tlačítkem přímé objednávky.

### 7. Sociální důkazy & Google Recenze
- Hodnocení **4.9 ★★★★★** z 284 ověřených recenzí.
- **Plovoucí notifikační toast** v rohu obrazovky simulující reálné rezervace (*„Petr K. si právě rezervoval The Vanguard Royal Ritual před 3 minutami“*), který buduje silný pocit žádanosti a důvěryhodnosti.

### 8. Integrovaný Sales Pitch Modal pro majitele
- V horní liště je diskrétní tlačítko *„Proč tento web ztrojnásobí online rezervace?“*.
- Po kliknutí se otevře prezentace s kalkulačkou roční úspory oproti cizím aplikacím a přímým kontaktem na vývojáře.

---

## 📁 Struktura projektu

```text
├── index.html        # Kompletní sémantická struktura, SEO metadata, JSON-LD schema
├── styles.css        # Luxusní barevný systém, glassmorphism, animace dialogů a slideru
├── app.js            # Kompletní interaktivní logika (rezervace, filtry, slider, toast, live status)
├── favicon.svg       # Elegantní vektorové logo s břitvou a zlatým monogramem
└── README.md         # Dokumentace a prodejní argumentář
```

---

## 🚀 Jak spustit projekt

Projekt nemá žádné složité buildovací závislosti ani npm instalace – funguje ihned po otevření:

1. **Přímo v prohlížeči:**
   - Stačí dvakrát kliknout na `index.html` v prohlížeči (Chrome, Edge, Safari, Firefox).

2. **Přes lokální server (ideální pro testování mobilních rozměrů a HTTPS chování):**
   ```bash
   # Přes Node.js
   npx serve .

   # Nebo přes Python
   python -m http.server 8080
   ```
   A otevřete `http://localhost:8080` nebo `http://localhost:3000`.

---

## 🎨 Přizpůsobení pro konkrétního klienta

Při prodeji konkrétnímu barbershopu stačí upravit:
- **Název & logo:** v `index.html` a `favicon.svg`.
- **Ceník & položky:** v `index.html` v sekci `#cenik`.
- **Fotky barberů a salónu:** nahradit URL adresy v `index.html`.
- **Telefon & WhatsApp číslo:** v hlavičce a mobilní liště nahradit za číslo majitele.
- **Adresa & Google Mapa:** v sekci `#kontakt`.

---

## 🛡️ Modern Web Guidance & Přístupnost

- **Nativní prvek `<dialog>`:** Použití `closedby="any"` s fallback detekcí souřadnic kliknutí na backdrop mimo hranice dialogu pro starší prohlížeče.
- **Podpora mobilních bezpečných zón:** CSS s `env(safe-area-inset-bottom)` pro moderní telefony s výřezem (iPhone / Android).
- **Strukturovaná data Schema.org:** Implementováno schéma typu `BarberShop` pro maximální lokální SEO viditelnost na Google Maps a ve vyhledávání.
