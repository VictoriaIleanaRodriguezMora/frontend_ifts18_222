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
                    crearExperienciaTrabajo(trabajo)
                    console.log("trabajo", trabajo);
                    break

                case "todo":
                    todo = [data[0], data[1]]
                    console.log("trabajo", trabajo);
                    break

                default:
                    "Categoría inválida"
                    break;
            }

        });
}

// console.log("hola");

// seccion trabajo
const dom_section_trabajo = document.querySelector("#section_trabajo");
// console.log("dom_section_trabajo", dom_section_trabajo);

fetchData("trabajo")
// console.log("***trabajo", trabajo);

function crearExperienciaTrabajo(data_experiencia) {
    let item_experiencia = ""


    for (let i = 0; i < data_experiencia.length; i++) {
        // el ul acumula TODOS los items
        let listaItems = document.createElement("ul")
        let listaItemsPlano

        for (let j = 0; j < data_experiencia[i].contenidos.length; j++) {
            //  el bucle for accede al largo del arary de contenidos, de cada puesto de trabajo
            // let itemsInsert = []
            // se está guardando en un li, los dos contenidos
            // let listaItems = document.createElement("ul")
            // data_experiencia[i].contenidos.forEach(e => {
            // console.log(e);
            // itemsInsert = [...itemsInsert, `<li>${data_experiencia[i].contenidos[j]}</li>`]
            listaItems.innerHTML += `<li>${data_experiencia[i].contenidos[j]}</li>` //  lista de items  en cada vuelta se acumulan. objeto de tipo HTMLElement. referencia a  elemento del DOM que tiene propiedades y métodos
            listaItemsPlano = listaItems.innerHTML // devuelve el contenido html en formato plano

            // });
            // let items = 
            // console.log("itemsInsert", itemsInsert);
            console.log(listaItems);
            console.log(listaItems.innerText);
            console.log(listaItems.innerHTML);            // console.log("listaItemsPlano", listaItemsPlano);

            // item_experiencia.insertAdjacentHTML("beforeend", listaItems)

        }
        // listaItemsPlano = listaItems.innerText

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

        dom_section_trabajo.innerHTML += item_experiencia
    }
}

// section_trabajo.innerHTML()



// seccion trabajo









// SHARED HEADER Y FOOTER
const header = `<header>
    <div>
        <p>{path}</p>

        <ul>
            <a href="../sobre-mi/">
            <li>Sobre mí</li>
            </a>

            <a href=" ../proyectos/">
                <li>Proyectos</li>
            </a>

            <a href="../tecnologias/">
            <li>Tecnologias</li>
            </a>
            
            <a href="./html/trabajos.html">
                <li>Experiencia de trabajo</li>
            </a>

            <a href="../estudios/">
            <li>Estudios</li>
            </a>
        </ul>
    </div>
</header>`;

document.body.insertAdjacentHTML("afterbegin", header);

const footer = `
<footer class="main-footer">
<p>footer</p>
</footer>
`;
document.body.children[1].insertAdjacentHTML("afterend", footer);
// SHARED HEADER Y FOOTER
