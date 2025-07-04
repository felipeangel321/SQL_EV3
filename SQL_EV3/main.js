
// main.js
// Lógica para landing, login y validación con Supabase
// Este archivo se usa si quieres manejar el login desde index.html (no desde login.html)
// Si usas login.html, puedes copiar y adaptar estos comentarios allí también

// ====== CONFIGURACIÓN SUPABASE ======
// Reemplaza 'https://TU_SUPABASE_URL.supabase.co' por la URL de tu proyecto Supabase
// Ejemplo: 'https://abcd1234.supabase.co'
const SUPABASE_URL = 'https://ismpkafjjxdhzbpactwt.supabase.co'; // <-- PON AQUÍ TU URL DE SUPABASE
// Reemplaza 'TU_SUPABASE_KEY' por tu API Key de Supabase (puedes usar la anon/public key para pruebas)
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbXBrYWZqanhkaHpicGFjdHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODY1MTgsImV4cCI6MjA2NTY2MjUxOH0.NE8ETwvC8c5a8zNFnQGD_CZGzNC-J8gXiUzmKMWkVeA'; // <-- PON AQUÍ TU API KEY DE SUPABASE

// ====== ELEMENTOS DOM ======
// Obtiene referencias a los elementos del DOM para mostrar/ocultar secciones
const loginBtn = document.getElementById('loginBtn'); // Botón de login en el header
const loginSection = document.getElementById('loginSection'); // Sección del formulario de login
const landing = document.getElementById('landing'); // Sección de la landing page
const loginForm = document.getElementById('loginForm'); // Formulario de login

// ====== MOSTRAR/OCULTAR LOGIN ======
// Cuando el usuario hace click en el botón de login, muestra el formulario y oculta la landing
loginBtn.addEventListener('click', () => {
  landing.classList.add('hidden'); // Oculta la landing
  loginSection.classList.remove('hidden'); // Muestra el login
});

// ====== HASHING DE CONTRASEÑA (SHA-256) ======
// Esta función convierte la contraseña en un hash seguro antes de enviarla/compararla
async function hashPassword(password) {
  const encoder = new TextEncoder(); // Codifica la contraseña como bytes
  const data = encoder.encode(password); // Convierte a Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Aplica SHA-256
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convierte a array
  // Convierte cada byte a hexadecimal y lo une en un string
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ====== VALIDACIÓN LOGIN ======
// Escucha el evento submit del formulario de login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que la página se recargue
  const email = document.getElementById('email').value.trim(); // Obtiene el email ingresado
  const password = document.getElementById('password').value; // Obtiene la contraseña ingresada

  // Validación básica: ambos campos deben estar llenos
  if (!email || !password) {
    Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
    return;
  }

  // Hashea la contraseña antes de enviarla/compararla
  const password_hash = await hashPassword(password);

  // Consulta a Supabase para buscar el usuario
  try {
    const { user, error } = await fetchUser(email); // Busca el usuario por email
    if (error) throw new Error(error); // Si hay error, lo muestra
    if (!user) {
      // Si no existe el usuario, muestra alerta
      Swal.fire('Error', 'Usuario no encontrado.', 'error');
      return;
    }
    // Compara el hash de la contraseña ingresada con el almacenado
    if (user.password_hash !== password_hash) {
      Swal.fire('Error', 'Contraseña incorrecta.', 'error');
      return;
    }
    // Si todo está bien, login exitoso
    Swal.fire('¡Bienvenido!', `Hola, ${user.email}`, 'success').then(() => {
      mostrarBienvenida(user); // Muestra la página de bienvenida
    });
  } catch (err) {
    // Si ocurre cualquier error, lo muestra
    Swal.fire('Error', err.message, 'error');
  }
});

// ====== FUNCIÓN PARA CONSULTAR USUARIO EN SUPABASE ======
// Busca el usuario por email en la tabla 'usuarios' de tu base de datos Supabase
async function fetchUser(email) {
  // Construye la URL para filtrar por email (usa eq. para 'igual a')
  const res = await fetch(`${SUPABASE_URL}/rest/v1/usuarios?email=eq.${encodeURIComponent(email)}`, {
    headers: {
      'apikey': SUPABASE_KEY, // Tu API Key de Supabase
      'Authorization': `Bearer ${SUPABASE_KEY}`, // También tu API Key
      'Content-Type': 'application/json', // Espera JSON
      'Accept': 'application/json', // Acepta JSON
    },
  });
  // Si la respuesta no es OK, lanza error
  if (!res.ok) throw new Error('Error al conectar con Supabase');
  // Convierte la respuesta a JSON (array de usuarios)
  const data = await res.json();
  // Devuelve el primer usuario encontrado (o undefined si no existe)
  return { user: data[0], error: null };
}

