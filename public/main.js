window.onload = function() {
    var messages = [];
    var socket = io.connect('http://192.168.50.223:8000');
 
    socket.on('message', function (data) {
        var left = data.message == 'center' ? '50%' : data.message == 'left' ? '20%' : '70%';

        $('.box').animate({
            'left': left
        }, 500, 'ease-out');
    });

    window.addEventListener( 'deviceorientation', function( data ){
        if (Math.round(data.gamma) < -20) {
            socket.emit('send', { message: 'left'});
        }
        else if (Math.round(data.gamma) > 20) {
            socket.emit('send', { message: 'right'});
        }
        else {
            socket.emit('send', { message: 'center'});
        }
    });

    goLeft = function() {
        socket.emit('send', { message: 'left'});
    }

    goRight = function() {
        socket.emit('send', { message: 'right'});
    }

    goCenter = function() {
        socket.emit('send', { message: 'center'});
    }
}