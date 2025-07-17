# 🍗 KFC Dashboard - Sistema de Análisis de Ventas

## 📋 Descripción del Proyecto

Sistema web completo de análisis de ventas para KFC que incluye autenticación segura, dashboard interactivo con gráficos en tiempo real y base de datos PostgreSQL con Supabase. El proyecto demuestra el uso avanzado de SQL incluyendo vistas, funciones, triggers y procedimientos almacenados.

## ✨ Características Principales

### 🔐 Autenticación y Seguridad
- **Login seguro** con hash SHA-256 de contraseñas
- **Persistencia de sesión** usando localStorage
- **Redirección automática** entre páginas
- **Validación de credenciales** en tiempo real

### 📊 Dashboard Interactivo
- **4 gráficos modernos** con Chart.js:
  - Producto más vendido por sucursal (Gráfico de barras)
  - Compras mayores a $40.000 (Gráfico de barras)
  - Ventas por categoría de producto (Gráfico de dona)
  - Ventas por método de pago (Gráfico circular)
- **Diseño responsive** con Tailwind CSS
- **Actualización en tiempo real** de datos
- **Interfaz moderna** y profesional

### 🗄️ Base de Datos Avanzada
- **PostgreSQL** con Supabase
- **Vistas complejas** para análisis de datos
- **Funciones personalizadas** para cálculos
- **Triggers automáticos** para validaciones
- **Procedimientos almacenados** para operaciones complejas
- **Row Level Security (RLS)** configurado

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones
- **JavaScript (ES6+)** - Lógica de aplicación
- **Tailwind CSS** - Framework de estilos
- **Chart.js** - Gráficos interactivos
- **SweetAlert2** - Notificaciones elegantes

### Backend y Base de Datos
- **Supabase** - Backend as a Service
- **PostgreSQL** - Base de datos relacional
- **REST API** - Comunicación con frontend
- **Row Level Security** - Seguridad a nivel de fila

## 📁 Estructura del Proyecto

```
SQL_EV3/
├── login.html              # Página de autenticación
├── dashboard.html          # Dashboard principal con gráficos
├── index.html             # Página de inicio
├── main.js                # Lógica JavaScript principal
├── database_script.sql    # Script completo de base de datos
└── README.md              # Documentación del proyecto
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Cuenta en Supabase (gratuita)
- Editor de código (VS Code recomendado)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd SQL_EV3
   ```

2. **Configurar Supabase**
   - Crear cuenta en [supabase.com](https://supabase.com)
   - Crear nuevo proyecto
   - Obtener URL y API Key del proyecto

3. **Configurar la base de datos**
   - Ir a SQL Editor en Supabase
   - Ejecutar el contenido de `database_script.sql`
   - Verificar que las vistas y tablas se crearon correctamente

4. **Configurar permisos**
   - Ejecutar el script de permisos para el rol `anon`
   - Verificar que las políticas RLS estén activas

5. **Actualizar credenciales**
   - Editar `login.html` y `dashboard.html`
   - Reemplazar `SUPABASE_URL` y `SUPABASE_KEY` con tus credenciales

6. **Ejecutar el proyecto**
   - Abrir `login.html` en el navegador
   - Usar las credenciales de prueba o crear nuevas

## 📊 Estructura de la Base de Datos

### Tablas Principales
- **`comuna`** - Información de comunas
- **`cliente`** - Datos de clientes
- **`sucursal`** - Información de sucursales
- **`producto`** - Catálogo de productos
- **`categoria_producto`** - Categorías de productos
- **`compra`** - Registro de compras
- **`detalle_compra`** - Detalles de cada compra
- **`pago`** - Métodos de pago
- **`preferencia_cliente`** - Preferencias de clientes
- **`usuarios`** - Usuarios del sistema

### Vistas de Análisis
- **`vista_masvendidoporsucursal2`** - Productos más vendidos por sucursal
- **`vista_compras_mayorescuarenta`** - Compras mayores a $40.000
- **`vista_ventasporcategoria`** - Ventas por categoría de producto
- **`vista_ventaspormetodopago`** - Ventas por método de pago

### Funciones y Procedimientos
- **`CalcularTotalVentasSucursal()`** - Calcula ventas totales por sucursal
- **`ObtenerProductosFavoritosCliente()`** - Obtiene productos favoritos
- **`RegistrarCompra()`** - Procedimiento para registrar compras
- **`GenerarReporteVentas()`** - Genera reportes por fecha

## 🔧 Configuración de Credenciales

### Credenciales de Prueba
```javascript
// Usuario administrador
Email: admin@kfc.com
Password: admin123

// Usuario regular
Email: user@kfc.com
Password: user123
```

### Variables de Entorno
```javascript
const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
const SUPABASE_KEY = 'tu-api-key-anon-public';
```

## 📱 Uso del Sistema

### 1. Acceso al Sistema
- Abrir `login.html` en el navegador
- Ingresar credenciales válidas
- El sistema redirige automáticamente al dashboard

### 2. Dashboard Principal
- **Visualización de gráficos** en tiempo real
- **Botón "Actualizar"** para refrescar datos
- **Botón "Cerrar sesión"** para salir del sistema
- **Scroll** para navegar entre gráficos

### 3. Análisis de Datos
- **Productos más vendidos** por sucursal
- **Compras de alto valor** (más de $40.000)
- **Distribución de ventas** por categoría
- **Métodos de pago** más utilizados

## 🔒 Seguridad

### Autenticación
- Contraseñas hasheadas con SHA-256
- Validación de credenciales en Supabase
- Sesiones persistentes con localStorage

### Base de Datos
- Row Level Security (RLS) habilitado
- Políticas de acceso para rol `anon`
- Validación de datos con triggers
- Transacciones seguras

## 🎨 Características de Diseño

### Interfaz de Usuario
- **Diseño responsive** que se adapta a diferentes pantallas
- **Paleta de colores** inspirada en KFC (rojo y blanco)
- **Animaciones suaves** y transiciones
- **Iconografía moderna** y profesional

### Experiencia de Usuario
- **Navegación intuitiva** entre páginas
- **Feedback visual** para todas las acciones
- **Mensajes de error** claros y útiles
- **Carga progresiva** de datos

## 📈 Funcionalidades Avanzadas

### Análisis en Tiempo Real
- **Datos actualizados** automáticamente
- **Gráficos interactivos** con Chart.js
- **Filtros dinámicos** por fecha y categoría
- **Exportación de datos** (futura implementación)

### Gestión de Datos
- **CRUD completo** para todas las entidades
- **Validación de integridad** referencial
- **Backup automático** con Supabase
- **Logs de auditoría** (futura implementación)

## 🚧 Funcionalidades Futuras

### Próximas Mejoras
- [ ] **Panel de administración** para gestión de usuarios
- [ ] **Reportes exportables** en PDF/Excel
- [ ] **Notificaciones push** para eventos importantes
- [ ] **Móvil app** nativa
- [ ] **Integración con APIs** externas
- [ ] **Machine Learning** para predicciones de ventas

## 👥 Autores

**Felipe Angel y Dieguito lindo**

### Contribuciones
- Desarrollo frontend y backend
- Diseño de base de datos
- Implementación de seguridad
- Documentación del proyecto

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:

- **Email**: [tu-email@ejemplo.com]
- **GitHub Issues**: [https://github.com/felipeangel321/SQL_EV3.git]/issues
- **Documentación**: [https://github.com/felipeangel321/SQL_EV3.git]

---

**© 2025, creador Felipe Angel y Dieguito lindo**

*Desarrollado con ❤️ para el análisis de ventas de KFC* 
