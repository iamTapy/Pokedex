var pokeCarta = document.getElementById("pokeCarta");
var pokeName = document.getElementById("pokeName");
var pokeImg = document.getElementById("pokeImg");
var pokeImgDiv = document.getElementById("pokeImgDiv");
var pokeTipos = document.getElementById("pokeTipos");
var pokeEstad = document.getElementById("pokeEstadisticas");
var pokemon = "";
var pokeId = document.getElementById("pokeId");

const colores = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

function buscar (){
    pokemon = document.getElementById("ingresoPokemon").value;
    fetch(`https://pokeapi.co/api/v2/pokemon/`+ pokemon.toLowerCase() ) 
        .then(data => data.json())
        .then(response => pokemonEncontrado(response))
        .catch(err => pokemonNoEncontrado())
    
}

function pokemonEncontrado (data){
    var imagen = data.sprites.front_default;
    var estadisticas = data.stats;
    var tipos = data.types;
    console.log(tipos)

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', imagen);
    pokeId.textContent = 'N°' + data.id;
    obtenerColor(tipos);
    obtenerTipos(tipos);
    obtenerEstadisticas(estadisticas);
}

function obtenerColor(tipos){
    var colorUno = colores[tipos[0].type.name];
    if (tipos[1] != null) {
       var colorDos =colores[tipos[1].type.name];
        
    }else{
        var colorDos = colores.default;
    }
    pokeImg.style.background = `radial-gradient(${colorDos} 33%, ${colorUno} 33% )`;
    pokeImg.style.backgroundSize = '5px 5px';
}

function obtenerTipos(tipos){
	pokeTipos.innerHTML = '';
	for (var x in tipos){
		var tipoDiv = document.createElement("div");
		tipoDiv.style.color = colores[tipos[x].type.name];
		tipoDiv.textContent = tipos[x].type.name;
		pokeTipos.appendChild(tipoDiv);
	}
}

function obtenerEstadisticas(estadisticas){
    pokeEstad.innerHTML = '';
    for (var i in estadisticas){
        var estadistica = document.createElement("div");
        var numero = document.createElement("div");
        var nombre = document.createElement("div");
        nombre.textContent = estadisticas[i].stat.name;
        numero.textContent = estadisticas[i].base_stat;
        estadistica.appendChild(nombre);
        estadistica.appendChild(numero);
        pokeEstad.appendChild(estadistica);
    }
}

function pokemonNoEncontrado (){
    pokeName.textContent = "No encontrado";
    pokeImg.setAttribute("src", 'poke-shadow.png');
    pokeImg.style.background = '#fff';
    pokeTipos.innerHTML = "";
    pokeEstad.innerHTML = "";
    pokeId.innerHTML = ""
;}

