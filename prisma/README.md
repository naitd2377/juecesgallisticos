# Prisma Migrations

Este directorio contiene las migraciones de la base de datos generadas por Prisma.

## Comandos útiles

```bash
# Crear migración después de cambiar el schema
npx prisma migrate dev --name nombre_descriptivo

# Aplicar migraciones en producción
npx prisma migrate deploy

# Abrir Prisma Studio (interfaz visual)
npx prisma studio

# Regenerar cliente de Prisma
npx prisma generate
```

## Importante para Vercel

El comando `prisma generate` se ejecuta automáticamente en el build gracias al script `postinstall` en `package.json`.
