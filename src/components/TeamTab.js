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
                    {pokemon}
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