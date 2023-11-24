import React, { useState } from 'react';
import Pokedex from 'pokedex-promise-v2';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import CreateTeamButton from './components/CreateTeamButton';
import DeleteTeamButton from './components/DeleteTeamButton';
import TeamTab from './components/TeamTab';


//const db = require('./db');

const P = new Pokedex();

// Connect to MongoDB
//const teamsCollection = db.connectToMongoDB();

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const  initTeams = [
    {
        name: 'Rain Team',
        pokemons: ['butterfree','kingler','machop'],
    },
    {
        name: 'Another Team',
        pokemons: ['butterfree','kingler','machop'],
     },
     {
        name: 'New Team',
        pokemons: ['butterfree','kingler','machop'],
     },
]

const [teams, setTeams] = useState(initTeams);
   
// All functions will be modified to connect to MongoDB 
  
  // Function to add a Pokemon to a team
  const addPokemonToTeam = (teamName, pokemon) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.name === teamName
          ? { ...team, pokemons: [...team.pokemons, pokemon.name] }
          : team
      )
    );
  };
  // Function to delete a Pokemon from a team
  const deletePokemonFromTeam = (teamName, pokemon) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.name === teamName
          ? { ...team, pokemons: team.pokemons.filter((p) => p !== pokemon) }
          : team
      )
    );
  };
  // Function to create a new team
  const createNewTeam = (teamName) => {
    setTeams((prevTeams) => [
      ...prevTeams,
      {
        name: teamName,
        pokemons: [],
      },
    ]);
  };
  // Function to delete a team
  const deleteTeam = (teamName) => {
    setTeams((prevTeams) => prevTeams.filter((team) => team.name !== teamName));
  };

  const searchPokemon = async (searchTerm) => {
    try {
    let cleanedSearchTerm = searchTerm.trim(); // Remove leading/trailing spaces

        if (!isNaN(cleanedSearchTerm)) {
        // If the cleaned search term is a number, convert to string without leading zeros
            cleanedSearchTerm = parseInt(cleanedSearchTerm, 10).toString();
        }
        let pokemonDetails;

        if (!isNaN(searchTerm)) {
        // If the search term is a number, assume it's a Pokemon ID
            pokemonDetails = [await P.getPokemonByName(cleanedSearchTerm.toLowerCase())];
        } else {
        // If the search term is not a number, assume it's a Pokemon name
        const response = await P.getPokemonsList({
            limit: 12, // Default limit for searching by ID
        });

        const matchingPokemon = response.results.filter((pokemon) =>
            pokemon.name.includes(cleanedSearchTerm.toLowerCase())
        );

        pokemonDetails = await Promise.all(
            matchingPokemon.map((p) => P.getPokemonByName(p.name))
        );
        }

        setPokemonList(pokemonDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="px-3 py-3">
      <h1>PokemonTB</h1>
      <SearchBar onSearch={searchPokemon} />
      <PokemonList pokemonList={pokemonList} teams={teams} addPokemonToTeam={addPokemonToTeam} />
      <div className="d-flex">
          <CreateTeamButton createNewTeam={createNewTeam} />
          <DeleteTeamButton teams={teams} deleteTeam={deleteTeam} />
      </div>
      <TeamTab teams={teams} deletePokemonFromTeam={deletePokemonFromTeam}/>
    </div>
  );
};

export default App;
