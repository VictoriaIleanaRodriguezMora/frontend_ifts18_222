let educacion, trabajo, todo;
fetch("./src/json/info.json")
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
