import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PokemonCard from './PokemonCard';
import 'bootstrap/dist/css/bootstrap.min.css';

function PokemonList({ pokemonList, teams, addPokemonToTeam}) {
  return (
    <Row xs={1} md={4} className="g-12">
      {pokemonList.map((pokemon, idx) => (
        <Col key={idx}>
            <PokemonCard pokemon = {pokemon} teams={teams} addPokemonToTeam={addPokemonToTeam} />
        </Col>
      ))}
    </Row>
  );
}

export default PokemonList;