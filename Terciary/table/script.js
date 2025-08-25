async function traducirTipo(tipoUrl) {
    const res = await fetch(tipoUrl);
    const data = await res.json();
    const nombreES = data.names.find(n => n.language.name === "es");
    return nombreES ? nombreES.name : data.name;
}

async function traducirHabilidad(habilidadUrl) {
    const res = await fetch(habilidadUrl);
    const data = await res.json();
    const nombreES = data.names.find(n => n.language.name === "es");
    return nombreES ? nombreES.name : data.name;
}

function llenarTabla(pokemones) {
    let html = "";
    let key = 1;

    let promesas = pokemones.map(async pokemon => {
        const res = await fetch(pokemon.url);
        const detalle = await res.json();

        const img = detalle.sprites.other["official-artwork"].front_default;

        const tiposES = await Promise.all(
            detalle.types.map(t => traducirTipo(t.type.url))
        );

        const habilidadesES = await Promise.all(
            detalle.abilities.map(a => traducirHabilidad(a.ability.url))
        );

        html += `
            <tr>
                <td>${key++}</td>
                <td>${detalle.name}</td>
                <td>${tiposES.join(", ")}</td>
                <td><img src="${img}" width="50px"></td>
                <td>${habilidadesES.join(", ")}</td>
            </tr>
        `;
    });

    Promise.all(promesas).then(() => {
        $("#tableTRM").html(html);
    });
}

$(document).on("click", "#procesar", function(){
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")
    .then(response => response.json())
    .then(data => {
        llenarTabla(data.results);
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
    });
});
