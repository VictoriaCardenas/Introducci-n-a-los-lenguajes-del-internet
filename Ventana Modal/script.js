const buttonAbrir=document.getElementById("abrirModalBtn");
const buttonCerrar=document.getElementById("cerrarModalBtn");
const overlay=document.getElementById("modalOverlay");

buttonAbrir.addEventListener("click", function(){
    overlay.classList.add("visible");
})
buttonCerrar.addEventListener("click", function(){
    overlay.classList.remove("visible");
})
overlay.addEventListener("click", function(clickUsuario){
    if(clickUsuario.target===overlay){/*Se evalúa si el usurio dio click dentro del overlay para cerrar el modal*/
        overlay.classList.remove("visible");
    }
})
