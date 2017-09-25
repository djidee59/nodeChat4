var app = require('express')(),
    server = require('http').createServer(app),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');

// port variable sur heroku
var port = Number(process.env.PORT || 8080);


// Chargement de la page index.html
app.get('/', function (req, res) {
    console.log("*** JDE *** loading HTML");
  res.sendfile(__dirname + '/index.html');
});

// IO config zone
const io = socketIO(server);

io.on('connection', function (socket) {
    console.log("*** JDE *** Client connected");
    socket.on('dicsonnect', function (socket) {
        console.log("*** JDE *** Client disconnected");
    }
    });


server.listen(port);
console.log("*** JDE *** Listening on "+ port );