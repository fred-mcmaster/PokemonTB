const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware to parse JSON in request bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Define the schema for a Pokemon team
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pokemons: { type: [String], default: [] },
});

const TeamModel = mongoose.model('Team', teamSchema, 'teams');

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://fredli6226:Ri7kfz4aLvhUoQss@cluster-fred.cogwobm.mongodb.net/Pokemon?retryWrites=true&w=majority" 
    );
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
};

// Function to create a Pokemon team in database
const createTeam = async (teamName) => {
  try {
    const newTeam = new TeamModel({ name: teamName });
    const savedTeam = await newTeam.save();
    console.log(`${savedTeam.name} team successfully created.\n`);
    return savedTeam;
  } catch (err) {
    console.error(`Error creating team: ${err}\n`);
    throw err;
  }
};

// Function to delete a Pokemon team in database
const deleteTeamByName = async (teamName) => {
  try {
    const deleteResult = await TeamModel.deleteOne({ name: teamName });

    if (deleteResult.deletedCount === 1) {
      console.log(`Team "${teamName}" successfully removed.\n`);
      return true;
    } else {
      console.log(`Team "${teamName}" not found.\n`);
      return false;
    }
  } catch (err) {
    console.error(`Error deleting team: ${err}\n`);
    throw err;
  }
};

// Function to add a Pokemon to a specific team in database
const addPokemonToTeam = async (teamName, newPokemon) => {
  try {
    const updateResult = await TeamModel.updateOne(
      { name: teamName },
      { $push: { pokemons: newPokemon } }
    );
    console.log(`${updateResult.modifiedCount} document updated.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to update the document: ${err}\n`);
  }
};

// Function to remove a Pokemon from a team in database
const removePokemonFromTeam = async (teamName, pokemonName) => {
  try {
    const updateResult = await TeamModel.updateOne(
      { name: teamName },
      { $pull: { pokemons: pokemonName } }
    );

    if (updateResult.modifiedCount === 1) {
      console.log(`Pokemon "${pokemonName}" removed from Team "${teamName}".\n`);
    } else {
      console.log(`Pokemon "${pokemonName}" not found in Team "${teamName}".\n`);
    }
  } catch (err) {
    console.error(`Something went wrong trying to remove the Pokemon: ${err}\n`);
  }
};



// Connect to MongoDB
connectToMongoDB();

// API endpoint to get all teams
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await TeamModel.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to create a team
app.post('/api/teams', async (req, res) => {
  const { teamName } = req.body;

  try {
    const createdTeam = await createTeam(teamName);
    res.status(201).json(createdTeam);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to delete a team by name
app.delete('/api/teams/:teamName', async (req, res) => {
  const { teamName } = req.params;

  try {
    const isDeleted = await deleteTeamByName(teamName);

    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to add a Pokemon to a specific team
app.post('/api/teams/:teamName/pokemons', async (req, res) => {
  const { teamName } = req.params;
  const { newPokemon } = req.body;

  try {
    await addPokemonToTeam(teamName, newPokemon);
    res.status(200).json({ message: `Pokemon "${newPokemon}" added to Team ${teamName}.` });
  } catch (error) {
    console.error('Error adding Pokemon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to remove a Pokemon from a team
app.delete('/api/teams/:teamName/pokemons/:pokemonName', async (req, res) => {
  const { teamName, pokemonName } = req.params;

  try {
    await removePokemonFromTeam(teamName, pokemonName);
    res.status(200).json({ message: `Pokemon "${pokemonName}" removed from Team ${teamName}.` });
  } catch (error) {
    console.error('Error removing Pokemon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
