const express = require('express');
const server = express();
const port = process.env.PORT || 3000;

server.use(express.static("app"));
server.use("/node_modules", express.static(__dirname + "/node_modules"));

server.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
