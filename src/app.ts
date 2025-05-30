import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import taskRoutes from "./routes/taks.route";
import cors from 'cors';
import { init } from "./services/task.service";

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Inicializar socket.io en el servicio
init(io);

// WebSocket event handlers
io.on('connection', socket => {
    console.log('Cliente conectado:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });

    socket.on('error', (error) => {
        console.error('Error de Socket.IO:', error);
    });
});
  
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rutas
app.use('/api', taskRoutes);

export { server };
export default app;
