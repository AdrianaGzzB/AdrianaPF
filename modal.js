// modal del carrito
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0];
const filtroModal = document.getElementsByClassName('modal-filtro')[0];
const botonAbrir = document.getElementById('boton-lista');
const botonAbrirFiltro=document.getElementById('boton-filtro')
const botonCerrar = document.getElementById('listaGastosCerrar')
const botonfiltroCerrar = document.getElementById('listaCategoriaCerrar')
botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
});
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
});
botonAbrirFiltro.addEventListener('click', ()=>{
    filtroModal.classList.toggle('modal-active')
});
botonfiltroCerrar.addEventListener('click', ()=>{
    filtroModal.classList.toggle('modal-active')
});

