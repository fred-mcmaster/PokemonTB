import React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import '../type.css';

function PokemonCard({ pokemon, teams, addPokemonToTeam }) {
  
  const handleTeamSelection = (teamName) => {
    addPokemonToTeam(teamName, pokemon); // Trigger the addPokemonToTeam function
  };

  return (
    <Card key={pokemon.id} 
          className='my-1 mx-1'
          bg='light'
          text='black'
          style={{ width: '12rem' }}>
      <Card.Img variant="top" 
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name} sprite`} />
      <Card.Body>
        <Card.Title>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Card.Title>
        <Card.Text>
          #{String(pokemon.id).padStart(4, '0')}
        </Card.Text>
        <div className="d-flex">
        {pokemon.types.map((item) => (
        <span key={item.type.name} className={`background-color-${item.type.name}`}>{item.type.name.charAt(0).toUpperCase() +item.type.name.slice(1)}</span>
        ))}
        <SplitButton
            as={ButtonGroup}
            size="sm"
            title=" + "
            variant="success"
          >
            {teams && teams.map((team) => (
              <Dropdown.Item key={team.name} onClick={() => handleTeamSelection(team.name)}>
                {team.name}
              </Dropdown.Item>
            ))}
        </SplitButton>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;