import React, { useState, useEffect } from 'react';
import Pokedex from 'pokedex-promise-v2';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import CreateTeamButton from './components/CreateTeamButton';
import DeleteTeamButton from './components/DeleteTeamButton';
import TeamTab from './components/TeamTab';

const P = new Pokedex();

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);

  const  initTeams = [
    {
        name: 'Rain Team',
        pokemons: ['Butterfree','Kingler','Machop'],
    },
  ]
  
  const [teams, setTeams] = useState(initTeams);

  useEffect(() => {
      const fetchTeams = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/teams');
          if (response.ok) {
            const data = await response.json();
            setTeams(data);
          } else {
            console.error('Error fetching teams:', response.statusText);
          }
        } catch (error) {
          console.error('An error occurred:', error.message);
        }
        };
      fetchTeams();
  }, []);
  // Reach server endpoint to create team 
  const createNewTeam = async (teamName) => {
  try {
    const response = await fetch('http://localhost:5000/api/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamName }),
    });

    if (response.ok) {
      const createdTeam = await response.json();
      setTeams((prevTeams) => [...prevTeams, createdTeam]);
    } else {
      console.error('Error creating team:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};
 // Reach server endpoint to delete team 
const deleteTeam = async (teamName) => {
  try {
    const response = await fetch(`http://localhost:5000/api/teams/${teamName}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTeams((prevTeams) => prevTeams.filter((team) => team.name !== teamName));
    } else if (response.status === 404) {
      console.error('Team not found:', response.statusText);
    } else {
      console.error('Error deleting team:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};
// Reach server endpoint to add Pokemon to a team 
const addPokemonToTeam = async (teamName, pokemon) => {
  const formattedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  try {
    const response = await fetch(`http://localhost:5000/api/teams/${teamName}/pokemons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPokemon: formattedPokemonName }),
    });

    if (response.ok) {
      //const updatedTeam = await response.json();
      //console.log(updatedTeam)
      setTeams((prevTeams) =>
        prevTeams.map((team) => (team.name === teamName 
          ? { ...team, pokemons: [...team.pokemons, formattedPokemonName] } 
          : team))
      );
    } else {
      console.error('Error adding Pokemon:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};
// Reach server endpoint to delete Pokemon to a team 
const deletePokemonFromTeam = async (teamName, pokemon) => {
  try {
    const response = await fetch(`http://localhost:5000/api/teams/${teamName}/pokemons/${pokemon}`, {
        method: 'DELETE',
      }
    );
    if (response.ok) {
      //const updatedTeam = await response.json();
      setTeams((prevTeams) =>
          prevTeams.map((team) =>
            team.name === teamName
              ? { ...team, pokemons: team.pokemons.filter((p) => p !== pokemon) }
              : team
          )
      );
    } else if (response.status === 404) {
      console.error('Pokemon not found:', response.statusText);
    } else {
      console.error('Error removing Pokemon:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};
  //Call Pokemon API
  const searchPokemon = async (searchTerm) => {
    try {
    const cleanedSearchTerm = searchTerm.trim().toLowerCase();
    let pokemonDetails;

    if (!isNaN(cleanedSearchTerm)) {
      // If the cleaned search term is a number, assume it's a Pokemon ID
      const startId = Math.max(1, parseInt(cleanedSearchTerm, 10));

      pokemonDetails = await Promise.all(
        Array.from({ length: 12 }, (_, index) => P.getPokemonByName(startId + index))
      );
    } else {
      // Fetch all Pokemon names separately
      const allPokemonNames = await P.getPokemonsList({ limit: 898 }).then((response) =>
        response.results.map((pokemon) => pokemon.name.toLowerCase())
      );

      // Filter Pokemon names based on the search term
      const matchingPokemonNames = allPokemonNames.filter((name) =>
        name.includes(cleanedSearchTerm)
      );

      // Fetch details for the matching Pokemon names
      pokemonDetails = await Promise.all(
        matchingPokemonNames.map((name) => P.getPokemonByName(name))
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
