// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] // resetear arreglo

        limpiarHTML();// Eliminamos todo el HTML
    })
}

// Funciones
function agregarCurso(e) {
    e.preventDefault(); // Prevenimos una accion por default, con esto al dar click en el boton
                        // no saltara hasta el inicio de la pagina
                        // y se mantendra en el mismo lugar que se pulso el boton
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        

        leerDatosCurso(cursoSeleccionado);
    }
    
}
//Elimina un curso del carrito
function eliminarCurso(e){    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo del arituculoCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
       
        carritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }

}


// lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    console.log(curso)

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1 
    }

    //revisa si un elemento ya existe en el carrito
    const existe= articulosCarrito.some(curso => curso.id === infoCurso.id );
    if(existe){
        //Actualizamos cantidad
        const cursos = articulosCarrito.map (curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else{
                return curso; // retorna los objetos que no son los actuializados
            }
        })
        articulosCarrito =[...cursos];
    } else {
    //Agrega elementos al arreglo del carrito 
 articulosCarrito = [...articulosCarrito, infoCurso]
    }


   

    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML();


//Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        console.log(curso);
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement ('tr');
        row.innerHTML = `
             <td>
               <img src="${curso.imagen}" width="100">            
             </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `;
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    }); 
}


//elimina los cursos del tbody
function limpiarHTML (){
    //limpiar HTML de forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}

