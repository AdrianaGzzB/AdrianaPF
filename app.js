//----------------------variables---------------------------------------------
const formulario = document.getElementById('agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')
const filtrarCategoria = document.getElementById("boton-filtro")
const listaCategorias = document.querySelector('#categorias ul')
const resetearApp = document.getElementById('boton-reset')
const InicioApp = document.getElementById('botonAgregarPresupuesto')
let gastos=[];


//--------------------------eventos-----------------------
eventListeners()
function eventListeners() {
    InicioApp.addEventListener('click', preguntarPresupuesto)
    formulario.addEventListener('submit', agregarGasto)
    gastoListado.addEventListener('click', eliminarGasto)
    filtrarCategoria.addEventListener('click', agregarCategorias)//metodo
    resetearApp.addEventListener('click', resetApp)
    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('gastos')) {
            gastos = JSON.parse(localStorage.getItem('gastos'))
            ui.insertarPresupuesto();
        } 
    })       
}
//---------------------Clases----------------------------------------
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto)//es el presupuesto definido por el usuario
        this.restante = Number(presupuesto)// es la cantidad que queda despues de un gasto, al inicio vale lo mismo que presupuesto
        this.gastos = []//son todos los gastos generados
        this.categorias = []//es el total de categorias en las que se hicieron gastos
        this.categoriaFiltrada = [] //son los gastos generados dentro de una sola categoria
        this.porcentaje = Number(0)//porcentaje de lo gastado
        this.gastado = Number(0)//total de la cantidad gastada
        this.totalCategoria = Number(0) //es el total de gastos de una sola categoria filtrada

    }

    resetApp() {
        this.presupuesto = Number(0)
        this.restante = Number(0)
        this.gastos = []
        this.categorias = []
        this.categoriaFiltrada = []
        this.porcentaje = Number(0)
        this.gastado = Number(0)
        this.totalCategoria = Number(0)
    }

    filtrarCategoria(categoria) {
        this.categoriaFiltrada = this.gastos.filter(elem => elem.select === categoria)// aqui me traigo del campo los objetos 
        this.totalCategoria = this.categoriaFiltrada.reduce((acc, elem) => acc + elem.cantidad, 0)//del los objetos que obtuvo se hace una sumatoria
    }
    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto]
        this.categoriasDistintas(this.gastos)
        this.calcularRestante()
    }

    categoriasDistintas() {
        this.categorias = [...new Set(this.gastos.map(elem => elem.select))] //se trae solo los campos que existe
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id); //tal vez se necesite cambiar a string
        this.calcularRestante()
        this.categoriasDistintas()
    }

    //reduce
    calcularRestante() {
        this.gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0)
        this.restante = this.presupuesto - this.gastado
        this.porcentaje = (this.gastado / this.presupuesto) * 100
    }

}
class UI {
    insertarPresupuesto(cantidad) {
        //Extrayendo los valores 
        const { presupuesto, restante, gastado, porcentaje, totalCategoria } = cantidad;
        //agregando al HTML
        document.querySelector('#total').textContent = presupuesto
        document.querySelector('#restante').textContent = restante
        document.querySelector('#gastado').textContent = gastado
        document.querySelector('#porcentaje').textContent = porcentaje
        document.querySelector('#totalCategoria').textContent = totalCategoria
        
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
           presupuesto.gastos.forEach(gasto => {
            const { nombre, cantidad, id, select } = gasto
            const nuevoGasto = document.createElement('li');//Crear un lista
            
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center'
            nuevoGasto.dataset.id = id;
            nuevoGasto.innerHTML = ` ${nombre}   $${cantidad}  ${select} `
            //boton editar gasto
            /*const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn', 'btn-primary', 'editar-gasto')
            btnEditar.textContent = 'Editar'
            btnEditar.onclick = (gasto) => editarGasto(id)*/
            //boton borrar gasto
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
            btnBorrar.textContent = 'Borrar'
            btnBorrar.onclick = () => eliminarGasto(id)
            //Insertar en HTML
           //nuevoGasto.appendChild(btnEditar)
            nuevoGasto.appendChild(btnBorrar);
            gastoListado.appendChild(nuevoGasto)
            localStorage.setItem('gastos',JSON.stringify(gastos))

        });
        //localStorage.setItem('gastos',JSON.stringify(gastos))
    }
    //-----------------------------------------------------------------------------

