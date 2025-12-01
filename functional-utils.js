// -------------------------------
//   Funciones de Extracción
// -------------------------------
function obtenerNombres(movimientos) {
  return movimientos.map(mov => mov.nombre);
}

function obtenerValores(movimientos) {
  return movimientos.map(mov => mov.valor);
}

function calcularTotal(valores) {
  return valores.reduce((total, valor) => total + valor, 0);
}

// Reto autónomo 1.3
function contarPorTipo(movimientos) {
  return movimientos.reduce(
    (acc, mov) => {
      mov.tipo === "ingreso" ? acc.ingresos++ : acc.gastos++;
      return acc;
    },
    { ingresos: 0, gastos: 0 }
  );
}

// -------------------------------
//   Filtrado y Búsqueda
// -------------------------------
function obtenerIngresos(movimientos) {
  return movimientos.filter(mov => mov.tipo === "ingreso");
}

function obtenerGastos(movimientos) {
  return movimientos.filter(mov => mov.tipo === "gasto");
}

function filtrarPorMonto(movimientos, minimo) {
  return movimientos.filter(mov => mov.valor >= minimo);
}

function buscarPorNombre(movimientos, nombre) {
  return movimientos.find(mov =>
    mov.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
}

function obtenerPrimero(movimientos, tipo) {
  return movimientos.find(mov => mov.tipo === tipo);
}

// Reto autónomo 2.3
function obtenerTotalPorTipo(movimientos, tipo) {
  const filtrados = movimientos.filter(mov => mov.tipo === tipo);
  return calcularTotal(obtenerValores(filtrados));
}

// -------------------------------
//         Reportes
// -------------------------------
function generarReporte(movimientos) {
  const ingresos = obtenerIngresos(movimientos);
  const gastos = obtenerGastos(movimientos);

  return {
    totalIngresos: calcularTotal(obtenerValores(ingresos)),
    totalGastos: calcularTotal(obtenerValores(gastos)),
    cantidad: movimientos.length
  };
}

function calcularBalance(movimientos) {
  const reporte = generarReporte(movimientos);
  return reporte.totalIngresos - reporte.totalGastos;
}

function obtenerPromedio(movimientos, tipo) {
  const filtrados = movimientos.filter(mov => mov.tipo === tipo);
  if (filtrados.length === 0) return 0;

  return calcularTotal(obtenerValores(filtrados)) / filtrados.length;
}

// Reto autónomo 3.3
function validarPresupuesto(movimientos, limite) {
  const totalGastos = obtenerTotalPorTipo(movimientos, "gasto");
  return totalGastos > limite
    ? "⚠️ Has superado el límite"
    : "✅ Estás dentro del límite";
}

// -------------------------------
//    Retos Adicionales Progresivos
// -------------------------------

// Básico: categorizarPorMonto
function categorizarPorMonto(movimientos) {
  return movimientos.map(mov => {
    let categoria = "bajo";
    if (mov.valor >= 200 && mov.valor < 500) categoria = "medio";
    if (mov.valor >= 500) categoria = "alto";

    return { ...mov, categoria };
  });
}

// Intermedio: analizarPatrones (ordenar gastos)
function analizarPatrones(movimientos) {
  return obtenerGastos(movimientos).sort((a, b) => b.valor - a.valor);
}

// Avanzado: búsqueda con múltiples criterios
function busquedaAvanzada(movimientos, criterios) {
  return movimientos.filter(mov => {
    return Object.keys(criterios).every(key => {
      if (!criterios[key]) return true;
      return mov[key]
        .toString()
        .toLowerCase()
        .includes(criterios[key].toString().toLowerCase());
    });
  });
}

// -------------------------------
//     Logros Adicionales
// -------------------------------

// Ordenar por valor
function ordenarPorValor(movimientos, asc = true) {
  return [...movimientos].sort((a, b) => asc ? a.valor - b.valor : b.valor - a.valor);
}

// Ordenar por nombre
function ordenarPorNombre(movimientos) {
  return [...movimientos].sort((a, b) => a.nombre.localeCompare(b.nombre));
}

// ---- Estadística ----
function mediana(valores) {
  const ordenados = [...valores].sort((a, b) => a - b);
  const mid = Math.floor(ordenados.length / 2);

  return ordenados.length % 2 !== 0
    ? ordenados[mid]
    : (ordenados[mid - 1] + ordenados[mid]) / 2;
}

function moda(valores) {
  const conteo = {};
  valores.forEach(v => conteo[v] = (conteo[v] || 0) + 1);

  let max = 0;
  let moda = null;
  
  for (const valor in conteo) {
    if (conteo[valor] > max) {
      max = conteo[valor];
      moda = valor;
    }
  }
  return Number(moda);
}

function desviacionEstandar(valores) {
  const promedio = valores.reduce((a,b)=>a+b,0) / valores.length;
  const difCuadrado = valores.map(v => (v - promedio) ** 2);
  return Math.sqrt(difCuadrado.reduce((a,b)=>a+b,0) / valores.length);
}
