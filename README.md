# API de Gestión de Tareas con WebSocket

Esta API permite gestionar tareas con actualizaciones en tiempo real usando WebSocket.

## Requisitos Previos

- Docker
- Docker Compose
- Node.js (para desarrollo)

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PG_USER=postgres
PG_PASSWORD=postgres123
PG_DATABASE=todo_db
PG_HOST=database_todo
PG_PORT=5432
```

## Iniciar la Aplicación

1. Construir y levantar los contenedores:
```bash
docker-compose up -d
```

2. Para detener los contenedores:
```bash
docker-compose down
```

## Endpoints de la API

Base URL: `http://localhost:8080/api`

### Tareas

- **GET** `/tasks` - Obtener todas las tareas
- **POST** `/task` - Crear una nueva tarea
  ```json
  {
    "titulo": "Nueva Tarea",
    "descripcion": "Descripción de la tarea"
  }
  ```
- **PUT** `/task/:taskId` - Actualizar estado de una tarea
  ```json
  {
    "estado": "COMPLETADA"
  }
  ```
- **DELETE** `/task/:task_id` - Eliminar una tarea

## WebSocket

La aplicación utiliza WebSocket para actualizaciones en tiempo real.

URL de conexión WebSocket: `ws://localhost:8080` "En Postmans con el tipo request socket.io"

### Eventos WebSocket

- `Tarea creada` - Se emite cuando se crea una nueva tarea
- `Tarea Actualizada` - Se emite cuando se actualiza una tarea
- `Tarea Eliminada` - Se emite cuando se elimina una tarea


## Desarrollo

Para desarrollo local sin Docker:

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar en modo desarrollo:
```bash
npm run dev
```

3. Ejecutar tests:
```bash
npm test
```