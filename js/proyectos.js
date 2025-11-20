async function cargarProyectos() {
    try {
        const response = await fetch("http://localhost:8080/api/proyectos");
        const proyectos = await response.json();

        const contenedor = document.getElementById("proyectos");
        contenedor.innerHTML = "";

        proyectos.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("proyecto-card");

            card.innerHTML = `
                <h3>${p.nombre}</h3>
                <p class="descripcion">${p.descripcion}</p>
                <div class="fechas">
                    <p><strong>Inicio:</strong> ${p.fechaInicio}</p>
                    <p><strong>Fin:</strong> ${p.fechaFin}</p>
                </div>
                <button class="btn-ver-tareas" data-proyecto-id="${p.id}" data-proyecto-nombre="${p.nombre}">Ver Tareas</button>
            `;

            contenedor.appendChild(card);
        });

        // Agregar event listeners a los botones
        document.querySelectorAll(".btn-ver-tareas").forEach(btn => {
            btn.addEventListener("click", function() {
                const proyectoId = this.getAttribute("data-proyecto-id");
                const proyectoNombre = this.getAttribute("data-proyecto-nombre");
                verTareasProyecto(proyectoId, proyectoNombre);
            });
        });

    } catch (error) {
        console.error("Error cargando proyectos:", error);
    }
}

function verTareasProyecto(proyectoId, proyectoNombre) {
    // Redirigir a la página de tareas del proyecto pasando el ID y nombre
    window.location.href = `tareas-proyecto.html?id=${proyectoId}&nombre=${encodeURIComponent(proyectoNombre)}`;
}

cargarProyectos();