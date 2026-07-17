# Chispa — juego para dos, a distancia

Integra los 3 modos en una sola sala compartida: **Verdad o Reto** (con medidor
de intensidad), **¿Qué tanto me conoces?** (adivina y revela en vivo), y
**Aventura narrativa** (decisiones secretas que cambian la historia). Se juega
entrando cada quien desde su navegador con un código de sala — sin cuentas,
sin instalar nada. Gratis con Firebase (base de datos en tiempo real) + Vercel
(hosting).

## 1. Crear el proyecto en Firebase (gratis)
1. Ve a https://console.firebase.google.com y crea un proyecto nuevo.
2. Entra a **Build > Authentication > Sign-in method** y activa **Anónimo**
   (no necesitan correo ni contraseña — el juego identifica a cada quien solo
   mientras dura la sesión).
3. Entra a **Build > Firestore Database**, créala en modo producción.
4. En la pestaña **Rules** de Firestore, pega el contenido de `firestore.rules`
   de este proyecto y publica.
5. Ve a **Configuración del proyecto > Tus apps**, registra una app Web y copia
   el objeto de configuración que te da.

## 2. Configurar el proyecto
1. Copia `.env.example` a `.env` y pega ahí los datos de Firebase.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Pruébalo local:
   ```bash
   npm run dev
   ```

## 3. Publicarlo gratis (Vercel)
1. Sube el proyecto a un repositorio de GitHub (o corre `npx vercel` desde la
   carpeta del proyecto).
2. En https://vercel.com, "Add New Project", importa el repo.
3. Agrega las mismas 6 variables `VITE_FIREBASE_...` en "Environment Variables".
4. Deploy. Te da un link tipo `https://chispa-tuyo.vercel.app`.

## Cómo se juega
1. Cada quien abre el link desde su teléfono o computadora.
2. Uno crea la sala (le da un código de 4 letras) y lo comparte por chat.
3. El otro entra con "Unirme" y ese mismo código.
4. Arriba está el medidor de intensidad (🌱 a 💋) — cualquiera lo puede mover,
   afecta los 3 modos a la vez.
5. Eligen el modo desde las pestañas y juegan — todo se sincroniza solo entre
   las dos pantallas.

## Personalizar el contenido
Todo el contenido "picante" vive en archivos separados y es fácil de editar:
- `src/data/prompts.js` — verdades y retos por nivel de intensidad.
- `src/data/knowMeQuestions.js` — preguntas del modo "¿Qué tanto me conoces?".
- `src/data/story.js` — los nodos de la historia ramificada; puedes añadir más
  siguiendo la misma estructura (`onMatch` / `onMismatch`, o `end: true` para
  un final).

## Costos
Con el plan gratuito de Firebase (Spark) y Vercel (Hobby) esto no cuesta nada
para dos jugadores — muy por debajo de cualquier límite gratuito.

## Estructura de archivos
```
package.json
vite.config.js
tailwind.config.js
postcss.config.js
index.html
.env.example
firestore.rules
src/
  main.jsx
  App.jsx
  firebase.js
  index.css
  contexts/AuthContext.jsx
  components/
    Lobby.jsx
    GameRoom.jsx
    SpiceSlider.jsx
  modes/
    TruthOrDare.jsx
    KnowMe.jsx
    Adventure.jsx
  data/
    prompts.js
    knowMeQuestions.js
    story.js
```
