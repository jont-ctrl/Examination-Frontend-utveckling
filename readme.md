## Examinationkurs: Frontend utveckling, FilmSamlaren

En sida man kan söka och läsa mer om filmer samt spara filmer som favoriter.

## Hur köra igång:

Klona/ladda ner projektet och öppna index.html filen i din webbläsare.

Använt asynkront async await för att hämta API data med fetch.

Använder JSON för att hämta data från OMDb API som returnerar information om filmer.

Data hämtas via HTTPS för säker kommunikation mellan klienten och servern.

## UX/UI

Sidan är responsiv för olika skärmstorklekar som mobil, tablets, datorer.

Funktion för mörkt / ljus läge finns.

Sökfunktion och favoritlista för bättre användarupplevelse.

## Figma skiss:

https://www.figma.com/design/o92bYqqQkEMpWMZxpI1KoF/FilmSamlaren?node-id=0-1&t=qdqYc5SKwo6TI3JK-1

## API

Filmdatainformation hämtas från publika OMDb API med en gratis api nyckel.
https://www.omdbapi.com/

URL endpoints använts är sökning efter filmer: /apiKey&s={searchTerm}
och detaljer om en specifik film: /apiKey&i={imdbID}&plot=full

## Användning av applikationen

Sök efter film:
Använd sökfältet för att söka efter filmer.
Efter att ha skrivit in en filmtitel och klickat på "Sök" visas resultatet.

## Favoriter:

När du hittar en film du gillar, klicka på hjärta-ikonen för att lägga till filmen i dina favoriter.
För att visa dina favoriter, klicka på fliken "Favoriter".

## Mörkt/ljust läge:

Klicka på sol- eller månskärm-ikonen i headern för att växla mellan mörkt och ljust läge.

## Läs mer om en film:

Klicka på "Läs mer"-knappen för att få mer information om filmen, såsom skådespelare, releaseår, längd, awards och betyg.

## Filstruktur:

index.html: Huvudstruktur för webbapplikationen.
style.css: CSS-stilar för hela sidan.
script.js: JavaScript som hanterar logik för att hämta data från API, söka filmer, hantera favoriter och växla mellan mörkt och ljust läge.
