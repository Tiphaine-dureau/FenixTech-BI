/**
 * Initialiser nodejs avec express et mongodb
 * Doc : https://expressjs.com/fr/starter/hello-world.html
 * @type {e | (() => Express)}
 */
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());
server.use(express.static("app"));
server.use("/node_modules", express.static(__dirname + "/node_modules"));

server.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

const uri = "mongodb+srv://Tiphaine:admin@cluster0.tyr5k.mongodb.net/FenixTechDatabase?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

mongoClient.connect(() => {
  console.info("logged to database");
});


/**
 * Pour recevoir / requêter une donnée de la base de données
 * https://www.mongodb.com/docs/v4.2/reference/method/db.collection.find/
 */

server.get('/ping', function(req, res) {
  console.info("called ping endpoint");
  const collection = mongoClient.db('FenixTechDatabase').collection('test')

  collection.find({}).toArray(function (err, results) {
    res.send(results[0]);
  })
})

/**
 * Pour modifier une donnée de la base de données
 */

server.put('/simulator/:id', function(req, res) {
  const reqId = req.params.id;
  console.info("called simulator endpoint with id : " + reqId);
  console.info(req.body);
  const collection = mongoClient.db('FenixTechDatabase').collection('test')
  // TODO mise à jour de la BDD
  collection.find({_id: reqId}).toArray(function (err, results) {
    res.send(results[0]);
  })
})