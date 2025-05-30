FROM node:20.12.2

WORKDIR /app

# Copiar archivos
COPY package*.json ./
COPY tsconfig.json ./

# Instalar TODAS las dependencias
RUN apt-get update && \
    apt-get install -y python3 build-essential && \
    npm install

# Copiar el resto del código
COPY . .

# Compilar
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Arrancar app
CMD ["node", "dist/index.js"]