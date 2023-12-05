import * as seged from "./seged.js";

let szamjegyek, egyikSzam, masikSzam, osszeg, maradek;
//szamjegyek := szám
//egyikSzam := szám
//masikSzam := szám
//osszeg := szám
//maradek := tömb

let SzamolMaradek = () =>{
    let a, b, maradek = [];

    for (let i = szamjegyek; i > 0; i--) {
        a = parseInt(String(egyikSzam)[szamjegyek - i] ?? '0');
        b = parseInt(String(masikSzam)[szamjegyek - i] ?? '0');
        maradek.push(Math.floor((a + b + (maradek[i]==undefined ? 0 : maradek[i])) / 10));
    }

    return maradek;
}

let General = () =>{
    szamjegyek = seged.Beker("Hány számjegyből álljanak az összeadás tagjai?");
    egyikSzam = seged.GeneralSzamok(szamjegyek);
    masikSzam = seged.GeneralSzamok(szamjegyek);
    osszeg = egyikSzam + masikSzam;
    maradek = SzamolMaradek();

    seged.GeneralTable(['elsoSzam', 'masodikSzam', 'maradek', 'osszeg', 'segitseg'], szamjegyek);
    seged.LetiltSorok(['elsoSzam0', 'masodikSzam0', `maradek${szamjegyek}`]);
    seged.FeltoltSorok(szamjegyek, '+', egyikSzam, masikSzam);

    [...document.querySelectorAll("[id^='segitseg'] input")].map((button) => {
        let id = button.parentElement.id.substring(8);
        
        button.addEventListener('click', () => seged.Segitseg("osszeg", id, osszeg, szamjegyek, maradek));

        if(id != szamjegyek)
            button.disabled = true;
    });

    document.getElementById('ellenorzes').addEventListener('click', () => seged.Ellenoriz(szamjegyek, "[id^='osszeg'] input", osszeg, maradek));
    document.getElementById('ujra').addEventListener('click', location.reload);
    document.getElementById('megold').addEventListener('click', () => seged.Megold("[id^='osszeg'] input", osszeg, szamjegyek, maradek));
}

General();