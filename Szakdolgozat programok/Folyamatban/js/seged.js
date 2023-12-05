export let Beker = (szoveg, alap=2) =>{
    let szam;
    
    do{
        szam = parseInt(prompt(szoveg, alap));
    }while(!(szam !== null && szam >= 0));
    
    return szam;
}

export let GeneralTable = (ids, mennyit) => {
    let table = document.getElementById("table");

    ids.map(id =>{
        let tr = document.createElement("tr");
        
        for(let i = 0; i <= mennyit; i++){
            let input;
            let td = document.createElement("td");
            td.setAttribute("id", `${id}${i}`);
            
            input = document.createElement("input");
            input.setAttribute("type", (id === 'segitseg' ? "button" : "text"));
            
            td.appendChild(input);
            tr.appendChild(td);
        }
    
        table.appendChild(tr);
    })

    let tr = table.insertRow(3);
    tr.setAttribute('id', 'vonal');

    let td = document.createElement("td");
    td.setAttribute("colspan", mennyit+1);

    tr.appendChild(td);
}

export let GeneralSzamok = (mennyit) => parseInt(Math.random() * Math.pow(10, mennyit));

export let LetiltSorok = (ids) => {
    ids.map(id =>{
        document.getElementById(id).removeChild(document.querySelector(`#${id} input`));
    })
}

export let FeltoltSorok = (mennyit, jel, egyikSzam, masikSzam) =>{
    let a = String(egyikSzam).split('').reverse(),
        b = String(masikSzam).split('').reverse();

    for(let i = 0; i < a.length; i++){
        let mezo = document.querySelector(`#elsoSzam${mennyit-i} input`);
        mezo.value = a[i];
        mezo.disabled = true;
    }

    for(let i = 0; i < b.length; i++){
        let mezo = document.querySelector(`#masodikSzam${mennyit-i} input`);
        mezo.value = b[i];
        mezo.disabled = true;
    }

    document.getElementById('masodikSzam0').innerText = jel;
}

export let Ellenoriz = (mennyit, eredmenyInputok, eredmeny, maradek) =>{
    let EredmenyInputok = [...document.querySelectorAll(eredmenyInputok)],
        MaradekInputok = [...document.querySelectorAll("[id^='maradek'] input")];

    for (let i = mennyit; i >= 0; i--) {
        let ertek = EredmenyInputok[i].value == "" ? '0' : EredmenyInputok[i].value;
        EredmenyInputok[i].classList.add(ertek == String(eredmeny).padStart(mennyit+1, '0')[i]  ? 'jo' : 'nemjo');
        EredmenyInputok[i].disabled = true;

        if(i !== mennyit){
            MaradekInputok[i].classList.add(MaradekInputok[i].value == maradek[i] ? 'jo' : 'nemjo');
            MaradekInputok[i].disabled = true;
        }
    }
}

export let Megold = (eredmenyInput, eredmeny, szamjegyek, maradek) =>{
    [...document.querySelectorAll(eredmenyInput)].map((input, index) =>{
        input.value = String(eredmeny).padStart(szamjegyek+1, '0')[index]
    });

    [...document.querySelectorAll("[id^='maradek'] input")].map((input, index) =>{
        input.value = maradek.join('').padStart(szamjegyek, '0')[index]
    });

    document.getElementById('segitseggelMegoldottak').innerText = "megoldás gombbal megoldva";

    [...document.querySelectorAll(eredmenyInput)].map((input) =>input.disabled = true);
    [...document.querySelectorAll("[id^='maradek'] input")].map((input) =>input.disabled = true);

    [...document.querySelectorAll("[id^='segitseg'] input")].map((button) => button.hidden = true);
}

export let Segitseg = (eredmenyTipus, index, eredmeny, szamjegyek, maradek) =>{
    document.querySelector(`#segitseg${index} input`).hidden = true;
    document.querySelector(`#${eredmenyTipus}${index} input`).value = String(eredmeny).padStart(szamjegyek+1, '0')[index]
    
    if(index != 0){
        document.querySelector(`#segitseg${index-1} input`).disabled = false;
        document.querySelector(`#maradek${index-1} input`).value = maradek.join('').padStart(szamjegyek, '0')[index-1];
    }
    
    document.getElementById('segitseggelMegoldottak').innerText-= -1;
}