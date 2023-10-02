var table = document.getElementById("table");
var jo = document.getElementById("jo");
var nemjo = document.getElementById("nemjo");
var mezok = Array.prototype.slice.call(document.getElementsByTagName("td"));
var kivalasztott
var input;

function Start(){
    let index = parseInt(Math.random() * mezok.length);
    kivalasztott = mezok[index];
    
    input = document.createElement("input");
    input.setAttribute("type", "number");
    
    kivalasztott.appendChild(input);
    
    mezok.splice(index, 1);
}

function Ellenoriz(){
    let lista = Array.prototype.slice.call(kivalasztott.parentElement.children);

     let beirtSzam = parseInt(input.value);
     let sor = parseInt(lista[0].innerText);
     let oszlop = parseInt(lista.indexOf(kivalasztott));

     kivalasztott.removeChild(input);
     kivalasztott.innerText = beirtSzam;

     if(beirtSzam === sor * oszlop){
        kivalasztott.classList.add("jo");
        jo.innerText = parseInt(jo.innerText) + 1;
    }else{
        kivalasztott.classList.add("nemjo");
        nemjo.innerText = parseInt(nemjo.innerText) + 1;

    }
}