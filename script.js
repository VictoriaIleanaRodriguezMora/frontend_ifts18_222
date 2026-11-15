let educacion, trabajo, todo;
// esta url se lee desde trabajo.html
function fetchData(categoria) {
    fetch("../info.json")
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log(data);

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

console.log("hola");

// seccion trabajo
const dom_section_trabajo = document.querySelector("#section_trabajo");
console.log("dom_section_trabajo", dom_section_trabajo);

fetchData("trabajo")
// console.log("***trabajo", trabajo);

function crearExperienciaTrabajo(data_experiencia) {

    let article_experiencia = []
    let item_experiencia = ""
    for (let i = 0; i < data_experiencia.length; i++) {
        // console.log("** data_experiencia", data_experiencia[i]);
        // console.log("** data_experiencia", data_experiencia.length);

        item_experiencia = `
        <article class="trabajo">
            <span>${data_experiencia[i].duracion}</span>
            <h3>${data_experiencia[i].puesto}</h3>
            <span>${data_experiencia[i].empresa}</span>

            <ul>
            // items_puesto_trabajo
            </ul>
        </article>
    `;
        // console.log("item_experiencia", item_experiencia);
        console.log("article_experiencia", article_experiencia);

        article_experiencia = [...article_experiencia, [item_experiencia]]
    }
    console.log("*s*s**s*s*s article_experiencia", article_experiencia);


    let items_puesto_de_trabajo
    for (let i = 0; i < data_experiencia.length; i++) {
        // me parece que necesito un bucle dentro de otro
        // console.log("data_experiencia", data_experiencia[i].contenidos);
        items_puesto_de_trabajo = [...data_experiencia[i].contenidos]

    }
    // console.log("items_puesto_de_trabajo", items_puesto_de_trabajo);
    dom_section_trabajo.innerHTML = article_experiencia
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
