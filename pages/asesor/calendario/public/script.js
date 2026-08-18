document.addEventListener('DOMContentLoaded', async () => {
    const authStatus = document.getElementById('auth-status');
    const btnLogin = document.getElementById('btn-login');
    const formEvento = document.getElementById('form-evento');
    const mensajeBox = document.getElementById('mensaje');

    // 1. Verificar si el usuario ya inició sesión al cargar la página
    try {
        const res = await fetch('/api/status');
        const data = await res.json();

        if (data.authenticated) {
            authStatus.innerHTML = "🟢 Conectado con Google con éxito.";
            formEvento.style.display = 'block'; // Muestra el formulario
        } else {
            authStatus.innerHTML = "🔴 No has vinculado tu cuenta de Google Calendar.";
            btnLogin.style.display = 'block';  // Muestra el botón de login
        }
    } catch (err) {
        authStatus.innerHTML = "Error de conexión con el backend.";
    }

    // 2. Controlar el envío del formulario del evento
    formEvento.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Ocultar alertas previas
        mensajeBox.style.display = 'none';

        const datosEvento = {
            titulo: document.getElementById('titulo').value,
            descripcion: document.getElementById('descripcion').value,
            fecha: document.getElementById('fecha').value,
            horaInicio: document.getElementById('horaInicio').value,
            horaFin: document.getElementById('horaFin').value
        };

        try {
            const response = await fetch('/api/crear-evento', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosEvento)
            });

            const resultado = await response.json();

            if (resultado.success) {
                mensajeBox.className = "alert success";
                mensajeBox.innerHTML = `🎉 ¡Evento creado! <a href="${resultado.htmlLink}" target="_blank">Ver en Google Calendar</a>`;
                formEvento.reset();
            } else {
                throw new Error(resultado.error);
            }
        } catch (error) {
            mensajeBox.className = "alert error";
            mensajeBox.innerText = "Error: " + error.message;
        }
        
        mensajeBox.style.display = 'block';
    });
});
