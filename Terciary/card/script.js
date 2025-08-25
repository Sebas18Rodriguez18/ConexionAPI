async function getPokemon(id) {
  try {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`);
    
    if (!response.ok) {
      throw new Error('Pokémon no encontrado');
    }
    
    const data = await response.json();
    
    const pokemon = {
      name: data.name,
      id: data.id,
      image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
      hp: data.stats.find(stat => stat.stat.name === "hp").base_stat,
      attack: data.stats.find(stat => stat.stat.name === "attack").base_stat,
      defense: data.stats.find(stat => stat.stat.name === "defense").base_stat,
      speed: data.stats.find(stat => stat.stat.name === "speed").base_stat,
      types: data.types.map(type => type.type.name),
      abilities: data.abilities.map(ability => ability.ability.name)
    };
    
    return pokemon;
    
  } catch (error) {
    throw error;
  } finally {
    document.getElementById('loading').style.display = 'none';
  }
}

function mostrarPokemon(pokemon) {
  let tiposHTML = '';
  pokemon.types.forEach(tipo => {
    tiposHTML += `<span class="type type-${tipo}">${tipo}</span>`;
  });
  
  const cartaHTML = `
    <div class="pokemon-header">
      <span class="pokemon-name">${pokemon.name}</span>
      <span class="pokemon-hp">HP ${pokemon.hp}</span>
    </div>
    <div class="pokemon-image">
      <img src="${pokemon.image}" alt="${pokemon.name}">
    </div>
    <div class="pokemon-info">
      <div class="pokemon-types">
        <strong>Tipo:</strong><br>
        ${tiposHTML}
      </div>
      <div class="abilities">
        <strong>Habilidades:</strong><br>
        ${pokemon.abilities.join(', ')}
      </div>
      <div class="pokemon-stats">
        <h4>Estadísticas</h4>
        <div class="stat-row">
          <span class="stat-label">Ataque:</span>
          <span class="stat-value">${pokemon.attack}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Defensa:</span>
          <span class="stat-value">${pokemon.defense}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Velocidad:</span>
          <span class="stat-value">${pokemon.speed}</span>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('pokemonCard').innerHTML = cartaHTML;
}

async function buscarPokemon() {
  const input = document.getElementById('pokemonId').value.trim();
  
  if (!input) {
    mostrarError('Por favor escribe un nombre o número de Pokémon');
    return;
  }
  
  try {
    const pokemon = await getPokemon(input);
    mostrarPokemon(pokemon);
    document.getElementById('error').style.display = 'none';
  } catch (error) {
    mostrarError('No se encontró el Pokémon. Verifica el nombre o número.');
  }
}

function mostrarError(mensaje) {
  document.getElementById('error').querySelector('p').textContent = mensaje;
  document.getElementById('error').style.display = 'block';
}

async function pokemonAleatorio() {
  const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
  document.getElementById('pokemonId').value = numeroAleatorio;
  await buscarPokemon();
}

function limpiar() {
  document.getElementById('pokemonCard').innerHTML = `
    <div class="card-back">
      <img src="img/Pokeball.jpg" alt="Pokeball">
    </div>
  `;
  document.getElementById('pokemonId').value = '';
  document.getElementById('error').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
}

$(document).ready(function() {
  $('#buscar').click(function() {
    buscarPokemon();
  });
  
  $('#aleatorio').click(function() {
    pokemonAleatorio();
  });
  
  $('#reset').click(function() {
    limpiar();
  });
  
  $('#pokemonId').keypress(function(e) {
    if (e.which === 13) {
      buscarPokemon();
    }
  });
});