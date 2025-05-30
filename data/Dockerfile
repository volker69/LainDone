FROM postgres:16

# Copiar el script SQL al directorio de inicialización
COPY todo.sql /docker-entrypoint-initdb.d/

VOLUME [ "/data" ,"/var/lib/postgresql/data" ]