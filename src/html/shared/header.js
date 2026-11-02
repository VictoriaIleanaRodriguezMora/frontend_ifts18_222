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
