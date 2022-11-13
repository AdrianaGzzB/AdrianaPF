//--------modal gastos formulario---------
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0];
const botonAbrir = document.getElementById('boton-lista');
const botonCerrar = document.getElementById('btn-agregar')
botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
});

botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
});
//-------modal filtro categoria--------------
const filtroModal = document.getElementsByClassName('modal-filtro')[0];
const botonAbrirFiltro = document.getElementById('boton-filtro')
const btnfiltroCerrar = document.getElementById('filtroCerrar')
botonAbrirFiltro.addEventListener('click', ()=>{
    filtroModal.classList.toggle('modal-active')
});
btnfiltroCerrar.addEventListener('click', ()=>{
    filtroModal.classList.toggle('modal-active')
});
//-------modal inicio--------------
const inicioModal = document.getElementsByClassName('modal-inicio')[0];
const botonAbrirInicio = document.getElementById('boton-inicio')
const btnInicioCerrar = document.getElementById('botonAgregarPresupuesto')
botonAbrirInicio.addEventListener('click', ()=>{
    inicioModal.classList.toggle('modal-active')
});
btnInicioCerrar.addEventListener('click', ()=>{
    inicioModal.classList.toggle('modal-active')
});