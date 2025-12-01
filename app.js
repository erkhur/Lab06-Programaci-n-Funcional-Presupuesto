// ===============================
// Presupuesto Personal - 2026//
// ===============================
let transacciones = [
   { tipo: "deposito", monto: 500 },
   { tipo: "retiro", monto: -200 },
   { tipo: "deposito", monto: 300 },
   { tipo: "retiro", monto: -100 },
   { tipo: "deposito", monto: 400 },
];

// ===============================
// Función de cálculo general
// ===============================
function calcularResultados() {
   const total = transacciones.reduce((acc, t) => acc + t.monto, 0);

   const depositos = transacciones
      .filter(t => t.tipo === "deposito")
      .reduce((acc, t) => acc + t.monto, 0);

   const retiros = transacciones
      .filter(t => t.tipo === "retiro")
      .reduce((acc, t) => acc + t.monto, 0);

   const promedio = total / transacciones.length;

   return { total, depositos, retiros, promedio };
}

// ===============================
// Render del historial
// ===============================
function mostrarTransacciones() {
   const lista = document.getElementById("lista");
   lista.innerHTML = "";

   transacciones.forEach(t => {
      const li = document.createElement("li");
      li.textContent = `${t.tipo} → ${t.monto}`;
      lista.appendChild(li);
   });
}

// ===============================
// Render de resultados
// ===============================
function mostrarResultados() {
   const { total, depositos, retiros, promedio } = calcularResultados();

   document.getElementById("total").textContent = `💰 Total: ${total}`;
   document.getElementById("depositos").textContent = `📥 Total depósitos: ${depositos}`;
   document.getElementById("retiros").textContent = `📤 Total retiros: ${retiros}`;
   document.getElementById("promedio").textContent = `📊 Promedio por transacción: ${promedio.toFixed(2)}`;
}

// ===============================
// Manejo del formulario
// ===============================
document.getElementById("form-transaccion").addEventListener("submit", (e) => {
   e.preventDefault();

   const tipo = document.getElementById("tipo").value;
   let monto = Number(document.getElementById("monto").value);

   if (tipo === "retiro") monto = -Math.abs(monto);

   transacciones.push({ tipo, monto });

   mostrarTransacciones();
   mostrarResultados();

   e.target.reset();
});

// ===============================
// Inicialización
// ===============================
mostrarTransacciones();
mostrarResultados();
