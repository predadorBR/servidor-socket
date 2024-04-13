const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
var cors = require('cors');

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(cors({origin: 'http://localhost:3000'}));
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Usuário conectado ID:'+socket.id);
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    //io.emit('chat message', socket.id+': ' +msg);
    console.log(socket.id+': ' + msg);
  });
 
  socket.on('disconnect', () => {
    console.log('Usuário Desconectado ID:'+socket.id);
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando http://localhost:3000');
});