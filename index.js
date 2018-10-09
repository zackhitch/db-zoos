const express = require('express');
const helmet = require('helmet');

const zoosRoutes = require('./zoos/zoosRoutes.js');
const bearsRoutes = require('./bears/bearsRoutes.js');

const server = express();

server.use(helmet(), express.json());

// endpoints here
server.get('/', (req, res) => {
  res.send('Hello from Index.js');
});

server.use('/api/zoos', zoosRoutes);
server.use('/api/bears', bearsRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
