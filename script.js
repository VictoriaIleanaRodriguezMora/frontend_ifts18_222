let educacion, trabajo, todo;
fetch(".././json/info.json")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    console.log(data);

    educacion = data[0];
    console.log("educacion", educacion);
    trabajo = data[1];
    console.log("trabajo", trabajo);
    todo = data;
    console.log("todo", todo);
  });


// SHARED HEADER Y FOOTER
const header = `<header>
    <div>
        <p>{path}</p>

        <ul>
            <a href="../sobre-mi/"">
            <li>Sobre mí</li>
            </a>

            <a href=" ../proyectos/"">
                <li>Proyectos</li>
            </a>

            <a href="../tecnologias/"">
            <li>Tecnologias</li>
            </a>
            
            <a href=" ../experiencia-de-trabajo/"">
                <li>Experiencia de trabajo</li>
            </a>

            <a href="../estudios/"">
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
