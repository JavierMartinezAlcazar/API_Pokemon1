const url = "https://pokeapi.co/api/v2/pokemon"; // URL de la PokeAPI

const formulario = document.getElementById("formulario");
const nombre = document.getElementById("texto");
const buscar = document.getElementById("buscar");
const detallesPokemon = document.getElementById("pokemon-detalles");
const imagenPokemon = document.getElementById("pokemon-imagen");

document.getElementById('formulario').addEventListener('submit', async (event) => {
    event.preventDefault();

    detallesPokemon.innerHTML= '';
    imagenPokemon.innerHTML='';

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre.value.toLowerCase()}`);
        const pokemon = response.data;

        const imagenBola = document.createElement('img');
        imagenBola.src = 'img/bola.png';
        imagenBola.style.animation = 'vueltas 3s linear';
        imagenPokemon.appendChild(imagenBola);
        
    
        await new Promise(resolve => setTimeout(resolve, 3000));
        imagenPokemon.innerHTML= '';

        // INFORMACIÓN DEL POKEMON
        const nuevoPokemon = document.createElement('div');
        nuevoPokemon.innerHTML = `
            <div class="info">
            <h1><center>${pokemon.name}</center></h1>
            <h3>Habilidades:</h3>
            <ul id="listaHabilidades"></ul>
            <h3>Tipo:</h3>
            <ul id="listaTipo"></ul>
            <h3>Aparición en juegos:</h3>
            <ul id="indiceJuegos"></ul>
        `;
    
        detallesPokemon.appendChild(nuevoPokemon);
    
        const listaHabilidades = document.getElementById('listaHabilidades');
    
        pokemon.abilities.map(el => {
            const habilidad = document.createElement('li');
            habilidad.textContent = el.ability.name;
            listaHabilidades.appendChild(habilidad);
        });

        const tipoPok = document.getElementById('listaTipo');
        
        pokemon.types.map(el => {
            const tipo = document.createElement('li');
            tipo.textContent = el.type.name;
            tipoPok.appendChild(tipo);

        });

        const totalApariciones = document.getElementById('indiceJuegos');

            const total = document.createElement('li');
            total.textContent = pokemon.game_indices.length;
            totalApariciones.appendChild(total);
    
        //IMAGEN DEL POKEMON
        const imagen= document.createElement('img');
        imagen.src = pokemon.sprites.front_default;
    
        // Agrega la imagen al elemento de la lista
        imagenPokemon.appendChild(imagen);

        

    } catch (error) {
        const mensajeError = document.createElement('p');
        mensajeError.textContent = 'Parece que el Pokemon que buscas no se encuentra en la API';
        mensajeError.style.color = 'red';
        detallesPokemon.appendChild(mensajeError);
        console.error('Error al obtener la información del Pokémon', error);
    }
    
});
