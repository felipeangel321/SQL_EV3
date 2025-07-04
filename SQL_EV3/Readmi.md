# Proyecto: Frontend Básico + Supabase (Login y Landing)

Este proyecto es una guía práctica para crear una landing page y un sistema de login conectado a una base de datos Supabase, usando solo HTML, Tailwind CSS, Chart.js y SweetAlert2 por CDN. Incluye instrucciones detalladas para conectar, crear la base de datos, insertar usuarios y personalizar el sistema.

---

## 1. Estructura de Archivos

```
/
├── index.html        # Landing page (quiénes somos, login, imagen gallina)
├── login.html        # Página de login y bienvenida con gráfico
├── main.js           # (opcional) Lógica JS si usas login en index.html
├── README.md         # Este archivo
```

---

## 2. Requisitos Previos
- Tener una cuenta en [Supabase](https://supabase.com/)
- Navegador moderno (Chrome, Firefox, Edge, etc.)
- Editor de texto (VSCode, Sublime, etc.)

---

## 3. Crear el Proyecto y la Base de Datos en Supabase

### a) Crear un nuevo proyecto en Supabase
1. Ve a [https://app.supabase.com/](https://app.supabase.com/) y crea un proyecto.
2. Elige una organización y un nombre de proyecto.
3. Espera a que se cree la base de datos.

### b) Crear la tabla `usuarios`
1. En el panel de Supabase, ve a **Table Editor** > **New Table**.
2. Llámala `usuarios` y agrega los siguientes campos:
   - `id` (integer, primary key, autoincremental)
   - `email` (varchar(100), unique, not null)
   - `password_hash` (text, not null)
   - `rol` (varchar(20), opcional)

   O ejecuta este SQL en la sección **SQL Editor**:
   ```sql
   create table usuarios (
     id serial primary key,
     email varchar(100) unique not null,
     password_hash text not null,
     rol varchar(20)
   );
   ```

### c) Insertar usuarios de prueba
1. Hashea la contraseña que quieras usar (puedes usar [CyberChef](https://gchq.github.io/CyberChef/) con SHA-256 o el mismo código JS del proyecto).
2. Inserta un usuario desde el panel o con SQL:
   ```sql
   insert into usuarios (email, password_hash, rol) values ('usuario@ejemplo.com', 'HASH_DE_LA_CONTRASEÑA', 'admin');
   ```
   - Reemplaza `'HASH_DE_LA_CONTRASEÑA'` por el hash SHA-256 de la contraseña.

---

## 4. Configuración del Frontend

### a) Obtener las claves de Supabase
1. En el panel de Supabase, ve a **Project Settings** > **API**.
2. Copia:
   - **URL** (por ejemplo, `https://abcd1234.supabase.co`)
   - **anon/public API KEY**

### b) Editar los archivos HTML/JS
- Abre `login.html` (y/o `main.js` si usas login en index.html).
- Busca estas líneas y reemplaza con tus datos:
  ```js
  const SUPABASE_URL = 'https://TU_SUPABASE_URL.supabase.co'; // <-- PON AQUÍ TU URL DE SUPABASE
  const SUPABASE_KEY = 'TU_SUPABASE_KEY'; // <-- PON AQUÍ TU API KEY DE SUPABASE
  ```

---

## 5. Uso y Pruebas

### a) Probar el login
1. Abre `index.html` en tu navegador.
2. Haz clic en "Login" para ir a `login.html`.
3. Ingresa el correo y contraseña de un usuario registrado (la contraseña debe coincidir con el hash en la base de datos).
4. Si es correcto, verás la bienvenida y el gráfico. Si no, verás un error con SweetAlert2.

### b) Insertar más usuarios
- Puedes agregar más usuarios desde el panel de Supabase o con SQL, siempre usando el hash SHA-256 de la contraseña.

---

## 6. Personalización
- Cambia los textos de los `<h1>`, `<h2>`, `<p>`, etc. en los HTML.
- Cambia la imagen de la gallina por cualquier otra imagen si lo deseas.
- Modifica los colores de Tailwind en las clases si quieres otro estilo.
- Puedes agregar más campos a la tabla `usuarios` y adaptarlo en el JS.

---

## 7. Despliegue
- Puedes subir estos archivos a cualquier hosting estático (Netlify, Vercel, GitHub Pages, etc.).
- No expongas la API KEY si tu proyecto tiene datos sensibles (usa reglas de seguridad en Supabase).

---

## 8. Solución de Problemas
- Si el login no funciona:
  - Verifica que la URL y la KEY de Supabase sean correctas.
  - Asegúrate de que el usuario y el hash existan en la tabla.
  - Revisa la consola del navegador para ver errores de red o CORS.
- Si la imagen no carga, prueba con otra URL.
- Si necesitas hashear contraseñas, usa el mismo método SHA-256 que en el JS.

---

## 9. Recursos Útiles
- [Supabase Docs](https://supabase.com/docs)
- [CyberChef (para hash SHA-256)](https://gchq.github.io/CyberChef/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Chart.js Docs](https://www.chartjs.org/docs/latest/)
- [SweetAlert2 Docs](https://sweetalert2.github.io/)

---

## 10. Créditos
- Plantilla y guía por Felipe Angel.
- Imagen de gallina: [Unsplash Premium](https://plus.unsplash.com/premium_photo-1664971411530-9d2199405d53?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) 