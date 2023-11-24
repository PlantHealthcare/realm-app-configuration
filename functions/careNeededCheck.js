exports = async function(changeEvent) {
  // A Database Trigger will always call a function with a changeEvent.
  // Documentation on ChangeEvents: https://www.mongodb.com/docs/manual/reference/change-events

  // This sample function will listen for events and replicate them to a collection in a different Database

  // Access the _id of the changed document:
  const docId = changeEvent.documentKey._id;

  // Get the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "mongodb-atlas";
  const databaseName = "PlantHealthcare";
  const collection = context.services.get(serviceName).db(databaseName).collection(changeEvent.ns.coll);
  
  /*
  try {
    const plantSpeciesCollection = context.services.get(serviceName).db(databaseName).collection("plantspecies");
    const plantSpecies = plantSpeciesCollection.findOne({"_id": changeEvent.fullDocument.plantSpecie._id});
  } catch(err) {
    console.log("error finding plant species: ", err.message);
  }
  */
  
  const plant = changeEvent.fullDocument;
  var careNeeded = false;
  
  if (plant.temperature > plant.plantSpecie.max_temp || plant.temperature < plant.plantSpecie.min_temp) {
    careNeeded = true;
  }
  if (plant.humidity > plant.plantSpecie.max_env_humid || plant.humidity < plant.plantSpecie.min_env_humid) {
    careNeeded = true;
  }
  if (plant.soil_moist > plant.plantSpecie.max_soil_moist || plant.soil_moist < plant.plantSpecie.min_soil_moist) {
    careNeeded = true;
  }

  try {
    await collection.updateOne(
      { _id: docId },
      { $set: { careNeeded: careNeeded } }
    );
  } catch(err) {
    console.log("error updateing plant: ", err.message);
  }
};
