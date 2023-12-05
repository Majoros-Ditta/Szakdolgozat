import { Beker, LetiltSorok } from "./seged.js";

let szamjegyek, szorzando, szorzo, szorzat, reszeredmenyek;
//szamjegyek := tömb
//szorzando := szám
//szorzo := szám
//szorzat := szám
//reszeredmenyek := tömb

let GeneralTable = (table) => {
    //SZORZANDÓ ÉS SZORZÓ
    let tr = document.createElement("tr");

    ['elsoSzam', 'masodikSzam'].map((id, index) =>{
        for (let i = 0; i <= szamjegyek[index]; i++) {
            let input, td = document.createElement("td");
            td.setAttribute("id", `${id}${i}`);
    
            input = document.createElement("input");
            input.setAttribute("type", "text");
            
            td.appendChild(input);
            tr.appendChild(td);
        }
    })

    table.appendChild(tr);

    //SZORZÁS JEL
    let jel = document.getElementById('masodikSzam0');
    jel.innerText='*';

    //SZORZÁS VONAL
    tr = document.createElement("tr");
    tr.setAttribute('id', 'vonal');

    let td = document.createElement("td");
    td.setAttribute("colspan", szamjegyek[0]+1);
    
    tr.appendChild(td);
    table.appendChild(tr);

    //RÉSZEREDMÉNYEK
    if(szamjegyek[1] > 1){

        for (let i = 0; i < szamjegyek[1]; i++) {
            tr = document.createElement('tr');
            tr.setAttribute('id', `reszeredmeny${i}`);
            
            if(i > 0){
                let ures = document.createElement('td');
                ures.setAttribute('colspan', String(i));
                tr.appendChild(ures);
            }
            
            for (let j = 0; j <= szamjegyek[0]; j++) {
                let td = document.createElement('td'),
                    input = document.createElement('input');
    
                input.setAttribute('type', 'text');
                td.appendChild(input);

                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        jel = document.querySelector(`#reszeredmeny${szamjegyek[1]-1} td`);
        jel.classList.add("jel");
        jel.innerText='+';

        tr = document.createElement("tr");
        tr.setAttribute('id', 'vonal');

        td = document.createElement("td");
        td.setAttribute("colspan", szamjegyek[0]+szamjegyek[1]);
        
        tr.appendChild(td);
        table.appendChild(tr);
    }

    //SZORZAT
    tr = document.createElement("tr");

    for (let i = 0; i <= szamjegyek[0]+szamjegyek[1]; i++) {

        let input, td = document.createElement("td");
        td.setAttribute("id", `szorzat${i}`);

        input = document.createElement("input");
        input.setAttribute("type", "text");
        
        td.appendChild(input);
        tr.appendChild(td);
    }

    table.appendChild(tr);
}

let GeneralSzamok = (mennyit) => {
    let szam;

    do{
        szam = parseInt(Math.random() * Math.pow(10, mennyit));
    }while(szam / Math.pow(10, mennyit-1) <= 0);

    return szam;
}

let FeltoltSorok = () =>{
    let a = String(szorzando).split(''),
        b = String(szorzo).split('');

    for(let i = 0; i < a.length; i++){
        let mezo = document.querySelector(`#elsoSzam${i+1} input`);
        mezo.value = a[i];
        mezo.disabled = true;
    }

    for(let i = 0; i < b.length; i++){
        let mezo = document.querySelector(`#masodikSzam${i+1} input`);
        mezo.value = b[i];
        mezo.disabled = true;
    }
}

let Ellenoriz = () =>{
    let OsszegInputok = [...document.querySelectorAll("[id^='szorzat'] input")],
        ReszeredmenyInputok = [...document.querySelectorAll("[id^='reszeredmenyek'] input")];

    for (let i = szamjegyek; i >= 0; i--) {
        let ertek = OsszegInputok[i].value == "" ? '0' : OsszegInputok[i].value;
        OsszegInputok[i].classList.add(ertek == String(szorzat).padStart(szamjegyek+1, '0')[i]  ? 'jo' : 'nemjo');
        OsszegInputok[i].disabled = true;

        if(i !== szamjegyek){
            ReszeredmenyInputok[i].classList.add(ReszeredmenyInputok[i].value == reszeredmenyek[i] ? 'jo' : 'nemjo');
            ReszeredmenyInputok[i].disabled = true;
        }
    }


}

let Megold = () =>{
    [...document.querySelectorAll("[id^='szorzat'] input")].map((input, index) =>{
        input.value = String(szorzat).padStart(szamjegyek[0]+1, '0')[index]
    });
    
    document.getElementById('segitseggelMegoldottak').innerText = "megoldás gombbal megoldva";

    [...document.querySelectorAll("[id^='szorzat'] input")].map((input) =>input.disabled = true);
    
    [...document.querySelectorAll("[id^='reszeredmeny']")].forEach((tr, index) => {
        let reszeredmeny = String(reszeredmenyek[index]).padStart(szamjegyek[1], '0');
        [...tr.querySelectorAll("td input")].forEach((input, i) => {
            input.value = reszeredmeny[i];
            input.disabled = true
        })
    })

}

let SzamolReszeredmeny = () =>{
    for (let i = 0; i < szamjegyek[1]; i++) {
        let _szorzo = parseInt(szorzo % Math.pow(10, i+1) / Math.pow(10, i));
        reszeredmenyek[szamjegyek[1]-i-1] = szorzando * _szorzo;
    }
}

let General = () =>{
    szamjegyek = [Beker("Hány számjegyből álljon a szorzandó?"), Beker("Hány számjegyből álljon a szorzó?", 1)]
    
    szorzando = GeneralSzamok(szamjegyek[0]);
    szorzo = GeneralSzamok(szamjegyek[1]);

    szorzat = szorzando * szorzo;
    reszeredmenyek = [];
    SzamolReszeredmeny();

    GeneralTable(document.getElementById("table"));
    LetiltSorok(['elsoSzam0', `szorzat${szamjegyek[0] + szamjegyek[1]}`]);
    FeltoltSorok();

    document.getElementById('ellenorzes').addEventListener('click', () => Ellenoriz());
    document.getElementById('ujra').addEventListener('click', location.reload);
    document.getElementById('megold').addEventListener('click', () => Megold());
}

General();