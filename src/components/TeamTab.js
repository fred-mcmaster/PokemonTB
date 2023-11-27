import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';

function TeamTab({ teams, deletePokemonFromTeam }) {

  const handleRemovePokemon = (teamName, pokemon) => {
    // Trigger the removePokemonFromTeam function with the teamName and pokemon
    deletePokemonFromTeam(teamName, pokemon);
  };

  return (
    <Tabs      
      defaultActiveKey={teams[0].name}
      id="tab"
      className="mb-3 col-6"
    >
    {teams.map((team) => (
        <Tab className="col-6" key={team.name} eventKey={team.name} title={team.name}>
            <ListGroup>
            {team.pokemons.map((pokemon, index)=> (
                <ListGroup.Item key={index} className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                    width="50"
                    />
                    <span className="mx-2">{pokemon.name}</span>
                </div>
                <CloseButton onClick={() => handleRemovePokemon(team.name, pokemon)} />
                </ListGroup.Item>
            ))}
            </ListGroup>
        </Tab>
    ))}            
    </Tabs>
  );
}

export default TeamTab;