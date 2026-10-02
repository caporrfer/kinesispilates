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

Editar `index.html` para textos, teléfono y enlaces; `src/styles.css` para el diseño. Todas las fotografías y la fuente Manrope se sirven localmente. Las fotos de banco llevan una leyenda visible que las identifica como imágenes de apoyo.

Las modalidades y los extractos de opiniones proceden de la ficha de Google Maps aportada por el usuario. La valoración 5,0 y las 11 reseñas son una referencia estática, no una consulta en tiempo real. Los horarios se consultan directamente por WhatsApp.

Las fuentes y licencias de los recursos se detallan en [ASSETS.md](ASSETS.md).

## Verificación realizada

- Compilación de producción completada con Vite.
- Revisados tamaños de 360, 390, 768 y 1440 píxeles, con texto normal y ampliado al 200 %, sin desplazamiento horizontal.
- Comprobados foco de teclado, navegación por secciones, carga de fotografías y fuente local, y destinos de los enlaces de WhatsApp, llamada y Google Maps.
- Los colores de texto y botones principales cumplen un contraste mínimo de 4,5:1.
- Datos estructurados JSON-LD válidos y aproximadamente 200 palabras de contenido principal.
