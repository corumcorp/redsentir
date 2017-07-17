var posy = 0;
function inicio(){
    setTimeout('mostrar("ciudad")',7000);    
    setTimeout('mostrar("logo-corum")',3000);
    setTimeout('mostrar("logo-red-sentir")',4000);
    setTimeout('mostrar("personajes")',5000);
    var tiempo = 7000;
    for (i=0;i < 100;i++){
        tiempo = tiempo + 1000*i;
        setTimeout('mover("personajes")',tiempo);        
    }
    setTimeout('mostrar("logo-guia")',6000);
}
function mostrar(elemento){
    document.getElementById(elemento).style.display = 'block';
}

function mover(elemento){
    document.getElementById(elemento).style.top = posy + 20;
}

$(document).ready(function(){
   alert("hola");
});