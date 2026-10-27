# Prostě Dřevo

Responzivní jednostránkový web fiktivní české značky palivového dřeva. Sortiment, ceny, oblast rozvozu i podmínky jsou pouze snadno nahraditelný demonstrační obsah, nikoli skutečná obchodní nabídka.

## Lokální spuštění

Vyžaduje Node.js 20 nebo novější.

```bash
npm ci
npm run dev
```

Vývojový server vypíše lokální adresu (obvykle `http://localhost:5173`). Produkční náhled:

```bash
npm run build
npm run preview
```

Testy spustíte příkazem `npm test`.

Vite ukládá sestavení a vývojovou cache do dočasného systémového adresáře,
takže příkazy fungují i při připojení zdrojového adresáře pouze pro čtení.

## Soukromí a demonstrační údaje

Objednávkový formulář je pouze interaktivní ukázka. Neodesílá síťový požadavek, data neukládá a po úspěšné místní validaci zobrazí jen české potvrzení v prohlížeči. Veškeré ceny, dopravní vzdálenosti, podmínky a značka jsou fiktivní; před skutečným nasazením je nutné je nahradit ověřenými údaji provozovatele.
