const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidV1 = require('uuid/v1');

// Set the port to 1235
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the
  // /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });
wss.broadcast = function broadcast(data) {
  wss
    .clients
    .forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
};
// Set up a callback that will run when a client connects to the server When a
// client connects they are assigned a socket, represented by the ws parameter
// in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    message = JSON.parse(message);
    message.uuid = uuidV1();
    message = JSON.stringify(message);
    console.log(message);
    wss.broadcast(message);
  });

  // Set up a callback for when a client closes the socket. This usually means
  // they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});