async function fetchData(){
    const errorDiv = document.getElementById("errorMessage");
    const imgElement = document.getElementById("pokemonSprite");
    const infoDiv = document.getElementById("pokemonInfo");

    errorDiv.style.display = "none";
    errorDiv.textContent ="";
    infoDiv.textContent ="";
    imgElement.style.display = "none";

    try{
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!response.ok){
            throw new Error("Could not fetch Pokémon. Please check the name and try again.");
        }
        const data = await response.json();
        const pokemonId = data.id;
        const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
        imgElement.src = artworkUrl;
        imgElement.style.display ="block";

        const types = data.types.map(t=> capitalize(t.type.name)).join(", ");

        infoDiv.innerHTML =`
        <strong>${capitalize(data.name)}</strong><br/>
        ID: ${data.id}<br/>
        Height: ${data.height}<br/>
        Weight: ${data.weight}<br/>
        Types: ${types}`;
        
    }catch(error){
        console.error(error);
        errorDiv.style.display = "block";
        errorDiv.textContent = error.message;
    }
}

document.getElementById("pokemonName").addEventListener("keydown",event => {
    if(event.key == "Enter")
        fetchData();
});

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}