const CONFIG = require('./config');
const server = require('./server')(CONFIG);
const io = require('socket.io')(server.http);

io.on('connection', socket => {
    console.log(socket.id);
    socket.join('chat');
    socket.on('chat message', msg => io.emit('chat message', msg));
    socket.on('disconnect', () => console.log('a user disconnected'));
})
