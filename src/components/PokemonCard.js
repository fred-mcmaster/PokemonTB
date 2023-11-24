import React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';

function PokemonCard({ pokemon, teams, addPokemonToTeam }) {
  
  const handleTeamSelection = (teamName) => {
    addPokemonToTeam(teamName, pokemon); // Trigger the addPokemonToTeam function
  };

  return (
    <Card key={pokemon.id} 
          bg='light'
          text='black'
          style={{ width: '18rem' }}>
      <Card.Img variant="top" 
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name} sprite`} />
      <Card.Body>
        <Card.Title>{pokemon.name}</Card.Title>
        <Card.Text>
          Types
        </Card.Text>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Add
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {teams && teams.map((team) => (
              <Dropdown.Item key={team.name} onClick={() => handleTeamSelection(team.name)}>
                {team.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;