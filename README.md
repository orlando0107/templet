# MyTemple

Proyecto de Frontend - Next.js 15 + TailwindCSS 4 + Prisma

Este proyecto es un template reutilizable para evitar escribir el mismo código constantemente al iniciar nuevos proyectos. Usa Next.js 15, TailwindCSS 4 y Prisma con PostgreSQL para crear aplicaciones web modernas y escalables.

Tecnologías Usadas:

-Next.js 15: Framework de React para la creación de aplicaciones web escalables y con renderizado del lado del servidor.
-TailwindCSS 4: Framework de CSS utility-first para un desarrollo de interfaces más rápido y con diseño totalmente personalizado.
-Prisma: ORM para la gestión de bases de datos PostgreSQL, simplificando las consultas y la administración de datos.
-Turbo: Herramienta de monorepo para acelerar los desarrollos y builds.

Estructura del Proyecto

project-root/
├── public/                     # Archivos públicos (imágenes, fuentes, etc.)
├── src/                        # Código fuente principal
│   ├── components/             # Componentes reutilizables
│   │   ├── common/             # Componentes genéricos (botones, inputs, etc.)
│   │   ├── layout/             # Componentes de layout (Header, Footer, etc.)
│   │   ├── forms/              # Componentes relacionados con formularios
│   │   ├── modals/             # Modales reutilizables
│   │   └── widgets/            # Componentes específicos de la página o funcionalidad
│   ├── features/               # Funcionalidades específicas
│   │   ├── auth/               # Funciones y componentes relacionados con autenticación
│   │   ├── dashboard/          # Funcionalidades del panel de control
│   │   └── profile/            # Funciones y componentes de perfil
│   ├── hooks/                  # Custom hooks
│   ├── pages/                  # Rutas y vistas (estructura de Next.js)
│   │   ├── api/                # Rutas API de Next.js
│   │   ├── auth/               # Páginas relacionadas con autenticación (login, registro)
│   │   └── index.tsx           # Página principal
│   ├── services/               # Lógica para consumir APIs (fetchers, axios, etc.)
│   │   └── api/                # Configuración y controladores de APIs
│   ├── stores/                 # Estado global (Zustand, Context, Redux, etc.)
│   ├── styles/                 # Archivos CSS, SCSS o módulos CSS
│   │   ├── globals.css         # Estilos globales
│   │   └── theme.ts            # Temas (colores, tipografías, etc.)
│   ├── utils/                  # Funciones de utilidad y helpers
│   │   └── constants.ts        # Constantes reutilizables
│   ├── middleware.ts           # Middleware (si es necesario)
│   └── app/                    # Opcional: Carpeta para el nuevo sistema App Router de Next.js (v13+)
├── .eslint.config.js           # Configuración de ESLint
├── .prettierrc                 # Configuración de Prettier
├── next.config.js              # Configuración de Next.js
├── tsconfig.json               # Configuración de TypeScript
└── package.json                # Dependencias y scripts

## Descripción de Componentes

/components/common/: Componentes genéricos reutilizables como botones, inputs, selectores, etc.
/components/layout/: Componentes de layout, como encabezados, pies de página y barras laterales.
/components/forms/: Componentes relacionados con formularios, como campos de entrada y validaciones.
/components/modals/: Modales reutilizables para mostrar información adicional o realizar acciones de confirmación.
/components/widgets/: Componentes específicos de una página o funcionalidad.
Funcionalidades Específicas
/features/auth/: Funciones y componentes relacionados con autenticación de usuarios, como login y registro.
/features/dashboard/: Funciones para el panel de control del usuario.
/features/profile/: Funciones y componentes de perfil de usuario.
Configuración Global
/stores/: Utiliza librerías como Zustand o Redux para el manejo de estado global.
/styles/: Estilos globales y temas definidos para toda la aplicación.
/utils/: Funciones de utilidad, como constantes globales o funciones helper.

## Comandos y Scripts

··· Comandos de Turbo Pack:

* turbo build: Ejecuta el build optimizado para el proyecto.
* turbo check-types: Verifica que todos los tipos estén correctamente definidos.
* turbo dev: Inicia el entorno de desarrollo.

* Comandos de Prisma:

-prisma migrate dev: Ejecuta las migraciones de la base de datos durante el desarrollo.
-prisma generate: Genera los tipos de Prisma para que puedas usarlos en el código.
-prisma studio: Inicia Prisma Studio, una herramienta gráfica para gestionar la base de datos.
-prisma db push: Aplica los cambios de esquema sin migraciones.

Formateo y Linting con Biome:

pnpm biome check: Verifica errores en el código.

pnpm biome format: Formatea el código automáticamente.

pnpm biome lint: Realiza análisis estático para mejorar la calidad del código.

### TanStack Query

Uso de TanStack Query en Next.js 15
¿Qué es TanStack Query?
TanStack Query es una librería de gestión de estado asíncrono para aplicaciones React. Simplifica la obtención, almacenamiento en caché, sincronización y actualización de datos en tu aplicación. Es especialmente útil para manejar peticiones a APIs, ya que proporciona herramientas para gestionar el estado de carga, errores y datos de manera eficiente.

¿Por qué usar TanStack Query en Next.js 15?
Simplifica la gestión de datos: TanStack Query elimina la necesidad de escribir código repetitivo para manejar peticiones HTTP, almacenamiento en caché y actualización de datos.

Caché inteligente: Almacena automáticamente los datos en caché y los sincroniza en segundo plano, mejorando el rendimiento y la experiencia del usuario.

Integración con Server-Side Rendering (SSR) y Static Site Generation (SSG): TanStack Query funciona perfectamente con las características de renderizado del lado del servidor de Next.js, permitiendo pre-fetching de datos y sincronización entre el servidor y el cliente.

DevTools integradas: Proporciona herramientas de desarrollo para depurar y visualizar el estado de las consultas.

Mejora la productividad: Reduce la complejidad del código y permite centrarse en la lógica de negocio en lugar de la gestión de estados asíncronos.

¿Qué ventajas aporta en comparación con otras soluciones?
Comparado con useEffect + fetch: TanStack Query maneja automáticamente la caché, la revalidación de datos y el estado de carga, evitando la necesidad de escribir lógica manual.

Comparado con Redux o Zustand: TanStack Query está específicamente diseñado para manejar datos asíncronos, mientras que Redux y Zustand son más adecuados para el estado global de la aplicación.

* Instalación
Clona este repositorio:
git clone <https://github.com/orlando0107/frontend.git>

cd frontend
Instala las dependencias usando pnpm:

pnpm install
Para iniciar el servidor de desarrollo:

turbo dev
o
bun dev
