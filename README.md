# Jueces Gallísticos - Versión 2

Sistema completo de gestión para jueces de eventos gallísticos con autenticación, panel de control y gestión de eventos.

## Novedades de esta versión

- ✅ Página landing con diseño profesional
- ✅ Sistema de autenticación (login/registro) con JWT
- ✅ Panel de control con dashboard de estadísticas
- ✅ Gestión completa de eventos (CRUD)
- ✅ APIs REST para eventos y autenticación
- ✅ Diseño consistente en todas las páginas

## Instalación

### 1. Reemplazar archivos

Copia estos archivos y reemplaza los de tu proyecto actual:

```
src/app/page.tsx                    ← Landing page
src/app/login/page.tsx              ← Página de login
src/app/registro/page.tsx           ← Página de registro
src/app/panel/page.tsx              ← Panel principal
src/app/panel/eventos/page.tsx      ← Gestión de eventos
src/app/api/auth/login/route.ts     ← API login
src/app/api/auth/registro/route.ts  ← API registro
src/app/api/eventos/route.ts        ← API eventos (GET, POST)
src/app/api/eventos/[id]/route.ts   ← API evento individual (GET, DELETE)
src/app/globals.css                 ← Estilos Tailwind
src/app/layout.tsx                  ← Layout raíz
src/components/ui/*                 ← Componentes UI
src/components/theme-provider.tsx   ← Provider de tema
src/lib/auth.ts                     ← Utilidades JWT
src/lib/prisma.ts                   ← Cliente Prisma
src/lib/utils.ts                    ← Utilidades
prisma/schema.prisma                ← Esquema de BD
package.json                        ← Dependencias actualizadas
```

### 2. Instalar nuevas dependencias

```bash
npm install bcryptjs jose
npm install -D @types/bcryptjs
```

### 3. Configurar variable JWT_SECRET

En tu archivo `.env` (local) y en Vercel → Settings → Environment Variables:

```
JWT_SECRET="e9193b09b9e8be543aea5516f6f86cdc"
```

### 4. Actualizar base de datos

Si cambiaste el schema, ejecuta:

```bash
npx prisma db push
```

### 5. Probar localmente

```bash
npm run dev
```

Abre http://localhost:3000

### 6. Desplegar en Vercel

```bash
git add .
git commit -m "Actualizar diseño completo y funcionalidades"
git push
```

Vercel desplegará automáticamente.

## Credenciales de prueba

Para crear tu primer usuario admin, regístrate en `/registro`. 
El primer usuario será JUEZ por defecto.

## Estructura del proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── registro/route.ts
│   │   └── eventos/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── login/page.tsx
│   ├── registro/page.tsx
│   ├── panel/
│   │   ├── page.tsx
│   │   └── eventos/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── sonner.tsx
│   └── theme-provider.tsx
└── lib/
    ├── auth.ts
    ├── prisma.ts
    └── utils.ts
```

## Funcionalidades

### Páginas públicas
- `/` - Landing page con información del servicio
- `/login` - Inicio de sesión
- `/registro` - Crear cuenta nueva

### Páginas privadas (requieren login)
- `/panel` - Dashboard con estadísticas
- `/panel/eventos` - Listado y creación de eventos

### APIs
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/registro` - Crear cuenta
- `GET /api/eventos` - Listar eventos del usuario
- `POST /api/eventos` - Crear evento
- `GET /api/eventos/[id]` - Ver evento con peleas
- `DELETE /api/eventos/[id]` - Eliminar evento
