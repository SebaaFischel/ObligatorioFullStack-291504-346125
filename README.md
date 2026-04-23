# Obligatorio 1 - Full Stack Developer

API de gestión de biblioteca de películas personal con integración de IA (Gemini).

## Características
- **Arquitectura:** Express con arquitectura de Capas (Router -> Controller -> Service -> Model).
- **Base de Datos:** MongoDB Atlas (Mongoose).
- **IA:** Optimización de reseñas usando Google Gemini 1.5 Flash.
- **Seguridad:** JWT (JSON Web Tokens) y Hasheo de contraseñas con bcryptjs.
- **Validaciones:** Esquemas de Joi para todos los endpoints de entrada.
- **Nomenclatura:** Proyecto refactorizado íntegramente al español.

## Endpoints Principales
- `/v1/auth/register`: Registro de usuarios.
- `/v1/auth/login`: Autenticación.
- `/v1/user-movies`: CRUD de biblioteca personal (Requiere Token).
- `/v1/categories`: Gestión de categorías (Admin).
- `/v1/ia/optimizar-resena`: Mejora de reseñas con IA.

## Instalación Local
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Configurar el archivo `.env` con las API Keys necesarias.
4. Ejecutar `npm run dev`.

Desplegado en Vercel.
