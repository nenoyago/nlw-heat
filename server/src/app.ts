import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import errorHandler from './errors/handler';
import { routes } from './routes';

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log(`User ${socket.id} connection established on socket`);
});

app.use(express.json());

app.use(routes);
app.use(errorHandler);

export { serverHttp, io };
