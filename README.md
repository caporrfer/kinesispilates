# Kinesis Pilates

Web estática en español del centro Kinesis Pilates de Huelva. HTML semántico, CSS adaptable y JavaScript mínimo, compilados con Vite. El contenido y los enlaces funcionan sin JavaScript.

## Desarrollo

Requiere Node.js 22.12 o posterior (probado con Node.js 24) y npm.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

La compilación genera `dist/`. No se requieren claves, variables de entorno, servidor ni base de datos.

## Publicar en Vercel

1. Importar `caporrfer/kinesispilates` desde GitHub.
2. Seleccionar la raíz del repositorio como **Root Directory** y `main` como rama de producción.
3. Framework: **Vite**. Instalación: `npm ci`. Build Command: `npm run build`. Output Directory: `dist`.
4. Pulsar **Deploy**. `vercel.json` ya define el framework, la compilación y el directorio de salida.

Referencia: [documentación oficial de Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite).

## Contenido y fotografías

Editar `index.html` para textos, teléfono y enlaces; `src/styles.css` para el diseño base y `src/experience.css` para las secciones ampliadas. Todas las fotografías y la fuente Manrope se sirven localmente. Las fotos de banco llevan una leyenda visible que las identifica como imágenes de apoyo.

La web incluye modalidades de clases con fotografía, una guía para la primera visita, una galería ampliable y preguntas frecuentes. El menú móvil, la ampliación de fotos y el selector de preferencias se gestionan en `src/main.js`. La galería se cierra con Escape o con el botón de cierre y devuelve el foco al enlace original.

El selector de contacto prepara una consulta con modalidad y franja horaria y abre WhatsApp para que el visitante la revise y la envíe. No confirma reservas, no almacena datos y no requiere servidor. Sin JavaScript, siguen disponibles la navegación, las fotos enlazadas, las preguntas frecuentes y el contacto directo.

Las modalidades y los extractos de opiniones proceden de la ficha de Google Maps aportada por el usuario. La valoración 5,0 y las 11 reseñas son una referencia estática, no una consulta en tiempo real. Los horarios se consultan directamente por WhatsApp.

Las fuentes y licencias de los recursos se detallan en [ASSETS.md](ASSETS.md).

## Verificación realizada

- Compilación de producción completada con Vite.
- Revisados tamaños de 360, 390, 768 y 1440 píxeles, con texto normal y ampliado al 200 %, sin desplazamiento horizontal.
- Comprobados foco de teclado, navegación por secciones, carga de fotografías y fuente local, y destinos de los enlaces de WhatsApp, llamada y Google Maps.
- Los colores de texto y botones principales cumplen un contraste mínimo de 4,5:1.
- Datos estructurados JSON-LD del negocio conservados.
- Galería con cierre por teclado y devolución de foco, menú móvil y preparación de mensajes de WhatsApp comprobados.
- Cinco pruebas de regresión de Playwright sobre la compilación de producción, incluyendo análisis automático de accesibilidad WCAG A/AA con axe-core, sin incidencias detectadas. Este análisis automático no sustituye una auditoría manual completa.

## Pruebas

```sh
npx playwright install chromium
npm test
```

`npm test` compila y levanta la versión de producción localmente. Comprueba tamaños de 360, 390, 768 y 1440 px, imágenes, enlaces internos, texto al 200 %, accesibilidad, menú móvil, galería, preferencias de WhatsApp y funcionamiento sin JavaScript. Las consultas a WhatsApp se interceptan en las pruebas: no se envían mensajes.

Para utilizar Microsoft Edge ya instalado en Windows, sin descargar Chromium:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm test
```
