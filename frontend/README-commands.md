# Comandos útiles para actualizar dependencias y herramientas (Next.js, Prisma, etc.)

## Actualizar dependencias generales (usando pnpm)

```bash
pnpm update
```

## Actualizar Next.js

```bash
pnpm update next
```

## Actualizar Prisma Client y CLI

```bash
pnpm update @prisma/client prisma
```

## Comandos útiles de Prisma

### 1. Generar Prisma Client
```bash
pnpm prisma generate
```

### 2. Crear una nueva migración
```bash
pnpm prisma migrate dev --name nombre_de_migracion
```

### 3. Aplicar migraciones en producción
```bash
pnpm prisma migrate deploy
```

### 4. Abrir Prisma Studio (GUI para la base de datos)
```bash
pnpm prisma studio
```

### 5. Sincronizar el esquema Prisma con la base de datos (sin migración)
```bash
pnpm prisma db push
```

---

> **Nota:** Cambia `pnpm` por `npm` o `yarn` si usas otro gestor de paquetes. 