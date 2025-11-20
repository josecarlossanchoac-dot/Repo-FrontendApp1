async function cargarTareas() {
    try {
        const response = await fetch("http://localhost:8080/api/tareas");
        const tareas = await response.json();

        const contenedor = document.getElementById("tareas");
        contenedor.innerHTML = "";

        tareas.forEach(t => {
            const card = document.createElement("div");
            card.classList.add("tarea-card");

            card.innerHTML = `
                <h3>${t.titulo}</h3>
                <p class="descripcion">${t.descripcion}</p>
                <p class="fecha"><strong>Fecha límite:</strong> ${t.fechaLimite}</p>

                <span class="estado ${t.estado.toLowerCase()}">${t.estado}</span>
                <span class="prioridad">${t.prioridad}</span>
            `;

            contenedor.appendChild(card);
        });

    } catch (error) {
        console.error("Error cargando tareas:", error);
    }
}

cargarTareas();
