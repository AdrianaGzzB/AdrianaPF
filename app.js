//----------------------variables---------------------------------------------
const formulario = document.getElementById('agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')
<<<<<<< Updated upstream
const filtrarCategoria = document.getElementById('agregar-filtro')
const filtterArray=[]
let cantidadCategoria=Number

=======
const filtrarCategoria = document.getElementById("boton-filtro")
const listaCategorias = document.querySelectorAll('#categorias ul')
const resetearApp=document.getElementById('boton-reset')
const agregarPresupuesto=document.getElementById('botonAgregarPrespuesto')
>>>>>>> Stashed changes
//--------------------------eventos-----------------------

eventListeners()

function eventListeners() {
     //agregarPresupuesto.addEventListener('click', preguntarPresupuesto)
     document.addEventListener('click', preguntarPresupuesto)
     formulario.addEventListener('submit', agregarGasto)
     filtrarCategoria.addEventListener('click', filtroCategorias)
     gastoListado.addEventListener('click', eliminarGasto)
<<<<<<< Updated upstream


 }
=======
     
     //listaCategorias.addEventListener('click', cerrarCategoria)
     filtrarCategoria.addEventListener('click', agregarCategorias)//metodo
     resetearApp.addEventListener('click',resetApp)
    
}
>>>>>>> Stashed changes

 //---------------------Clases----------------------------------------
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto)//es el presupuesto definido por el usuario
        this.restante = Number(presupuesto)// es la cantidad que queda despues de un gasto, al inicio vale lo mismo que presupuesto
<<<<<<< Updated upstream
        this.gastos = []//arreglo de todos los gastos generados
        this.categorias=[]//
        this.filtterArray=[] //
        this.pocentaje=Number(0)//pocentaje de lo gastado
        this.gastado=Number(0)//total de la cantidad gastada
        this.cantidadCategoria=Number(0) //cantidad de gastos por cada categoria
=======
        this.gastos = []//son todos los gastos generados
        this.categorias=[]//es el total de categorias en las que se hicieron gastos
        this.categoriaFiltrada=[] //son los gastos generados dentro de una sola categoria
        this.porcentaje=Number(0)//porcentaje de lo gastado
        this.gastado=Number(0)//total de la cantidad gastada
        this.totalCategoria=Number(0) //es el total de gastos de una sola categoria filtrada

    }

    resetApp(){
        this.presupuesto = Number(0)
        this.restante = Number(0)
        this.gastos = []
        this.categorias=[]
        this.categoriaFiltrada=[] 
        this.porcentaje=Number(0)
        this.gastado=Number(0)
        this.totalCategoria=Number(0) 
>>>>>>> Stashed changes
    }

    filtrarCategoria(myJSON, categoria){
      filtterArray=myJSON.filter(elem=>elem.campo===categoria)// aqui me traigo del campo los objetos 
      cantidadCategoria=filtterArray.reduce((acc, elem)=>acc+elem.cantidad, 0)//del los objetos que obtuvo se hace una sumatoria
    console.log('arregloFiltrado', this.filtterArray)
    console.log('cantidadcategoria',this.cantidadCategoria)
    } 
    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto]
        this.categoriasDistintas(this.gastos)
        this.calcularRestante()
        console.log('arreglo de gastos',gastos)
    }

    categoriasDistintas(myJSON){
        this.categorias = [...new Set(myJSON.map(elem =>elem.campo))] //se trae solo los campos que existe
        console.log('categorias con gasto',this.categorias) 
        console.log('todos los gastos guardados en el JSON', myJSON)   
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id); //tal vez se necesite cambiar a string
        this.calcularRestante()
    }
    editarGasto(gastoActualizado){
      this.gastos=this.gastos.filter(gasto=>gasto.id===gastoActualizado.id ? gastoActualizado:gasto)  
    }

