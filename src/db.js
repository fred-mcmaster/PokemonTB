/*
const { MongoClient } = require("mongodb");
require('dotenv').config();

const connectToMongoDB = async () => {
  //const uri = process.env.MONGO_URI;
  const uri =
   "mongodb+srv://fredli6226:Ri7kfz4aLvhUoQss@cluster-fred.cogwobm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    const dbName = "Pokemon";
    const collectionName = "teams";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    return client.db("Pokemon").collection("teams");
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error}`);
    throw error;
  }
};


// Function to add a Pokemon to a specific team
async function addPokemonToTeam(collection, teamId, newPokemon) {
  const updateQuery = { teamid: teamId };
  const updateCommand = {
    $push: { pokemons: newPokemon },
  };
  try {
    const updateResult = await collection.updateOne(updateQuery, updateCommand);
    console.log(`${updateResult.modifiedCount} document updated.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to update the document: ${err}\n`);
  }
}

// Function to create a Pokemon team
async function createTeam(collection, teamName) {
    const newTeam = createTeam(teamName);
    try {
        const insertOneResult = await collection.insertOne(newTeam);
        console.log(`${insertOneResult.insertedCount} document successfully inserted.\n`);
    } catch (err) {
        console.error(`Something went wrong trying to insert the new document: ${err}\n`);
    }
}

// Function to remove a Pokemon team
const removeTeamByName = async (collection, teamName) => {
  const deleteQuery = { name: teamName };

  try {
    const deleteResult = await collection.deleteOne(deleteQuery);

    if (deleteResult.deletedCount === 1) {
      console.log(`Team "${teamName}" successfully removed.\n`);
    } else {
      console.log(`Team "${teamName}" not found.\n`);
    }
  } catch (err) {
    console.error(`Something went wrong trying to remove the team: ${err}\n`);
  }
};

//Function to remove a Pokemon from a team
const removePokemonFromTeam = async (collection, teamName, pokemonName) => {
  const updateQuery = { name: teamName };
  const updateCommand = {
    $pull: { pokemons: pokemonName }
  };

  try {
    const updateResult = await collection.updateOne(updateQuery, updateCommand);

    if (updateResult.modifiedCount === 1) {
      console.log(`Pokemon "${pokemonName}" removed from Team "${teamName}".\n`);
    } else {
      console.log(`Pokemon "${pokemonName}" not found in Team "${teamName}".\n`);
    }
  } catch (err) {
    console.error(`Something went wrong trying to remove the Pokemon: ${err}\n`);
  }
};

//run().catch(console.dir);

module.exports = {
  connectToMongoDB,
  addPokemonToTeam,
  createTeam,
  removeTeamByName,
  removePokemonFromTeam
};

*/

// db.js (Database Connection and Pokemon Teams Functions)
/*
const mongoose = require('mongoose');

// Define the schema for a Pokemon team
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pokemons: { type: [String], default: [] },
});

const TeamModel = mongoose.model('Team', teamSchema);

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://fredli6226:Ri7kfz4aLvhUoQss@cluster-fred.cogwobm.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

// Function to create a Pokemon team
const createTeam = async (teamName) => {
  const newTeam = new TeamModel({ name: teamName });
  try {
    const savedTeam = await newTeam.save();
    console.log(`${savedTeam.name} team successfully created.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to create the team: ${err}\n`);
  }
};

// Function to remove a Pokemon team
const removeTeamByName = async (teamName) => {
  try {
    const deleteResult = await TeamModel.deleteOne({ name: teamName });

    if (deleteResult.deletedCount === 1) {
      console.log(`Team "${teamName}" successfully removed.\n`);
    } else {
      console.log(`Team "${teamName}" not found.\n`);
    }
  } catch (err) {
    console.error(`Something went wrong trying to remove the team: ${err}\n`);
  }
};

// Function to remove a Pokemon from a team
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

// Function to add a Pokemon to a specific team
const addPokemonToTeam = async (teamId, newPokemon) => {
  try {
    const updateResult = await TeamModel.updateOne(
      { _id: teamId },
      { $push: { pokemons: newPokemon } }
    );
    console.log(`${updateResult.modifiedCount} document updated.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to update the document: ${err}\n`);
  }
};

module.exports = {
  connectToMongoDB,
  createTeam,
  removeTeamByName,
  removePokemonFromTeam,
  addPokemonToTeam,
};

*/