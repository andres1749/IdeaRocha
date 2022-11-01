/*
--SOLUCIONADO--
-Renderizar cards
-Agregar productos al carro
-sumar precio total de carro
-actualizar la cantidad en el icono del carro
-al elegir un mismo item que le sume al carro
-eliminar el producto
-guardar en el storage
-levantarlo de nuevo desde json

-A SOLUCIONAR

*/
const mainTienda = document.getElementById("mainTienda");
const carritoContenedor = document.getElementById("itemCarro");
const totalCarrito = document.getElementById("total")
const cantidadEnElCarrito = document.getElementById("cantidadEnElCarrito");


if (carrito != []) {

    renderizarCarrito();
    actualizarCarrito();
    
}

// preparacion para las card en tienda

function renderizarCards() {
    misProductos.forEach((prod) => {
        mainTienda.innerHTML += `
        <div class="card cardStyle  col-3">
            <img src="${prod.imagen}" class="card-img-top" alt="...">
            <div class= "descripcion">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">${prod.descripcion}</p>
                <p class="card-text">${prod.talle}</p>
                <p class="card-text">${prod.precio}</p>
                <button id="btn${prod.id}" class="btn btn-primary">Comprar </button>
            </div>
        </div>
        `
    })
    //evento boton comprar
    misProductos.forEach((prod) => {
        document.getElementById(`btn${prod.id}`).addEventListener("click", () => {
            agregarAlCarrito(prod);
        });
    });
    
}
renderizarCards();

// eventos para cada boton comprar
function agregarAlCarrito(prod) {
            //---
            if (carrito.find((e) => e.id === prod.id)) {
                carrito.find((e) => {
                    if (prod.id === e.id) {
                        e.unidad++;
                        e.precio += prod.precio;
                        document.getElementById(`cantidadProd${prod.id}`).innerText = e.unidad;
                    }
                })
            } else {
                carrito.push({
                    ...prod,
                    unidad: 1,
                })
                renderizarCarrito()
            }
            //--
            actualizarCarrito();
            // AL HACER CLICK EN EL BOTON ELIMINAR, ELIMINA LOS PRODUCTOS
            document.getElementById(`elimItem${prod.id}`).onclick = () => {
                eliminarItem(prod);
            }
}

// funcion para eliminar producto del carro
function eliminarItem(eliminado) {
    let prodAEliminar = document.getElementById(`productosAgregado${eliminado.id}`)
    carrito.splice(carrito.indexOf(eliminado), 1)
    prodAEliminar.remove();
    actualizarCarrito();
}

// actualiza el estado del carro (el icono), tanto para agregar items , como quitarlos
function actualizarCarrito() {
    if (carrito.length === 0) {
        cantidadEnElCarrito.innerText = "";
        totalCarrito.innerText = "";
    } else {
        // contador numerico del carrito
        cantidadEnElCarrito.innerText = carrito.reduce((x, prod) => x + prod.unidad, 0);
        //Precio total en el carrito
        totalCarrito.innerText = `
    total: $${carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0)}
`
    }
    carritoStorage();
}

function renderizarCarrito() {
    carritoContenedor.innerHTML = "";
    carrito.map((prod) => {
        carritoContenedor.innerHTML += `
        <tr id="productosAgregado${prod.id}">
            <th scope="col"><img class="fotoCard" src="${prod.imagen}"></th>
            <th scope="col">${prod.nombre}</th>
            <th scope="col" id="cantidadProd${prod.id}">1</th>
            <th scope="col">${prod.precio}</th>
            <th scope="col"><button class="btn btn-danger" id="elimItem${prod.id}">Eliminar</button></th>
        </tr>
        `
    })
    
    //evento para eliminar items en el carrito
    carrito.forEach((prod) =>{
        document.getElementById(`elimItem${prod.id}`).onclick = ()=>{
            eliminarItem(prod)
        }
    })

}
function carritoStorage() {
    localStorage.setItem("compras", JSON.stringify(carrito));
}