const form = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const telefono = document.getElementById("numero");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const parrafo1 = document.getElementById("nombreError");
const parrafo2 = document.getElementById("apellidoError");
const parrafo3 = document.getElementById("numeroError")
const parrafo4 = document.getElementById("emailError");
const parrafo5 = document.getElementById("mensajeError");



form.addEventListener("submit", camposvalidados);

// funcion para validar los campos
function camposvalidados(ev) {
    // condicion para validar y verificar los nombres
    if (nombre.value === "") {
        ev.preventDefault()
        parrafo1.innerText = `complete su nombre`
    } else if (!validarTexto(nombre.value)) {
        ev.preventDefault();
        parrafo1.innerText = `solo debe ingresar letras `;
    } else {
        parrafo1.innerText = "";
        nombre.classList.add("ok");
    }
    // condicion para validar y verificar apellidos
    if (apellido.value === "") {
        ev.preventDefault();
        parrafo2.innerText = `complete su apellido`
    } else if (!validarTexto(apellido.value)) {
        ev.preventDefault();
        parrafo2.innerText = `solo debe ingresar letras`
    }else {
        parrafo2.innerText = "";
        apellido.classList.add("ok");
    }

    // condicion para validar numeros de telefono
    if ((telefono.value === "") || (telefono.value.length < 8)) {
        ev.preventDefault();
        parrafo3.innerText = `ingrese codigo de area seguido de su numero telefonico`
    } else if (!numeroValido(telefono.value)) {
        ev.preventDefault();
        parrafo3.innerText = `solo admite numeros`
    } else {
        parrafo3.innerText = "";
        telefono.classList.add("ok");
    }

    // condicion para ingresar el email
    if (email.value === "") {
        ev.preventDefault();
        parrafo4.innerText = `complete su email`
    } else if (!emailValidado(email.value)) {
        ev.preventDefault()
        parrafo4.innerText = `debe contener un @ verifique el ejemplo
                            (ejemplo_123@ejemplo.com),(ejemplo@ejemplo.com.ar)
        `
    } else {
        parrafo4.innerText = "";
        email.classList.add("ok");
    }
    //condicion para el mensaje
    if(mensaje.value.length == 0){
        ev.preventDefault()
        parrafo5.innerText = `coloque al menos una letra, numero, simbolo para enviar el formulario `
    }
    else if (mensaje.value.length > 350) {
        ev.preventDefault();
        parrafo5.innerText = `solo puedo enviar 350 caracteres `
    } else {
        parrafo5.innerText = "";
    }

}

// validacion solo letras
function validarTexto(e) {
    let expRegular = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (e.search(expRegular)) {
        return false;
    } else {
        return true;
    }
}

// validacion numerica
function numeroValido(num) {
    return /^[0-9]*$/.test(num)
}

// validacion del mail
const emailValidado = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

