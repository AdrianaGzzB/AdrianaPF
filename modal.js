//--------modal gastos formulario---------
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0];
const botonAbrir = document.getElementById('boton-lista');
const botonCerrar = document.getElementById('listaGastosCerrar')
botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
});

/*botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
});*/
//-------modal filtro categoria--------------
const filtroModal = document.getElementsByClassName('modal-filtro')[0];
const botonAbrirFiltro = document.getElementById('boton-filtro')
const botonfiltroCerrar = document.getElementById('listaCategoriaCerrar')
botonAbrirFiltro.addEventListener('click', ()=>{
    filtroModal.classList.toggle('modal-active')
});
/*
botonfiltroCerrar.addEventListener('click', ()=>{
    filtroModal.classList.toggle('modal-active')
});*/

