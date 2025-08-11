function llenarTabla(pokemones) {
    let html = "";
    let key = 1;

    let promesas = pokemones.map(pokemon => {
        return fetch(pokemon.url)
            .then(res => res.json())
            .then(detalle => {
                const habilidades = detalle.abilities.map(a => a.ability.name).join(", ");
                const img = detalle.sprites.other["official-artwork"].front_default;
                html += `
                    <tr>
                        <td>${key++}</td>
                        <td>${detalle.name}</td>
                        <td>${pokemon.url}</td>
                        <td><img src="${img}" width="50px"></td>
                        <td>${habilidades}</td>
                    </tr>
                `;
            });
    });

    Promise.all(promesas).then(() => {
        $("#tableTRM").html(html);
    });
}

$(document).on("click", "#procesar", function(){
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=200")
    .then(response => response.json())
    .then(data => {
        llenarTabla(data.results);
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
    });
});