//reduce
    calcularRestante() {
        this.gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0)
        this.restante = this.presupuesto - this.gastado
        this.porcentaje = this.gastado * 100 / this.presupuesto 
        console.log('gastado1',this.gastado)
        console.log('restante1',this.restante)
        console.log('porcentaje1',this.pocentaje)
    }
}
class UI {
    insertarPresupuesto(cantidad) {
        //Extrayendo los valores 
<<<<<<< Updated upstream
        const { presupuesto, restante, gastado } = cantidad;
        //agregando al HTML
        document.querySelector('#total').textContent = presupuesto
        document.querySelector('#restante').textContent = restante
        document.querySelector('#gastado').textContent= gastado
=======
        const { presupuesto, restante, gastado, porcentaje } = cantidad;
        const inicio=document.getElementById('inicio');
        const resumen=document.getElementById('resumen')
        
        //agregando al HTML
        document.querySelector('#total').textContent = presupuesto
        document.querySelector('#restante').textContent = restante
        document.querySelector('#gastado').textContent = gastado
        //document.querySelector('#porcentaje').textContent = porcentaje
        inicio.style.display='none';
        resumen.style.display='block';
>>>>>>> Stashed changes
    }
    imprimirAlerta(mensaje, tipo) {
            const divMensaje = document.createElement('div')
            divMensaje.classList.add('text-center', 'alert')

            //si es de tipo error se agrega una clase
            if (tipo === 'error') {
                divMensaje.classList.add('alert-danger')

            } else {
                divMensaje.classList.add('alert-success')
            }
            //mensaje de error
            divMensaje.textContent = mensaje;
            document.querySelector('.primario').insertBefore(divMensaje, formulario)
            setTimeout(() => {
                document.querySelector('.primario .alert').remove();
            }, 3000)
        }
        //insertar los gastos a la lista 
        agregarGastoLista(gastos) {
        this.limpiarHTML()
            //iterar 
        gastos.forEach(gasto => {
            const { nombre, cantidad, id, campo} = gasto
           
            //Crear un lista
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center'
            nuevoGasto.dataset.id = id;
<<<<<<< Updated upstream
            nuevoGasto.innerHTML = ` ${nombre}    $${  cantidad}   ${  campo} `
            //borrar gasto boton
=======
            nuevoGasto.innerHTML = ` ${nombre}    $${  cantidad}   ${  select} `
            //boton editar gasto
            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn', 'btn-primary', 'editar-gasto')
            btnEditar.textContent = 'Editar'
            btnEditar.onclick = () => editarGasto(gasto)
            //boton borrar gasto
>>>>>>> Stashed changes
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
            btnBorrar.textContent = 'Borrar'
            btnBorrar.onclick = () => eliminarGasto(id)
            


            const btnBorrar1 = document.createElement('button')
            btnBorrar1.classList.add('btn', 'btn-danger', 'editar-gasto')
            btnBorrar1.textContent = 'Borrar'
            btnBorrar1.onclick = () => eliminarGasto(id)

            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn', 'btn-agregar', 'editar-gasto')
            btnEditar.textContent = 'Editar'
            btnEditar.onclick = (gasto) => editarGasto(id)
            nuevoGasto.appendChild(btnBorrar);
            //Insertar en HTML
            gastoListado.appendChild(nuevoGasto)
        });
    }
    actualizarRestante(restante) {
        document.querySelector('span#restante').textContent = restante
    }
    actualizarGastado(gastado){
        document.querySelector('span#gastado').textContent = gastado
    }
<<<<<<< Updated upstream
=======
    actualizarPorcentaje(porcentaje){
        document.getElementById('porcentaje').style.width = porcentaje+'%';
        document.getElementById('divTotalFiltrado').style.display='none';
    }
    imprimeGastosFiltrados(presupuesto){
        this.agregarGastoLista(presupuesto.this.filtrarCategoria)
        document.querySelector('span#totalFiltrado').textContent='Total Filtrado:$'+ presupuesto. this.totalCategoria;
        document.getElementById('divTotalFiltrado').style.display='block';
    }
>>>>>>> Stashed changes

    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj
        const restanteDiv = document.querySelector('.restante')
        formulario.querySelector('button[type="submit"]').disabled = false

        //Para controlar como vamos, comprobar el 25%
        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning')
            restanteDiv.classList.add('alert-danger')
        } else if ((presupuesto / 2) > restante) {
            //checar de nuevo, comprobar el 50%
            restanteDiv.classList.remove('alert-success', 'alert-danger')
            restanteDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning')
            restanteDiv.classList.add('alert-success');
        }
        //si el presupuesto es igual a 0
        if (restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error')
            formulario.querySelector('button[type="submit"]').disabled = true
        }
    }

    limpiarHTML() {
        //eliminar todo y dejar limpio
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild)
        }
       
    }
}

const ui = new UI();
let presupuesto;
let modificando=false;
const gastoObj={nombre:'', cantidad:'',select:''}
//---------------Funciones------------------------

function preguntarPresupuesto() {
<<<<<<< Updated upstream
    const presupuestoUsuario = prompt('¿Monto del presupuesto?');
=======
    /*const iniciarApp = document.getElementById('boton-presupuesto')
    iniciarApp.onclick=()=> validarPresupuesto();*/
    const presupuestoUsuario = document.getElementById('idPresupuesto').value;
    //console.log('presupuestoUsuario',presupuestoUsuario)
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario) 
    ui.insertarPresupuesto(presupuesto)

    //presupuestoUsuario.onclick= ()=> validarPresupuesto();
}
/*function validarPresupuesto(){
    alert('hola')
    console.log('presupuestoUsuario',presupuestoUsuario)
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario) 
    ui.insertarPresupuesto(presupuesto)
}*/

    /*const presupuestoUsuario = prompt('¿Monto del presupuesto?');
>>>>>>> Stashed changes
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario) 
    ui.insertarPresupuesto(presupuesto)
}*/

