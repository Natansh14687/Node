const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://natansh522:aziPBkEyJCZJugP5@namastenode.r1xep4y.mongodb.net/';
const client = new MongoClient(url);

const dbName = 'HelloWorld';


async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('User');

//   const data = {
//     name:"Dushyant",
//     lastName : "Sharma",
//     age : 21,
//     gender : "male"
//   }

//   const insertDocument = await collection.insertMany([data]);
//   console.log("Inserted Document => ", insertDocument);
  
//   const updateResult = await collection.updateOne({ name: "Navneet" }, { $set: { name: "Dushyant" } });
//   console.log('Updated documents =>', updateResult);

  const deleteDocument = await collection.deleteOne({name : "Dushyant"});
  console.log("deleted documents => ", deleteDocument);
  

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);


//   const findDocument = await collection.find({name:"Dushyant"}).toArray();
//   console.log("Document found with query => ", findDocument);

  
  
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());