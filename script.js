console.log(location.pathname);
// console.log("hola");

// SHARED HEADER Y FOOTER
const footer = `
<footer class="main-footer">
    <div class="footer__redes-sociales" >
            <span>
                <i class="fa-brands fa-linkedin"></i> 
                <a href="https://www.linkedin.com/in/victoriaileanarodriguez/">
                /victoriaileanarodriguez
                </a> 
            </span>
            <span>
            <i class="fa-brands fa-github"></i>
            <a href="https://github.com/VictoriaIleanaRodriguezMora">
                VictoriaIleanaRodriguezMora
            </a> 
            </span>
            <span>
            <i class="fa-solid fa-envelope"></i>
                victoriaileanarodriguezmora@gmail.com
            </span>
    </div>
</footer>
`;
document.body.children[1].insertAdjacentHTML("afterend", footer);
// SHARED HEADER Y FOOTER

let educacion, trabajo, todo;

// esta url se lee desde trabajo.html
function fetchData(categoria) {
    fetch("../info.json")
        .then((respuesta) => respuesta.json())
        .then((data) => {
            // console.log(data);

            switch (categoria) {
                case "educacion":
                    educacion = data[0];
                    break;

                case "trabajo":
                    trabajo = data[1];
                    crearExperienciaTrabajo(trabajo);
                    console.log("trabajo", trabajo);
                    break;

                case "todo":
                    todo = [data[0], data[1]];
                    console.log("trabajo", trabajo);
                    break;

                default:
                    "Categoría inválida";
                    break;
            }
        });
}

// --------------- SECCION TRABAJO ---------------
if (location.pathname === "/html/trabajos.html") {
    const dom_section_trabajo = document.querySelector("#section_trabajo");
    fetchData("trabajo");

    function crearExperienciaTrabajo(data_experiencia) {
        console.log("crearExperienciaTrabajo");

        let item_experiencia = "";

        for (let i = 0; i < data_experiencia.length; i++) {
            // el ul acumula TODOS los items
            let listaItems = document.createElement("ul");
            let listaItemsPlano;

            // PRIMERO. Obtengo los items de contenidos, para luego armar el article completo
            for (let j = 0; j < data_experiencia[i].contenidos.length; j++) {
                //  el bucle for accede al largo del arary de contenidos, de cada puesto de trabajo
                listaItems.innerHTML += `<li>${data_experiencia[i].contenidos[j]}</li>`; //  lista de items  en cada vuelta se acumulan. objeto de tipo HTMLElement. referencia a  elemento del DOM que tiene propiedades y métodos
                listaItemsPlano = listaItems.innerHTML; // devuelve el contenido html en formato plano
            }

            // crea el article
            item_experiencia = `<article class="trabajo">
                                    <span>${data_experiencia[i].duracion}</span>
                                    <h3>${data_experiencia[i].puesto}</h3>
                                    <span class="trabajo__empresa" >${data_experiencia[i].empresa}</span>
                                    ${listaItems.outerHTML}             
                            </article>`;

            // Necesito un bucle dentro de otro bucle, para poder alcanzar a la prop contenidos.
            // La prop contenidos, es un array con los items que describen el trabajo/educacion, sólo lo puedo alcanzar de esta manera
            // El item_experiencia, se construye con datos alcanzados del primer bucle, y los contenidos alcanzados en el segundo bucle

            dom_section_trabajo.innerHTML += item_experiencia;
        }
    }
}
// --------------- SECCION TRABAJO ---------------

