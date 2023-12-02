    document.addEventListener("DOMContentLoaded", function () {
    const getPokemonButton = document.getElementById("pokemon-button");
    const cardContainer = document.getElementById("cards-container");

    getPokemonButton.addEventListener("click", fetchRandomPokemons);

    function fetchRandomPokemons() {
        cardContainer.innerHTML = "";
        for (let i = 0; i < 3; i++) {
            fetchRandomPokemon()
                .then(pokemonData => {
                    createCard(pokemonData);
                })
                .catch(error => {
                    console.error("Error fetching the Pokémon data:", error);
                });
        }
    }

    function fetchRandomPokemon() {
        const randomPokemonId = Math.floor(Math.random() * 898) + 1; 
        return fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
            .then(response => response.json());
    }

    function createCard(pokemonData) {
        const { name, id, sprites, height, weight, types } = pokemonData;
        const url = sprites.front_default;
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add(types[0].type.name);

        card.addEventListener("click", function () {
            revealPokemon(name, url, id, height, weight);
            removeCrads(card);
        });

        card.innerHTML = `<div class="logo"><p>click me</p></div>`;

        cardContainer.appendChild(card);
    }

    function revealPokemon(name, url, id, height, weight) {
        const revealedCard = event.currentTarget;
        revealedCard.innerHTML = `
            <p>Name: ${name}</p>
            <p>ID: ${id}</p>
            <p>Height: ${height} dm</p>
            <p>Weight: ${weight} hg</p>
            <img src="${url}" alt="${name} sprite">
        `;
        revealedCard.classList.add("selected");
        revealedCard.style.pointerEvents = "none"; 
    }

    function removeCrads(selectedCard) {
        const cards = cardContainer.getElementsByClassName("card");
        const unselectedCards = Array.from(cards).filter(card => card !== selectedCard);
        for (const card of unselectedCards) {
            card.remove();
        }
    }
});