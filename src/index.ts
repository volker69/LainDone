import app from "./app"
import { server } from "./app";  // Importamos el servidor HTTP

const PORT = 3000;
const HOSTLOCAL = '0.0.0.0';

server.listen(PORT, HOSTLOCAL, () => {
    console.log(`Servidor corriendo en http://${HOSTLOCAL}:${PORT}`);
});

export default app;