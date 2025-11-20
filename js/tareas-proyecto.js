async function cargarTareasProyecto() {
    try {
        // Obtener parámetros de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const proyectoId = urlParams.get('id');
        const proyectoNombre = urlParams.get('nombre');

        // Actualizar título
        const tituloElement = document.getElementById("titulo-proyecto");
        if (proyectoNombre) {
            tituloElement.textContent = `Tareas de: ${proyectoNombre}`;
        }

        // Si no hay ID, mostrar error
        if (!proyectoId) {
            document.getElementById("subtitulo").textContent = "No se especificó un proyecto";
            return;
        }

        // Llamar a la API
        const response = await fetch(`http://localhost:8080/api/tareas/proyecto/${proyectoId}`);
        
        if (!response.ok) {
            throw new Error("Error al cargar las tareas");
        }

        const tareas = await response.json();

        const contenedor = document.getElementById("tareas");
        const subtitulo = document.getElementById("subtitulo");

        // Verificar si hay tareas
        if (tareas.length === 0) {
            contenedor.innerHTML = "<p>No hay tareas en este proyecto.</p>";
            subtitulo.textContent = "Este proyecto no tiene tareas asignadas";
            return;
        }

        subtitulo.textContent = `${tareas.length} tarea(s) encontrada(s)`;
        contenedor.innerHTML = "";

        // Crear cards de tareas
        tareas.forEach(t => {
            const card = document.createElement("div");
            card.classList.add("tarea-card");

            card.innerHTML = `
                <h3>${t.titulo}</h3>
                <p class="descripcion">${t.descripcion}</p>
                <p class="fecha"><strong>Fecha límite:</strong> ${t.fechaLimite}</p>

                <div class="etiquetas">
                    <span class="estado ${t.estado.toLowerCase()}">${t.estado}</span>
                    <span class="prioridad">${t.prioridad}</span>
                </div>

                <div class="acciones">
                    <button class="btn-editar" data-tarea-id="${t.id}">Editar tarea</button>
                    <button class="btn-borrar" data-tarea-id="${t.id}">Borrar tarea</button>
                </div>
            `;

            contenedor.appendChild(card);
        });

        // Agregar event listeners a los botones de borrar
        document.querySelectorAll(".btn-borrar").forEach(btn => {
            btn.addEventListener("click", function() {
                const tareaId = this.getAttribute("data-tarea-id");
                borrarTarea(tareaId, proyectoId);
            });
        });

        // Agregar event listeners a los botones de editar
        document.querySelectorAll(".btn-editar").forEach(btn => {
            btn.addEventListener("click", function() {
                const tareaId = this.getAttribute("data-tarea-id");
                editarTarea(tareaId);
            });
        });

    } catch (error) {
        console.error("Error cargando tareas del proyecto:", error);
        document.getElementById("subtitulo").textContent = "Error al cargar las tareas";
        document.getElementById("tareas").innerHTML = "<p>Hubo un error al cargar las tareas. Por favor, intenta de nuevo.</p>";
    }
}

// Crear modal personalizado
function mostrarModalConfirmacion(mensaje, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-confirmacion">
            <h3>Confirmar eliminación</h3>
            <p>${mensaje}</p>
            <div class="modal-botones">
                <button class="btn-cancelar">Cancelar</button>
                <button class="btn-confirmar">Eliminar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    modal.querySelector('.btn-cancelar').onclick = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.btn-confirmar').onclick = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
        onConfirm();
    };
}

// Usar en borrarTarea
async function borrarTarea(tareaId, proyectoId) {
    mostrarModalConfirmacion(
        "¿Estás seguro de que quieres eliminar esta tarea?",
        async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/tareas/${tareaId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    mostrarToast("✅ Tarea eliminada", "success");
                    cargarTareasProyecto();
                } else {
                    throw new Error("Error al eliminar");
                }
            } catch (error) {
                mostrarToast("❌ Error al eliminar", "error");
            }
        }
    );
}

function editarTarea(tareaId) {
    // Implementaremos esto más adelante
    console.log("Editar tarea:", tareaId);
    alert(`Función de editar tarea ${tareaId} - Por implementar`);
}

function mostrarToast(mensaje, tipo = 'success') {
    // Crear el toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensaje;
    
    // Agregar al body
    document.body.appendChild(toast);
    
    // Mostrar con animación
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Ocultar y eliminar después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

cargarTareasProyecto();