const express = require('express');
const { google } = require('googleapis');
const path = require('path');

const app = express();

// Habilitar lectura de JSON y archivos estáticos del frontend
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CONFIGURA TUS CREDENCIALES DE GOOGLE CLOUD AQUÍ
const CLIENT_ID = "690700526859-2eq6cdeg110ch0f91c2qidu020ch2vps.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Variable temporal para guardar el estado de autenticación en esta prueba
let isAuthenticated = false;

// Ruta 1: Iniciar sesión con Google
app.get('/login', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'], // <-- corregido
        prompt: 'consent' // fuerza a que te dé refresh_token siempre
    });
    res.redirect(url);
});

// Ruta 2: Callback de Google
app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        isAuthenticated = true;
        // Redirige de golpe a la interfaz de usuario principal
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error en la autenticación: ' + error.message);
    }
});

// Ruta 3: Verificar si el usuario está logueado
app.get('/api/status', (req, res) => {
    res.json({ authenticated: isAuthenticated });
});

// Ruta 4: API final para recibir el formulario y agendar el evento
app.post('/api/crear-evento', async (req, res) => {
    if (!isAuthenticated) {
        return res.status(401).json({ error: 'No autenticado. Inicia sesión primero.' });
    }

    const { titulo, descripcion, fecha, horaInicio, horaFin } = req.body;

    try {
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        
        // Formatear las fechas en formato ISO combinando fecha + hora (Asumiendo zona horaria de Perú -05:00)
        const startDateTime = `${fecha}T${horaInicio}:00-05:00`;
        const endDateTime = `${fecha}T${horaFin}:00-05:00`;

        const evento = {
            summary: titulo,
            description: descripcion,
            start: { dateTime: startDateTime },
            end: { dateTime: endDateTime }
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: evento,
        });

        res.json({ success: true, eventId: response.data.id, htmlLink: response.data.htmlLink });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear evento: ' + error.message });
    }
});

app.listen(3000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
});