// ====== MOSTRAR PÁGINA DE BIENVENIDA Y GRÁFICO ======
// Esta función reemplaza el contenido del body por la bienvenida y el gráfico
function mostrarBienvenida(user) {
  document.body.innerHTML = `
    <header class="flex justify-between items-center p-6 bg-red-600 text-white">
      <div>
        <h1 class="text-2xl font-bold">Bienvenido, ${user.email}</h1>
        <h2 class="text-lg">EJEMPLO SUBTITULO, CAMBIAR AQUÍ A SU PREFERENCIA</h2>
      </div>
      <button id="logoutBtn" class="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-red-600 border border-black transition">Cerrar sesión</button>
    </header>
    <main class="flex-1 flex flex-col items-center justify-center">
      <section class="text-center">
        <h2 class="text-3xl font-bold text-red-600 mb-4">¡Bienvenido!</h2>
        <p class="text-lg text-black mb-8">Has iniciado sesión correctamente.</p>
        <canvas id="myChart" width="400" height="200"></canvas>
      </section>
    </main>
    <footer class="bg-black text-white text-center py-4">
      © 2025, creador Felipe Angel
    </footer>
  `;
  // El botón de logout recarga la página
  document.getElementById('logoutBtn').onclick = () => location.reload();
  // Llama a la función para mostrar el gráfico
  setTimeout(renderChart, 100);
}

// ====== GRÁFICO CON CHART.JS ======
// Esta función crea un gráfico de barras con los colores KFC
function renderChart() {
  const ctx = document.getElementById('myChart').getContext('2d'); // Obtiene el contexto del canvas
  new Chart(ctx, {
    type: 'bar', // Tipo de gráfico
    data: {
      labels: ['Rojo', 'Blanco', 'Negro'], // Etiquetas de las barras
      datasets: [{
        label: 'Colores KFC', // Leyenda del gráfico
        data: [12, 19, 7], // Valores de ejemplo
        backgroundColor: [
          'rgba(220, 38, 38, 0.8)', // rojo
          'rgba(255, 255, 255, 0.8)', // blanco
          'rgba(0, 0, 0, 0.8)' // negro
        ],
        borderColor: [
          'rgba(220, 38, 38, 1)', // borde rojo
          'rgba(0,0,0,0.1)', // borde blanco
          'rgba(0,0,0,1)' // borde negro
        ],
        borderWidth: 1 // Grosor del borde
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true } // El eje Y empieza en 0
      }
    }
  });
}
//funcionsita para ver los mas vendidos por sucursal
async function graficarMasVendidoPorSucursal() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/Vista_MasVendidoPorSucursal`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: 'application/json'
    }
  });
  const data = await res.json();
  const labels = data.map(row => `${row.Nombre_Sucursal}: ${row.Nombre_Producto}`);
  const values = data.map(row => row.Total_Vendido);

  const ctx = document.getElementById('graficoSucursal').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Producto más vendido por sucursal',
        data: values,
        backgroundColor: 'rgba(38, 70, 83, 0.7)',
        borderColor: 'rgba(38, 70, 83, 1)',
        borderWidth: 1
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
}
//funcionsita para ver los mayores a 40 mil
async function graficarComprasAltas() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/Vista_Compras_MayoresCuarenta`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: 'application/json'
    }
  });
  const data = await res.json();
  const labels = data.map(row => `Compra #${row.Id_Compra} - ${row.Nombre_Cliente}`);
  const values = data.map(row => row.Total);

  const ctx = document.getElementById('graficoComprasAltas').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Compras mayores a $40.000',
        data: values,
        backgroundColor: 'rgba(231, 111, 81, 0.7)',
        borderColor: 'rgba(231, 111, 81, 1)',
        borderWidth: 1
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
}
// ====== FIN DEL ARCHIVO ======
// Personaliza los textos y colores a tu preferencia. 