// --------------- SECCION CONTACTO ---------------
if (location.pathname === "/html/contacto.html") {
    const boton_enviar = document.getElementById("boton_enviar");
    const formulario = document.querySelector("form");

    function mensajeError(campo, domReference, inputError, mnsError = "") {
        // si no es nulo, usá el mensaje que enviaron en la funcion
        if (mnsError) {
            inputError.innerText = mnsError;
        } else {
            domReference.classList.add("input-error");
            inputError.innerText = `Porfavor, completa el ${campo}`;
        }
    }

    function limpiarErrores(campo, domReference, inputError) {
        domReference.classList.remove("input-error");
        inputError.innerText = "";
    }

    function enviarFormulario(e) {
        console.log("hola");
        // capturar los valores
        const nombre = document.getElementById("campo_nombre");
        const apellido = document.getElementById("campo_apellido");
        const email = document.getElementById("campo_email");
        const consulta = document.getElementById("campo_consulta");

        const nombreInputError = document.getElementById("mensaje_error_nombre");
        const apellidoInputError = document.getElementById(
            "mensaje_error_apellido",
        );
        const emailInputError = document.getElementById("mensaje_error_email");
        const consultaInputError = document.getElementById(
            "mensaje_error_consulta",
        );

        let flagErrores = false;

        if (!nombre.value) {
            mensajeError("nombre", nombre, nombreInputError);
            flagErrores = true;
        } else {
            limpiarErrores("nombre", nombre, nombreInputError);
        }

        if (!apellido.value) {
            mensajeError("apellido", apellido, apellidoInputError);
            flagErrores = true;
        } else {
            limpiarErrores("apellido", apellido, apellidoInputError);
        }

        if (!email.value) {
            mensajeError("email", email, emailInputError);
            flagErrores = true;
        } else if (!email.value.includes("@")) {
            console.log("hola");
            mensajeError(
                "email",
                email,
                emailInputError,
                "Porfavor, introduce un email válido. El email debe  incluir '@' ",
            );
            flagErrores = true;
        } else {
            limpiarErrores("email", email, emailInputError);
        }

        if (!consulta.value) {
            mensajeError("consulta", consulta, consultaInputError);
            flagErrores = true;
        } else {
            limpiarErrores("consulta", consulta, consultaInputError);
        }

        if (flagErrores) {
            e.preventDefault(); // Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.
            // Llamar a preventDefault en cualquier momento durante la ejecución, cancela el evento, lo que significa que cualquier acción por defecto que deba producirse como resultado de este evento, no ocurrirá.
            // https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault
            return;
        }
    }

    formulario.addEventListener("submit", enviarFormulario);
}
// --------------- SECCION CONTACTO ---------------

// --------------- COMPONENTE HEADER - COMPARTIDO EN TODAS LAS PÁGINAS ---------------
const breakpointHeaderHamburguesa = window.matchMedia("(max-width: 992px)"); // condición que pregunta si el viewport mide 992 px o menos

let btnShowMenu = document.getElementById("show-menu-hamburguesa");
let btnHideMenu = document.getElementById("hide-menu-hamburguesa");
let divMenuNavegacion = document.getElementById("menu-navegacion");

// fn que se ejecuta UNA SOLA VEZ en el evento de cambio de viewport
function configurarMenu() {
    divMenuNavegacion.classList.remove("menu-abierto");
    btnHideMenu.classList.add("display-none");
    
    if (breakpointHeaderHamburguesa.matches) {
        /* si inicialmente, ESTOY en menos de 992, le quita el d-none */
        // ESO LO QUE GENERA ES: que esté visible el boton, por lo tanto está en ejecucion el evento de CLICK del boton. Ahora el botón es CLICKEABLE. y si se clickea, se llama a toggleMenu
        btnShowMenu.classList.remove("display-none");
    } else {
        /* si inicialmente, NO estoy en menos de 992, le agrega/mantiene el d-none */
        btnShowMenu.classList.add("display-none");
    }
}

// cuando ocurre el evneto.
// le estoy diciendo a la condicion breakpointHeaderHamburguesa, que si CAMBIA,  llamo a configurarMenu
// cuando cambia el resultado de la condición del breakpoint, se ejecuta configurarMenu().
breakpointHeaderHamburguesa.addEventListener("change", configurarMenu);

// INICIAL - cuando carga la página.
/* hay 2 escenarios:
- inicialmente estoy en 992 o menos
- inicialmente estoy en mas de 992
*/
configurarMenu();

function toggleMenu() {
    if (divMenuNavegacion.classList.contains("menu-abierto")) {
        // cerrar menú
        divMenuNavegacion.classList.remove("menu-abierto");
        btnShowMenu.classList.remove("display-none");
        btnHideMenu.classList.add("display-none");
    } else {
        // abrir
        divMenuNavegacion.classList.add("menu-abierto");
        btnShowMenu.classList.add("display-none");
        btnHideMenu.classList.remove("display-none");
    }
}

btnShowMenu.addEventListener("click", toggleMenu);
btnHideMenu.addEventListener("click", toggleMenu);


// --------------- COMPONENTE HEADER - COMPARTIDO EN TODAS LAS PÁGINAS ---------------
