# Calendario con Microsoft Graph API

Este proyecto implementa una solución sencilla en **Node.js** con **Express** para autenticar usuarios mediante OAuth 2.0 y gestionar eventos en su calendario de Microsoft (Outlook) utilizando **Microsoft Graph API**.

## 🛠️ Requisitos previos

1. **Registrar la aplicación en Microsoft Entra ID:**
   * Ve al [Portal de Microsoft Entra ID / Registro de aplicaciones](https://entra.microsoft.com/).
   * Registra una nueva aplicación web.
   * Configura la **URI de redirección** (*Redirect URI*) como una "Web" con la dirección: `http://localhost:3000/callback`.
   * En **Certificados y secretos**, crea un nuevo secreto de cliente (*Client Secret*) y copia su valor.
   * En **Permisos de API**, añade los permisos de tipo *Delegado*: `Calendars.ReadWrite` y `User.Read`.

2. **Tener instalado Node.js** (versión 16 o superior).

## 🚀 Instalación

1. Descarga o copia los archivos `package.json` y `app.js` en una misma carpeta.
2. Abre una terminal en esa carpeta e instala las dependencias ejecutando:
   ```bash
   npm install
   ```

3. Configura tus credenciales. Crea un archivo llamado `.env` en la raíz del proyecto o edita directamente las variables en el código:
   ```env
   CLIENT_ID=TU_CLIENT_ID_DE_MICROSOFT
   CLIENT_SECRET=TU_CLIENT_SECRET_DE_MICROSOFT
   REDIRECT_URI=http://localhost:3000/callback
   ```

## 🏃 Enceder la Aplicación

Ejecuta el siguiente comando en la terminal:
```bash
node app.js
```
Abre tu navegador web e ingresa a `http://localhost:3000` para iniciar el flujo.

## 📁 Estructura del Código

El archivo `app.js` incluye:
* **`/login`**: Redirige al usuario a la página oficial de inicio de sesión de Microsoft.
* **`/callback`**: Recibe el código de autorización enviado por Microsoft y lo intercambia por un token de acceso seguro.
* **`/crear-evento`**: Utiliza el token de acceso para enviar una petición POST a la API de Microsoft Graph y agendar un evento de prueba en el calendario del usuario.
