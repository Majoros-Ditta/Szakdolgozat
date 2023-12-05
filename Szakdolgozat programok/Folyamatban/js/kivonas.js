import * as seged from "./seged.js";

let szamjegyek, egyikSzam, masikSzam, kulonbseg, maradek;
//szamjegyek := szám
//egyikSzam := szám
//masikSzam := szám
//kulonbseg := szám
//maradek := tömb

let SzamolMaradek = () =>{
    let a, b, maradek = [];

    for (let i = szamjegyek; i > 0; i--) {
        a = parseInt(String(egyikSzam)[szamjegyek - i] ?? '0');
        b = parseInt(String(masikSzam)[szamjegyek - i] ?? '0');
        maradek.push(Math.abs(Math.floor((a - b - (maradek[i]==undefined ? 0 : maradek[i])) / 10)));
    }

    return maradek;
}

let General = () =>{
    szamjegyek = seged.Beker("Hány számjegyből álljanak a kivonás tagjai?");

    let temp = [seged.GeneralSzamok(szamjegyek), seged.GeneralSzamok(szamjegyek)];
    egyikSzam = Math.max(...temp);
    masikSzam = Math.min(...temp);

    kulonbseg = egyikSzam - masikSzam;
    maradek = SzamolMaradek();

    seged.GeneralTable(['elsoSzam', 'masodikSzam', 'maradek', 'kulonbseg', 'segitseg'], szamjegyek);
    seged.LetiltSorok(['elsoSzam0', 'masodikSzam0', `maradek${szamjegyek}`]);
    seged.FeltoltSorok(szamjegyek, '-', egyikSzam, masikSzam);

    [...document.querySelectorAll("[id^='segitseg'] input")].map((button) => {
        let id = button.parentElement.id.substring(8);
        
        button.addEventListener('click', () => seged.Segitseg("kulonbseg", id, kulonbseg, szamjegyek));

        if(id != szamjegyek)
            button.disabled = true;
    });

    document.getElementById('ellenorzes').addEventListener('click', () => seged.Ellenoriz(szamjegyek, "[id^='kulonbseg'] input", kulonbseg, maradek));
    document.getElementById('ujra').addEventListener('click', location.reload);
    document.getElementById('megold').addEventListener('click', () => seged.Megold("[id^='kulonbseg'] input", kulonbseg, szamjegyek, maradek));

    console.log(`egyikSzam: ${egyikSzam}\nmasikSzam: ${masikSzam}\nkulonbseg: ${kulonbseg}\nmaradek: ${maradek}`);
}

General();