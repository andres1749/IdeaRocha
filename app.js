// array de los productos
let misProductosJson = [];
let carrito = JSON.parse(localStorage.getItem("carro"))||[]; 

// obtencion de los ID de html
const mainTienda = document.getElementById("mainTienda");
const carritoContenedor = document.getElementById("itemCarro");
const totalCarrito = document.getElementById("total")
const cantidadEnElCarrito = document.getElementById("cantidadEnElCarrito");
const formulario =document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById ("apellido");
const email = document.getElementById("email");
const finalizarCompra = document.getElementById("finalizarCompra");

// en el caso de que los productos esten el carro, carga desde el storage y renderizan desde aca
renderizarItemCarrito();
sumarTotalCarrito();


// tomando desde mis productos.json
function solicitarDatos() {
    const pedirDatos = "../productos.json"
    fetch(pedirDatos)
        .then(res => res.json())
        .then(datos => {
            misProductosJson = datos
            misProductosJson.forEach((card) => {
                mainTienda.innerHTML += `
                <div class="card cardStyle  col-xl-3 col-md-4 col-sm-12">
                    <img src="${card.imagen}" class="card-img-top" alt="...">
                    <div class= "descripcion">
                        <h5 class="card-title">${card.nombre}</h5>
                        <p class="card-text">${card.descripcion}</p>
                        <p class="card-text">${card.talle}</p>
                        <p class="card-text">$${card.precio}</p>
                        <button onclick="agregarAlCarro(${card.id})" class="btn btn-primary">Comprar </button>
                    </div>
                </div>
                `
            })
        })
        
        
}
solicitarDatos();


// funcion para pushear con el boton cards al carrito
function agregarAlCarro(id) {
    if(carrito.some((card)=> card.id === id)){
        cambioCantidadCarro("suma",id);
    }else {
        const nuevaCard = misProductosJson.find((card)=> card.id === id);
        carrito.push({
            ...nuevaCard,
            cantidad: 1
        });
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado al carro exitosamente',
            color: '#F089A0',
            showConfirmButton: false,
            timer: 1500
        })
        renderizarItemCarrito();
    }
}

// muestra  los elementos pusheados al carrito
function renderizarItemCarrito (){
    carritoContenedor.innerHTML = "";
    carrito.forEach(cards => {
        carritoContenedor.innerHTML += `
        <tr>
            <td>${cards.nombre}</td>
            <td>$${cards.precio}</td>
            <td><img class="signosMasMenos" src="../fotos/icons8-menos-48.png" alt="signo menos" onclick="cambioCantidadCarro('resta',${cards.id})"> </img>  ${cards.cantidad}  <img class="signosMasMenos" src="/fotos/icons8-más-48.png" alt="signo mas" onclick="cambioCantidadCarro('suma',${cards.id})"></img></td>
            <td onclick="eliminar(${cards.id})"><img class="iconoEliminar" src="../fotos/eliminarProd.png" alt=""></td>
        </tr>
        `
    })
    sumarTotalCarrito();
    
}

// funcion para sumar el total del precio
function sumarTotalCarrito (){
    if(carrito.length == 0){
        totalCarrito.innerText = "No hay productos seleccionados";
        cantidadEnElCarrito.innerText = "";
    }else {
        totalCarrito.innerText = "El total a pagar es de $" + carrito.reduce((acum,cards) => acum + (cards.precio * cards.cantidad),0);
        cantidadEnElCarrito.innerText = carrito.reduce((acum,cards)=> acum + cards.cantidad, 0);
    }
    localStorage.setItem("carro", JSON.stringify(carrito));
}

// funcion para restar o subir la cantidad de los productos en el carro
function cambioCantidadCarro(calculo, id){
    carrito.find ((cards)=> {
        if(calculo === "resta" && id === cards.id && cards.cantidad > 1){
            cards.cantidad--;
        }else if (calculo === "suma" && id === cards.id && cards.cantidad < cards.stock){
            cards.cantidad++;
        }
    })
    renderizarItemCarrito();
}

// funcion para eliminar los productos del carro
function eliminar(id) {
    carrito = carrito.filter((cards) => cards.id !== id)
    renderizarItemCarrito();
}
/* ----------finaliza  el carrito ------------------- */



// boton para finalizar la compra 
finalizarCompra.addEventListener("click", ()=> {
    const parrafoEmail=document.getElementById("parrafoEmail");
    if(carrito.length == 0 ){
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos en el carro!',
        })
        
    }else{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con exito',
            color: '#F089A0',
            text: 'Gracias en breve nos pondremos en contacto por Email',
            showConfirmButton: false,
            timer: 3500
        })
        carrito = [];
    renderizarItemCarrito();
    localStorage.removeItem("carro");
    }
})







































// // eventos para cada boton comprar
// function agregarAlCarrito(prod) {
//             //---
//             if (carrito.find((e) => e.id === prod.id)) {
//                 carrito.find((e) => {
//                     if (prod.id === e.id) {
//                         e.unidad++;
//                         e.precio += prod.precio;
//                         document.getElementById(`cantidadProd${prod.id}`).innerText = e.unidad;
//                     }
//                 })
//             } else {
//                 carrito.push({
//                     ...prod,
//                     unidad: 1,
//                 })
//                 renderizarCarrito()
//             }
//             //--
//             actualizarCarrito();
//             // AL HACER CLICK EN EL BOTON ELIMINAR, ELIMINA LOS PRODUCTOS
//             document.getElementById(`elimItem${prod.id}`).onclick = () => {
//                 eliminarItem(prod);
//             }
// }

// // funcion para eliminar producto del carro
// function eliminarItem(eliminado) {
//     let prodAEliminar = document.getElementById(`productosAgregado${eliminado.id}`)
//     carrito.splice(carrito.indexOf(eliminado), 1)
//     prodAEliminar.remove();
//     actualizarCarrito();
// }

// // actualiza el estado del carro (el icono), tanto para agregar items , como quitarlos
// function actualizarCarrito() {
//     if (carrito.length === 0) {
//         cantidadEnElCarrito.innerText = "";
//         totalCarrito.innerText = "";
//     } else {
//         // contador numerico del carrito
//         cantidadEnElCarrito.innerText = carrito.reduce((x, prod) => x + prod.unidad, 0);
//         //Precio total en el carrito
//         totalCarrito.innerText = `
//     total: $${carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0)}
// `
//     }
//     carritoStorage();
// }

// function renderizarCarrito() {
//     carritoContenedor.innerHTML = "";
//     carrito.map((prod) => {
//         carritoContenedor.innerHTML += `
//         <tr id="productosAgregado${prod.id}">
//             <th scope="col"><img class="fotoCard" src="${prod.imagen}"></th>
//             <th scope="col">${prod.nombre}</th>
//             <th scope="col" id="cantidadProd${prod.id}">1</th>
//             <th scope="col">${prod.precio}</th>
//             <th scope="col"><button class="btn btn-danger" id="elimItem${prod.id}">Eliminar</button></th>
//         </tr>
//         `
//     })
    
//     //evento para eliminar items en el carrito
//     carrito.forEach((prod) =>{
//         document.getElementById(`elimItem${prod.id}`).onclick = ()=>{
//             eliminarItem(prod)
//         }
//     })

// }
// function carritoStorage() {
//     localStorage.setItem("compras", JSON.stringify(carrito));
// }