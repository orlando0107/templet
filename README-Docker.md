# Uso de Docker en este proyecto

Este proyecto incluye una configuración de Docker Compose para levantar fácilmente una base de datos PostgreSQL y una interfaz de administración visual con pgAdmin.

---

## Servicios incluidos

- **PostgreSQL**: Base de datos principal para desarrollo y pruebas.
- **pgAdmin**: Interfaz web para administrar y visualizar la base de datos PostgreSQL.

---

## ¿Cómo levantar los servicios?

1. **Asegúrate de tener Docker y Docker Compose instalados.**
2. En la raíz del proyecto, ejecuta:
   ```bash
   docker-compose up -d
   ```
3. Esto levantará dos contenedores:
   - `templet_postgres` (PostgreSQL)
   - `templet_pgadmin` (pgAdmin)

---

## Acceso a PostgreSQL

- **Host:** `localhost`
- **Puerto:** `5432`
- **Usuario:** `postgresql`
- **Contraseña:** `postgresql`
- **Base de datos:** `postgresql`

---

## Acceso a pgAdmin

- **URL:** [http://localhost:5050](http://localhost:5050)
- **Usuario:** `admin@admin.com`
- **Contraseña:** `admin`

### Para conectar pgAdmin a PostgreSQL:
1. Ingresa a pgAdmin con las credenciales anteriores.
2. Haz clic derecho en "Servers" > "Create" > "Server..."
3. En la pestaña **General**:
   - Nombre: `templet_postgres` (o el que prefieras)
4. En la pestaña **Connection**:
   - Host name/address: `postgres` (nombre del servicio en docker-compose)
   - Port: `5432`
   - Username: `postgresql`
   - Password: `postgresql`
5. Haz clic en "Save".

---

## Comandos útiles

- **Ver logs de los servicios:**
  ```bash
  docker-compose logs -f
  ```
- **Detener los servicios:**
  ```bash
  docker-compose down
  ```
- **Reiniciar los servicios:**
  ```bash
  docker-compose restart
  ```

---

> Si tienes dudas o problemas con Docker, revisa la documentación oficial o consulta con tu equipo. 