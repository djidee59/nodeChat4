var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');

// port variable sur heroku
var port = Number(process.env.PORT || 8080);


// Chargement de la page index.html
app.get('/', function (req, res) {
    console.log("*** JDE *** loading HTML");
  res.sendfile(__dirname + '/index.html');
});


server.listen(port);
console.log("*** JDE *** Listening on "+ port );