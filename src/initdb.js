const { MongoClient } = require("mongodb");
require('dotenv').config();

async function connectToMongoDB () {
   
   const uri =
   "mongodb+srv://fredli6226:Ri7kfz4aLvhUoQss@cluster-fred.cogwobm.mongodb.net/?retryWrites=true&w=majority";

  //const uri = process.env.MONGO_URI; 
  //console.log('Mongo URI:', uri);
  const client = new MongoClient(uri);

  try {

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const dbName = "Pokemon";
    const collectionName = "teams";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const findQuery = { teamid: { $lt: 10 } };

    try {
        const cursor = await collection.find(findQuery);

        await cursor.forEach(team => {
            console.log(`Team ${team.teamid} members:`);
            team.pokemons.forEach(pokemon => {
                console.log(`- ${pokemon}`);
            });
        });

      // Print the updated teams
      const updatedCursor = await collection.find(findQuery);
      await updatedCursor.forEach(updatedTeam => {
        console.log(`Updated Team ${updatedTeam.teamid} members:`);
        updatedTeam.pokemons.forEach(updatedPokemon => {
          console.log(`- ${updatedPokemon}`);
        });
      });



    } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
    }   

  } finally {

    await client.close();
  }