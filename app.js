const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const server = express();
const port = process.env.PORT || 3000;

//On indique quelle datatype on veut utiliser
server.use(express.json());
//Permet à express d'utiliser les fichiers statiques (css / js) dans app
server.use(express.static("app"));
//Chemin absolu à partir duquel se lance le processus node
server.use("/node_modules", express.static(__dirname + "/../node_modules"));

//Quand reçoit une requête sur l'url d'origine ça envoie le fichier index.html
server.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
})

//Indique le port écouté
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// URI (Uniform Resource Identifier)
const dbHost = process.env.DB_HOST;
const dbPwd = process.env.DB_PWD;
const uri = `mongodb+srv://${dbHost}:${dbPwd}@cluster0.tyr5k.mongodb.net/FenixTechDatabase?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

//Indique dans la console si je suis bien connectée à mongodb
mongoClient.connect(() => {
  console.info("logged to database");
}, () => {
  console.info("error while logging to database");
});

server.get('/cc6Form', function (req, res) {
  console.info("called cc6 form endpoint");
  const collection = mongoClient.db('FenixTechDatabase').collection('FormCC6')
  // TODO if document is not found, create a new empty document for this year
  collection.find({year: req.query['year']}).toArray(function (err, results) {
    res.send(results[0]);
  })
})

/**
 * Pour modifier des données CC6 de la base de données
 */
server.put('/cc6Form/:id', function (req, res) {
  const reqId = req.params.id;
  console.info("called cc6 form endpoint with id : " + reqId);
  const collection = mongoClient.db('FenixTechDatabase').collection('FormCC6');
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
server.post('/vForm', function (req, res) {
  console.info("called v form endpoint and add new vehicule");
  const collection = mongoClient.db('FenixTechDatabase').collection('FormV');
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