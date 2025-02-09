#!/bin/bash
#'postgres://postgres:password@localhost:5432/postgres'
DB_NAME="postgresql"
DB_USER="postgresql"
DB_PASSWORD="postgresql"
ENV_FILE=".env"

echo "🖥 Detectando sistema operativo..."
OS=$(uname -s)

if [ "$OS" != "Linux" ]; then
    echo "❌ Este script solo es compatible con Linux."
    exit 1
fi

echo "✅ Sistema operativo: Linux"

# Función para verificar si un comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 1️⃣ Verificar e instalar npm
if command_exists npm; then
    echo "✅ npm ya está instalado."
else
    echo "📦 npm no está instalado. Instalando..."
    sudo apt update && sudo apt install -y npm
fi

# 2️⃣ Verificar e instalar pnpm
if command_exists pnpm; then
    echo "✅ pnpm ya está instalado."
else
    echo "📦 pnpm no está instalado. Instalando..."
    npm install -g pnpm
    pnpm setup
    echo "🔄 Reinicia la terminal si hay problemas con pnpm."
fi

# 🔄 Asegurar que PNPM_HOME esté en el PATH
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME/bin:$PATH"
echo "🔧 Configurando PNPM_HOME en PATH..."
echo 'export PNPM_HOME="$HOME/.local/share/pnpm"' >> ~/.bashrc
echo 'export PATH="$PNPM_HOME/$PATH"' >> ~/.bashrc
source ~/.bashrc

# 3️⃣ Verificar e instalar turbo
if npm list -g | grep -q "turbo"; then
    echo "✅ turbo ya está instalado."
else
    echo "🚀 turbo no está instalado. Instalando..."
    npm install turbo --global
fi

# 4️⃣ Verificar que turbo está accesible
if command_exists turbo; then
    echo "✅ turbo instalado correctamente: $(turbo --version)"
else
    echo "❌ turbo no se encontró en el PATH. Intenta reiniciar la terminal."
fi

echo "🎉 Instalación completada. 🚀"

# 5️⃣ Verificar e instalar PostgreSQL
if command_exists psql; then
    echo "✅ PostgreSQL ya está instalado: $(psql --version)"
else
    echo "🐘 PostgreSQL no está instalado. Instalando..."
    sudo apt update
    sudo apt install -y postgresql postgresql-contrib
    echo "✅ PostgreSQL instalado correctamente."
fi

# 6️⃣ Verificar si el servicio PostgreSQL está corriendo
echo "🔄 Verificando estado de PostgreSQL..."
sudo systemctl enable --now postgresql
sudo systemctl status postgresql --no-pager

echo "🎉 Instalación completada. 🚀"

# 2️⃣ Verificar si el servicio PostgreSQL está corriendo
echo "🔄 Verificando estado de PostgreSQL..."
sudo systemctl enable --now postgresql
sudo systemctl status postgresql --no-pager

# 3️⃣ Crear base de datos y usuario si no existen
echo "🛠 Creando base de datos y usuario..."

# Crear la base de datos si no existe
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || sudo -u postgres psql -c "CREATE DATABASE $DB_NAME"

# Crear el usuario si no existe
sudo -u postgres psql -c "DO \$\$ BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_USER') THEN
      CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
      GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
      ALTER USER $DB_USER CREATEDB;
      RAISE NOTICE 'Usuario $DB_USER creado con permisos.';
   ELSE
      RAISE NOTICE 'El usuario $DB_USER ya existe.';
   END IF;
END \$\$;"

# 🔥 Agregar permisos al esquema public
sudo -u postgres psql -d $DB_NAME -c "GRANT ALL ON SCHEMA public TO $DB_USER;"
sudo -u postgres psql -d $DB_NAME -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;"
sudo -u postgres psql -d $DB_NAME -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;"
sudo -u postgres psql -d $DB_NAME -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO $DB_USER;"


echo "✅ Base de datos y usuario configurados correctamente."


# 4️⃣ Guardar credenciales en .env
echo "📝 Guardando credenciales en $ENV_FILE..."
cat <<EOT > $ENV_FILE
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME
EOT

echo "✅ Archivo $ENV_FILE generado con éxito."

echo "🎉 Instalación completada. 🚀"