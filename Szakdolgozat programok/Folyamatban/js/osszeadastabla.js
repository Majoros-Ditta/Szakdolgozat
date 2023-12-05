let table, jo, nemjo, mezok, kivalasztott, input;
//table := <table>
// jo := jól megoldottak <span>
//nemjo := nem jól megoldottak <span>
//mezok := az összes <td>
//kivalasztott := egy kiválasztott <td>
//input := kiválasztotban lévő <input>

let CsereAllapot = () => [...document.querySelectorAll('button')].map((button) => button.disabled = !button.disabled);
        
let Start = () => {
    let index = parseInt(Math.random() * mezok.length);
    kivalasztott = mezok.splice(index, 1)[0];
    
    input = document.createElement("input");
    input.setAttribute("type", "text");
    
    kivalasztott.appendChild(input);

    input.focus();

    CsereAllapot();
}

let Ellenoriz = () => {
    let lista = [...kivalasztott.parentElement.children];

    let beirtSzam = input.value;
    let sor = parseInt(lista[0].innerText);
    let oszlop = parseInt(lista.indexOf(kivalasztott));

    kivalasztott.removeChild(input);
    kivalasztott.innerText = beirtSzam;

    if(beirtSzam == sor + oszlop){
    kivalasztott.classList.add("jo");
    jo.innerText = parseInt(jo.innerText) + 1;
    }else{
        kivalasztott.classList.add("nemjo");
        nemjo.innerText = parseInt(nemjo.innerText) + 1;
    }

    CsereAllapot();
}

let General = () => {
    table = document.getElementById("table");
    jo = document.getElementById("jo");
    nemjo = document.getElementById("nemjo");
    mezok = [ ...document.getElementsByTagName("td")];
}