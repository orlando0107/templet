# 📝 Ejemplo Completo: Sistema de Biografías

Este ejemplo demuestra cómo implementar un sistema completo de CRUD (Create, Read, Update, Delete) usando el template Next.js + Prisma. El sistema de biografías incluye todos los métodos HTTP y utiliza la lista de errores existente.

## 🏗️ Arquitectura del Ejemplo

### Base de Datos
- **Modelo**: `Biography` en `prisma/schema.prisma`
- **Relación**: Uno a uno con `User`
- **Campos**: `content`, `title`, `isPublic`, timestamps

### API Routes
- **`/api/biography`**: CRUD completo (GET, POST, PUT, DELETE)
- **`/api/biography/[id]`**: Obtener biografías públicas por ID

### Frontend
- **Hooks**: `useBiography.ts` - Hooks personalizados para todas las operaciones
- **Componentes**: Formularios, tarjetas de visualización, botones de eliminación
- **Páginas**: Gestión de biografía y visualización pública
- **Servicios**: `biography.ts` - Servicios con manejo de errores

## 📁 Estructura de Archivos

```
src/
├── app/
│   ├── api/biography/
│   │   ├── route.ts                    # CRUD principal
│   │   └── [id]/route.ts              # Obtener por ID
│   ├── biography/[id]/page.tsx         # Página pública
│   └── profile/biography/page.tsx      # Gestión personal
├── components/
│   ├── forms/biography.tsx             # Formulario CRUD
│   └── biography/
│       ├── BiographyCard.tsx           # Tarjeta de visualización
│       └── DeleteBiographyButton.tsx   # Botón de eliminación
├── hooks/
│   └── useBiography.ts                 # Hooks personalizados
├── services/
│   └── biography.ts                    # Servicios con errores
├── types/formData/types.ts             # Tipos TypeScript
└── schema/myZods.ts                    # Validaciones Zod
```

## 🔧 Funcionalidades Implementadas

### 1. **Modelo de Datos** (`prisma/schema.prisma`)
```prisma
model Biography {
  id          String   @id @default(cuid())
  userId      String   @unique
  content     String   @db.Text
  title       String?
  isPublic    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 2. **API Routes** (`/api/biography/route.ts`)
- **GET**: Obtener biografía del usuario actual
- **POST**: Crear nueva biografía
- **PUT**: Actualizar biografía existente
- **DELETE**: Eliminar biografía

### 3. **Hooks Personalizados** (`hooks/useBiography.ts`)
```typescript
// Hooks disponibles:
useGetBiography()           // Obtener biografía actual
useGetBiographyById(id)     // Obtener por ID
useCreateBiography()        // Crear nueva
useUpdateBiography()        // Actualizar existente
useDeleteBiography()        // Eliminar
```

### 4. **Componentes Reutilizables**
- **`BiographyForm`**: Formulario completo con validación
- **`BiographyCard`**: Tarjeta de visualización
- **`DeleteBiographyButton`**: Botón de eliminación con confirmación

### 5. **Manejo de Errores**
Utiliza la lista de errores existente (`utils/serverErrorMessages.ts`):
```typescript
import { mapServerErrorToUserMessage } from "@/utils/serverErrorMessages";

// En servicios y API routes
const userMessage = mapServerErrorToUserMessage(error);
```

## 🚀 Cómo Usar

### 1. **Crear/Editar Biografía**
```typescript
import { BiographyForm } from "@/components/forms/biography";

// En tu página
<BiographyForm onSuccess={() => {
  // Callback después de éxito
}} />
```

### 2. **Mostrar Biografía Pública**
```typescript
import { BiographyCard } from "@/components/biography/BiographyCard";

// En tu página
<BiographyCard biography={biographyData} />
```

### 3. **Usar Hooks Directamente**
```typescript
import { useGetBiography, useCreateBiography } from "@/hooks/useBiography";

function MyComponent() {
  const { data: biography, isLoading } = useGetBiography();
  const { mutate: createBiography } = useCreateBiography();
  
  // Usar los hooks...
}
```

## 🎯 Características Destacadas

### ✅ **Validación Completa**
- Zod schemas para validación de formularios
- Validación en frontend y backend
- Mensajes de error personalizados

### ✅ **Manejo de Estados**
- Loading states para todas las operaciones
- Estados de error con modales
- Confirmaciones para acciones destructivas

### ✅ **Seguridad**
- Autenticación requerida para operaciones CRUD
- Validación de permisos (solo el propietario puede editar)
- Biografías públicas solo accesibles por ID

### ✅ **UX/UI**
- Modales para confirmaciones y mensajes
- Formularios responsivos con Tailwind CSS
- Feedback visual para todas las acciones

### ✅ **Reutilización**
- Componentes modulares
- Hooks personalizados
- Servicios con manejo de errores

## 🔄 Flujo de Datos

1. **Usuario accede** → Dashboard muestra enlace a biografía
2. **Formulario** → Usa hooks para operaciones CRUD
3. **API Routes** → Validan datos y manejan errores
4. **Base de Datos** → Prisma ejecuta operaciones
5. **Respuesta** → Modales muestran resultado al usuario

## 📝 Ejemplo de Uso Completo

### Página de Gestión (`/profile/biography`)
```typescript
// Muestra formulario de edición
<BiographyForm />

// Muestra botón de eliminación
<DeleteBiographyButton />
```

### Página Pública (`/biography/[id]`)
```typescript
// Muestra biografía pública
<BiographyCard biography={biography} />
```

## 🛠️ Comandos para Probar

```bash
# 1. Aplicar migración
pnpm prisma migrate dev --name add_biography_model

# 2. Generar cliente Prisma
pnpm prisma generate

# 3. Iniciar servidor
pnpm dev

# 4. Acceder a:
# - Dashboard: http://localhost:3000/dashboard
# - Gestión de biografía: http://localhost:3000/profile/biography
```

## 🎨 Personalización

### Cambiar Estilos
- Modifica clases de Tailwind en los componentes
- Actualiza colores en `tailwind.config.js`
- Personaliza modales en `ModalDialog.tsx`

### Agregar Campos
1. Actualiza el modelo en `schema.prisma`
2. Ejecuta migración: `pnpm prisma migrate dev`
3. Actualiza tipos en `types/formData/types.ts`
4. Modifica validaciones en `schema/myZods.ts`
5. Actualiza formularios y componentes

### Agregar Funcionalidades
- Nuevos hooks en `hooks/useBiography.ts`
- Nuevos endpoints en `app/api/biography/`
- Nuevos componentes en `components/biography/`

## 🔍 Debugging

### Verificar Base de Datos
```bash
# Abrir Prisma Studio
pnpm prisma studio

# Ver logs de migraciones
pnpm prisma migrate status
```

### Verificar API
```bash
# Probar endpoints
curl http://localhost:3000/api/biography
```

## 📚 Aprendizajes Clave

1. **Separación de Responsabilidades**: Hooks, servicios, componentes y API routes están bien separados
2. **Reutilización**: Un solo modal para todos los mensajes
3. **Manejo de Errores**: Lista centralizada de errores
4. **Validación**: Zod en frontend y backend
5. **UX**: Estados de carga, confirmaciones y feedback visual
6. **Seguridad**: Autenticación y validación de permisos

Este ejemplo demuestra las mejores prácticas para implementar CRUD completo en el template, usando todos los componentes y patrones existentes. 