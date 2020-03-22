import app from '../src/index';
import http from 'http';

const server = http.createServer(app);
const port = 3000;

const onError = (error: NodeJS.ErrnoException) => {
  const { code, syscall } = error;
  if (syscall !== 'listen') throw error;
  switch (code) {
    case 'EACCESS':
      console.log('Access denied.');
      break;
    case 'EADDRINUSE':
      console.log('Address in use.');
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  console.log('Listening on port', port);
};

const onConnection = (socket: NodeJS.Socket) => {};

const onClose = () => {
  console.log('Client disconnected');
};

server.on('error', onError);
server.on('listening', onListening);
server.on('close', onClose);
server.on('connection', onConnection);

server.listen(port);
