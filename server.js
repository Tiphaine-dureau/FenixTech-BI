/**
 * Initialiser nodejs avec express et mongodb
 * Doc : https://expressjs.com/fr/starter/hello-world.html
 * @type {e | (() => Express)}
 */
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const server = express();
const port = process.env.PORT || 3000;

//On indique quelle datatype on veut utiliser
server.use(express.json());
//Permet à express d'utiliser les fichiers statiques (css / js) dans app
server.use(express.static("app"));
//Chemin absolu à partir duquel se lance le processus node
server.use("/node_modules", express.static(__dirname + "/node_modules"));

//Quand reçoit une requête sur l'url d'origine ça envoie le fichier index.html
server.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
})

//Indique le port écouté
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// URI (Uniform Resource Identifier)
const uri = "mongodb+srv://Tiphaine:admin@cluster0.tyr5k.mongodb.net/FenixTechDatabase?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

//Indique dans la console si je suis bien connectée à mongodb
mongoClient.connect(() => {
  console.info("logged to database");
});


/**
 * Pour recevoir / requêter une donnée de la base de données
 * https://www.mongodb.com/docs/v4.2/reference/method/db.collection.find/
 * Indique le nom de la collection et le document associé de mongodb
 * Convertis en array le résultat
 */
server.get('/ping', function (req, res) {
  console.info("called ping endpoint");
  const collection = mongoClient.db('FenixTechDatabase').collection('test')
  collection.find({}).toArray(function (err, results) {
    res.send(results[0]);
  })
})

server.get('/simulator', function (req, res) {
  console.info("called ping endpoint");
  const collection = mongoClient.db('FenixTechDatabase').collection('test')
  collection.find({}).toArray(function (err, results) {
    res.send(results[1]);
  })
})

/**
 * Pour modifier des données de la base de données
 */

server.put('/simulator/:id', function (req, res) {
  const reqId = req.params.id;
  console.info("called simulator endpoint with id : " + reqId);
  const collection = mongoClient.db('FenixTechDatabase').collection('test');
  collection.updateOne({ _id: ObjectId(reqId) }, { $set: req.body }).then(() => {
    collection.find({ _id: ObjectId(reqId) }).toArray(function (err, results) {
      res.statusCode = 200;
      res.send(results[0]);
    })
  }).catch(() => {
    res.statusCode = 500;
    res.send();
  })
})

/**
 * Pour ajouter des données dans la base de donnée
 */
server.post('/simulator', function (req, res) {
  console.info("called simulator endpoint and create new simulation");
  const collection = mongoClient.db('FenixTechDatabase').collection('test');
  collection.insertOne({ ...req.body }).then((doc) => {
    collection.find({ _id: ObjectId(doc.insertedId) }).toArray(function (err, results) {
      res.statusCode = 200;
      res.send(results[0]);
    })
  }).catch(() => {
    res.statusCode = 500;
    res.send();
  })
})