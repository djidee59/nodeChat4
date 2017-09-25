'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => console.log('Client disconnected'));

  socket.on('nouveau_client', function(pseudo) {
    socket.pseudo = pseudo;
    socket.broadcast.emit('nouveau_client', pseudo);
    console.log("*** JDE *** pseudo: " + pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
    console.log("*** JDE *** message reçu: " + message);
    socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 

});


setInterval(() => io.emit('time', new Date().toTimeString()), 1000);