//----------------------variables---------------------------------------------
const formulario = document.getElementById('agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')

//--------------------------eventos-----------------------
 eventListeners()

 function eventListeners() {
     document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
     formulario.addEventListener('submit', agregarGasto)
     gastoListado.addEventListener('click', eliminarGasto)
 }

 //---------------------Clases----------------------------------------
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto)
        this.restante = Number(presupuesto)
        this.gastos = []
        this.categorias=[]
        this.filtterArray=[]
        this.pocentaje=Number(0)
        this.gastado=Number(0)
        this.cantidadCategoria=Number(0)
    }

    filtrarCategoria(myJSON, categoria){
      filtterArray=myJSON.filter(elem=>elem.campo===categoria)// aqui me traigo del campo los objetos 
      cantidadCategoria=filtterArray.reduce((acc, elem)=>acc+elem.cantidad, 0)//del los objetos que obtuvo se hace una sumatoria
    console.log('arregloFiltrado', this.filtterArray)
    } 
    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto]
        this.categoriasDistintas(this.gastos)
        this.calcularRestante()
    }

    categoriasDistintas(myJSON){
        this.categorias = [...new Set(myJSON.map(elem =>elem.campo))] //se trae solo los campos que existe
        console.log('categorias',this.categorias) 
        console.log('JSON', myJSON)   
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id); //tal vez se necesite cambiar a string
        this.calcularRestante()
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
        const { presupuesto, restante, gastado } = cantidad;
        //agregando al HTML
        document.querySelector('#total').textContent = presupuesto
        document.querySelector('#restante').textContent = restante
        document.querySelector('#gastado').textContent= gastado
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
            nuevoGasto.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-phill">$ ${cantidad}</span>
            ${campo}
            `
            //borrar gasto boton
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
            btnBorrar.textContent = 'Borrar'
            btnBorrar.onclick = () => {
                eliminarGasto(id)
            }
            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn', 'btn-agregar', 'editar-gasto')
            btnEditar.textContent = 'Editar'
            btnEditar.onclick = () => {
                editarGasto(id)
            }
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

//---------------Funciones------------------------

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Monto del presupuesto?');
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
        const { gastado } = this.presupuesto-this.restante
        ui.actualizarGastado(gastado)//actualizar lo gastado
        ui.comprobarPresupuesto(presupuesto)// avisa si se va terminando el presupuesto
        formulario.reset()//limpiar el formulario
    }
}
function editarGasto(id){

}
//cuando eliminas un solo gasto
function eliminarGasto(id) {
    presupuesto.eliminarGasto(id)
    const { gastos, restante, gastado } = presupuesto;
    ui.agregarGastoLista(gastos);
    ui.actualizarRestante(restante);
    ui.actualizarGastado(gastado);
    ui.comprobarPresupuesto(presupuesto);
}