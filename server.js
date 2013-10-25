var express = require("express");
var app = express();
var port = 8000;

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get("/", function(req, res){
    res.render("page");
});

app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    console.log('welcome');

    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port: " + port);