    actualizarRestante(restante) {
        document.querySelector('span#restante').textContent = restante
        localStorage.setItem('restante',JSON.stringify(restante))
        agregarCategorias()
    }
    actualizarGastado(gastado) {
        document.querySelector('span#gastado').textContent = gastado
        localStorage.setItem('gastado',JSON.stringify(gastado))
    }
    actualizarPorcentaje(porcentaje) {
        document.querySelector('span#porcentaje').textContent = porcentaje
        localStorage.setItem('porcentaje',JSON.stringify(porcentaje))
    }
    actualizarTotalCategoria(totalCategoria) {
        document.querySelector('span#totalCategoria').textContent = totalCategoria
    }


    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante, porcentaje } = presupuestoObj
        const restanteDiv = document.querySelector('.restante')
        const porcentajeDiv = document.querySelector('.porcentaje')
        formulario.querySelector('button[type="submit"]').disabled = false

        //Para controlar como vamos, comprobar el 25%
        if (((presupuesto / 4) > restante) || porcentaje >= 25) {
            restanteDiv.classList.remove('alert-success', 'alert-success')
            restanteDiv.classList.add('alert-success')
            porcentajeDiv.classList.remove('alert-success', 'alert-success')
            porcentajeDiv.classList.add('alert-success')
        } else if (((presupuesto / 2) > restante) || porcentaje >= 50) {
            //checar de nuevo, comprobar el 50%
            restanteDiv.classList.remove('alert-success', 'alert-warning')
            restanteDiv.classList.add('alert-warning');
            porcentajeDiv.classList.remove('alert-success', 'alert-warning')
            porcentajeDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-danger')
            restanteDiv.classList.add('alert-danger');
            porcentajeDiv.classList.remove('aler-danger', 'alert-danger')
            porcentajeDiv.classList.add('alert-danger');
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
presupuesto = new Presupuesto()
//---------------Funciones------------------------

function preguntarPresupuesto() {
    const presupuestoUsuario = document.getElementById('idPresupuesto').value;
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario) 
    ui.insertarPresupuesto(presupuesto)
}

function agregarGasto(e) {
    e.preventDefault();
    //leer del formulario los gtos 
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value)
    const select = document.querySelector('#select').value;
    const maximo = presupuesto.restante

    //Comprobar que los campos no esten vacios
    if (nombre === '' || cantidad === '' || select === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no v??lida', 'error')
    } else if (nombre === Number) {
        ui.imprimirAlerta('Caracter no valido', 'error')

    } else if (cantidad > maximo) {
        ui.imprimirAlerta('Saldo Insuficiente', 'error')
    } else {
        const gasto = { nombre, cantidad, select, id: Date.now() }
        //a??adir nuevo gasto
        presupuesto.nuevoGasto(gasto)
        const { gastos } = presupuesto
        ui.agregarGastoLista(gastos)
        const { restante } = presupuesto//actualizar el presupuesto restante
        ui.actualizarRestante(restante)
        const { gastado } = presupuesto
        ui.actualizarGastado(gastado)//actualizar el porcentaje
        const { porcentaje } = presupuesto
        ui.actualizarPorcentaje(porcentaje)
        const { totalCategoria } = presupuesto
        ui.actualizarTotalCategoria(totalCategoria)
        ui.comprobarPresupuesto(presupuesto)
        formulario.reset()//limpiar el formulario
    }
}
function editarGasto() {

}

function agregarCategorias() {
    const categorias = presupuesto.categorias
    document.getElementById("agregar-categoria").options.length = 0
    const select = document.querySelector('#agregar-categoria')
    categorias.forEach((elem) => {
        //es una instancia del objeto select
        //le estamos pasando al option dentro del parentesis como valor elem y como texto elem
        //con el null le decimos que cree una nueva y no planche lo que existe    
        select.add(new Option(elem, elem), null)
    })
    select.onclick = () => {
        const categoria = select.value
        presupuesto.filtrarCategoria(categoria)
        //limpiar cada ver que itera 
        while(listaCategorias.firstChild){
            listaCategorias.removeChild(listaCategorias.firstChild)
        }
        presupuesto.categoriaFiltrada.forEach(categoria => {
            const { nombre, cantidad} = categoria
            //Crear la lista de gastos por categoria seleccionada
            const nuevaCategoria = document.createElement('li');
            document.querySelector('span#totalCategoria').textContent = presupuesto.totalCategoria
            nuevaCategoria.className = 'list-categorias-item d-flex justify-content-between align-items-center color-white'
            nuevaCategoria.innerHTML = ` ${nombre}    $${cantidad} `
            listaCategorias.appendChild(nuevaCategoria)
            localStorage.setItem('gastos',JSON.stringify(gastos))
        });
    }
}


function resetApp() {
  const resultado=confirm('??Desea reiniciar la aplicacion?')
  if(resultado){
    presupuesto.resetApp()
    ui.limpiarHTML()
    document.querySelector('#total').textContent = ""
    document.querySelector('#restante').textContent = ""
    document.querySelector('#gastado').textContent = ""
    document.querySelector('#porcentaje').textContent = ""
    console.log('reset', presupuesto)
  }
    
}
//cuando eliminas un solo gasto
function eliminarGasto(id) {
    presupuesto.eliminarGasto(id)
    const { gastos, restante, gastado, categorias } = presupuesto;
    ui.agregarGastoLista(gastos);
    ui.agregarCategoriaLista(categorias)
    ui.actualizarRestante(restante);
    ui.actualizarGastado(gastado);
    ui.comprobarPresupuesto(presupuesto);
}
