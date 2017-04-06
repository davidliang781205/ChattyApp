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
// in the callback. Use a sequence of unique IDs for every socket
let nextSocketId = 1;
// Store color about each socket
const sockets = {};

wss.on('connection', (ws) => {
  // Assign the new socket the next ID
  const socketId = nextSocketId;
  // Then increment the next ID so the next socket gets a higher number
  nextSocketId++;

  sockets[socketId] = {
    socket: ws,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16)
  };

  console.log('Client connected');
  wss.broadcast(JSON.stringify({ type: 'onlineUsers', number: wss.clients.size }));
  ws.send(JSON.stringify({ type: 'userColor', color: sockets[socketId].color }));

  ws.on('message', (message) => {
    message = JSON.parse(message);
    switch (message.type) {
      case "postMessage":
        // handle incoming message
        message.type = 'incomingMessage';
        message.uuid = uuidV1();
        message.color = sockets[socketId].color;
        message = JSON.stringify(message);
        break;
      case "postNotification":
        // handle incoming notification
        message.type = 'incomingNotification';
        message.uuid = uuidV1();
        message.color = sockets[socketId].color;
        message = JSON.stringify(message);
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + message.type);
    }

    wss.broadcast(message);
  });

  // Set up a callback for when a client closes the socket. This usually means
  // they closed their browser.
  ws.on('close', () => {
    wss.broadcast(JSON.stringify({ type: 'onlineUsers', number: wss.clients.size }));
  });
});