function agregarGasto(e) {
    e.preventDefault();
    //leer del formulario los gtos 
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value)
    const campo= document.querySelector('#campo').value;
    const maximo = presupuesto.restante

    //Comprobar que los campos no esten vacios
    if (nombre === '' || cantidad === ''|| campo==='') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no válida', 'error')
    } else if(nombre===Number){
        ui.imprimirAlerta('Caracter no valido', 'error')

    } else if (cantidad > maximo) {
        ui.imprimirAlerta('Saldo Insuficiente', 'error')
    } else {

        const gasto = { nombre, cantidad, campo, id: Date.now() }
        //añadir nuevo gasto
        presupuesto.nuevoGasto(gasto)
        const { gastos } = presupuesto
        ui.agregarGastoLista(gastos)
        const { restante } = presupuesto//actualizar el presupuesto restante
        ui.actualizarRestante(restante)
<<<<<<< Updated upstream
        const { gastado } = this.presupuesto-this.restante
        ui.actualizarGastado(gastado)//actualizar lo gastado
        ui.comprobarPresupuesto(presupuesto)// avisa si se va terminando el presupuesto
=======
        const { gastado } = presupuesto
        ui.actualizarGastado(gastado)//actualizar el porcentaje
        const { porcentaje } = presupuesto
        ui.actualizarPorcentaje(porcentaje)
        ui.comprobarPresupuesto(presupuesto)
>>>>>>> Stashed changes
        formulario.reset()//limpiar el formulario
    }/*
    if (modificando) {
        gastos.editarGasto({ ...gastoObj })
        ui.imprimirAlerta('Se guardaron los cambios', 'correcto')
        formulario.querySelector('button[type="submit"]').textContent = 'Agregar Gasto'
        modificando = false
    } else {

        gastoObj.id = Date.now()
        presupuesto.nuevoGasto({ ...gastoObj })
        ui.imprimirAlerta('Gasto Realizado', 'correcto')
    }
    ui.imprimirAlerta(gastos)
    limpiarGastoObj();
    formulario.reset();*/
}
<<<<<<< Updated upstream
function editarGasto(id){

}

function filtroCategorias(){
    ui.categoriasDistintas(myJSON)
=======
function limpiarGastoObj(){
    gastoObj.nombre='';
    gastoObj.cantidad='';
    gastoObj.select='';
}
function eliminarGasto(id) {
    presupuesto.eliminarGasto(id)
    const { gastos, restante, gastado,categorias } = presupuesto;
    ui.agregarGastoLista(gastos);
    //ui.agregarCategoriaLista(categorias)
    ui.actualizarRestante(restante);
    ui.actualizarGastado(gastado);
    ui.comprobarPresupuesto(presupuesto);
}
function editarGasto(gasto){
    const { nombre, cantidad, select} = gasto;
    //reinicia el objeto
    gastoObj.nombre=nombre;
    gastoObj.cantidad=cantidad;
    gastoObj.select=select;
    //llenar los input
    nombre.value=nombre;
    cantidad.value=cantidad;
    select.value=select;
    formulario.querySelector('button[type="submit"]').textContent='Guardar Cambios';
    modificando=true
}
function agregarCategorias(){
    const categorias=presupuesto.categorias
    const categoriaFiltrada=presupuesto.categoriaFiltrada
    console.log('categoriasF',categorias)
    document.getElementById("agregar-categoria").options.length=0
    const select=document.querySelector('#agregar-categoria')
    categorias.forEach((elem) => {
    //es una instancia del objeto select
    //le estamos pasando al option dentro del parentesis como valor elem y como texto elem
    //con el null le decimos que cree una nueva y no planche lo que existe    
    select.add(new Option(elem,elem),null)
    })
    select.onclick= ()=> {
    const categoria=select.value
    console.log('categoria',categoria)
    presupuesto.filtrarCategoria(categoria)
    
    //iterar 
    //hay que limpiar
    console.log('categoriaFiltrada',categoriaFiltrada)
    presupuesto.categoriaFiltrada.forEach(categoria => {
        const { nombre, cantidad, select} = categoria
        console.log('gastoFiltrado',categoria)
        //Crear un lista
        const nuevaCategoria = document.createElement('li');
        //console.log('nuevaCategoria',nuevaCategoria)
        nuevaCategoria.innerHTML = ` ${nombre}    $${  cantidad}   ${  select} `
        //console.log('nuevaCategoria',nuevaCategoria)
        listaCategorias.appendChild(nuevaCategoria)  
    });
  }
>>>>>>> Stashed changes
}


function resetApp() {
    while (gastoListado.firstChild) {
        gastoListado.removeChild(gastoListado.firstChild)
    }
    ui.insertarPresupuesto(cantidad)
}
//cuando eliminas un solo gasto
<<<<<<< Updated upstream
function eliminarGasto(id) {
    presupuesto.eliminarGasto(id)
    const { gastos, restante, gastado } = presupuesto;
    ui.agregarGastoLista(gastos);
    ui.actualizarRestante(restante);
    ui.actualizarGastado(gastado);
    ui.comprobarPresupuesto(presupuesto);
}
=======
>>>>>>> Stashed changes
