# Land & Asset Advisory

Sitio web corporativo de **Land & Asset Advisory**, una firma chilena especializada en **intermediación de suelo urbano, activos estratégicos y oportunidades inmobiliarias**. La plataforma presenta la empresa, su portafolio de operaciones realizadas, servicios a propietarios, un carrusel de clientes y un formulario de contacto conectado a un webhook de **n8n**.

> _"Suelo urbano, activos estratégicos. Desarrollo inmobiliario."_

---

## Tabla de contenidos

- [Land & Asset Advisory](#land--asset-advisory)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Descripción general](#descripción-general)
  - [Características](#características)
  - [Stack tecnológico](#stack-tecnológico)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Instalación y uso local](#instalación-y-uso-local)
    - [Requisitos](#requisitos)
    - [Ejecución con servidor local](#ejecución-con-servidor-local)
  - [Configuración del formulario (n8n)](#configuración-del-formulario-n8n)
    - [1. Crear el workflow en n8n](#1-crear-el-workflow-en-n8n)
    - [2. Configurar la URL en el proyecto](#2-configurar-la-url-en-el-proyecto)
    - [Payload enviado](#payload-enviado)
  - [Personalización](#personalización)
    - [Colores y tipografía](#colores-y-tipografía)
    - [Datos de contacto](#datos-de-contacto)
    - [Operaciones realizadas](#operaciones-realizadas)
    - [Logos de clientes](#logos-de-clientes)
    - [Rotador de imágenes "Nosotros"](#rotador-de-imágenes-nosotros)
  - [Secciones del sitio](#secciones-del-sitio)
  - [Assets e imágenes](#assets-e-imágenes)
  - [Accesibilidad y rendimiento](#accesibilidad-y-rendimiento)
  - [Compatibilidad de navegadores](#compatibilidad-de-navegadores)
  - [Créditos](#créditos)
  - [Licencia](#licencia)

---

## Descripción general

Este proyecto es el **sitio web institucional** de Land & Asset Advisory. Es una **landing page estática** (HTML + CSS + JavaScript vanilla, sin frameworks) orientada a:

- Mostrar la propuesta de valor de la firma.
- Exhibir operaciones realizadas (portafolio selectivo).
- Mostrar clientes y aliados del mercado inmobiliario.
- Presentar servicios para propietarios de terrenos y activos urbanos.
- Captar leads mediante un formulario de contacto integrado con **n8n** y un botón flotante de **WhatsApp**.

El sitio está optimizado para ser **ligero, rápido y de fácil despliegue** en cualquier hosting estático (Netlify, Vercel, GitHub Pages, hosting tradicional, etc.).

---

## Características

- **Diseño responsive** (mobile-first) con menú hamburguesa en dispositivos móviles.
- **Scroll suave** en la navegación interna (anchor links) con compensación del header fijo.
- **Header con sombra dinámica** al hacer scroll.
- **Carrusel infinito de clientes** animado por CSS (con respaldo JS para usuarios con `prefers-reduced-motion: reduce`).
- **Rotador de imágenes en "Nosotros"** con crossfade automático entre construcciones (`js/nosotros-rotator.js`).
- **Portafolio de operaciones** con tarjetas interactivas (overlay con información detallada).
- **Sección "Nosotros"** y **"Servicios para propietarios"** con diseño limpio y profesional.
- **Formulario de contacto** con validación en cliente y envío a un **webhook de n8n** vía `fetch`.
- **Botón flotante de WhatsApp** siempre visible.
- **Validación de email** contra proveedores reales (Gmail, Outlook, Yahoo, Hotmail, iCloud, Proton).
- **Validación de teléfono chileno** (9 dígitos).
- **Estados del botón de envío**: normal, enviando (spinner), enviado (check), error.
- **Arquitectura modular** en JavaScript mediante **módulos ES6** (`import` / `export`).
- **Sin dependencias de build**: solo HTML, CSS y JS puros.

---

## Stack tecnológico

| Capa       | Tecnología                                                    |
| ---------- | ------------------------------------------------------------- |
| Marcado    | HTML5                                                         |
| Estilos    | CSS3 (custom properties, flexbox, grid, animaciones)          |
| Lógica     | JavaScript (ES6+, vanilla, módulos ES6, sin frameworks)      |
| Tipografía | [Google Fonts — Montserrat](https://fonts.google.com/specimen/Montserrat) |
| Iconos     | [Font Awesome 6](https://fontawesome.com/) (vía CDN)          |
| Backend    | [n8n](https://n8n.io/) (webhook para el formulario)           |
| Contacto   | [WhatsApp Click-to-Chat](https://wa.me/)                      |

**No se requiere:** Node.js, npm, bundler ni proceso de build.

---

## Estructura del proyecto

```
BLANCOGESTIONINMOBILIARIA/
├── index.html                  # Página principal (HTML semántico)
├── style.css                   # Estilos (CSS custom, responsive)
├── script.js                   # Punto de entrada principal (coordinador ES6)
├── README.md                   # Este archivo
├── js/                         # Módulos ES6
│   ├── navigation.js           # Scroll suave, menú hamburguesa y header
│   ├── contact-form.js         # Formulario de contacto y validaciones
│   ├── carousel.js             # Respaldo accesible del carrusel de clientes
│   └── nosotros-rotator.js     # Rotador de imágenes con crossfade (sección Nosotros)
└── img/
    ├── hero.png                # Imagen principal del hero
    ├── logos/                  # Logos de clientes (SVG, PNG)
    ├── Contrucciones/          # Fotos de proyectos y edificios
    └── Planos/                 # Planos y material gráfico de operaciones
```

### Punto de entrada — `script.js`

El archivo `script.js` actúa como **coordinador** y se limita a importar e inicializar los módulos:

```js
import { initNosotrosRotator } from './js/nosotros-rotator.js';
import { initSmoothScroll, initHamburger, initHeaderScroll } from './js/navigation.js';
import { initContactForm } from './js/contact-form.js';
import { initCarouselBackup } from './js/carousel.js';

document.addEventListener('DOMContentLoaded', function () {
  initNosotrosRotator();
  initSmoothScroll();
  initHamburger();
  initHeaderScroll();
  initContactForm();
  initCarouselBackup();
});
```

---

## Instalación y uso local

### Requisitos

- Un navegador moderno (Chrome, Firefox, Edge, Safari).
- **Importante**: debido al uso de **módulos ES6** (`import`/`export`), es necesario correr el proyecto en un servidor local para evitar restricciones de CORS del navegador. No se admite la apertura directa haciendo doble clic en el archivo HTML (`file://`).

### Ejecución con servidor local

Puedes levantar un servidor de desarrollo de forma muy rápida utilizando cualquiera de las siguientes opciones:

Con **VS Code (Opción recomendada)**:
1. Instala la extensión **Live Server**.
2. Haz clic derecho sobre `index.html` → **Open with Live Server**.

Con **npx (Node.js)**:
```bash
npx serve .
```

Con **Python 3**:
```bash
cd BLANCOGESTIONINMOBILIARIA
python -m http.server 8000
```
Luego abre [http://localhost:8000](http://localhost:8000) en tu navegador.

---

## Configuración del formulario (n8n)

El formulario de contacto envía los datos a un **webhook de n8n** mediante una petición `POST` con `Content-Type: application/json`.

### 1. Crear el workflow en n8n

1. En n8n, crea un nuevo workflow.
2. Añade un nodo **Webhook** como trigger y configúralo con método `POST`.
3. Copia la URL del webhook (algo como `https://tu-n8n.example.com/webhook/xxxxx`).
4. Opcional: añade nodos para enviar un correo, guardar en Google Sheets, notificar por Slack, etc.

### 2. Configurar la URL en el proyecto

Edita el archivo [js/contact-form.js](js/contact-form.js) y reemplaza la constante `N8N_WEBHOOK_URL`:

```js
const N8N_WEBHOOK_URL = 'https://tu-n8n.example.com/webhook/ID-DEL-WEBHOOK';
```

### Payload enviado

El cliente envía el siguiente JSON al webhook:

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@gmail.com",
  "telefono": "979757441",
  "asunto": "Gracias por contactarte",
  "mensaje": "Mensaje del usuario...",
  "timestamp": "2026-06-19T12:00:00.000Z",
  "origen": "https://tusitio.cl/"
}
```

---

## Personalización

### Colores y tipografía

Edita las **CSS custom properties** en [style.css](style.css):

```css
:root {
  --primary:   #001E42;  /* Azul institucional */
  --black:     #001E42;
  --navy:      #0854aaa4;
  --white:     #FFFFFF;
  --bg-light:  #F4F7F9;
  --border:    #D1D9E0;
  --text-dark: #2D3748;
  --text-mid:  #718096;
  --accent:    #C9A84C;  /* Dorado de acento */
  --radius:    4px;
}
```

### Datos de contacto

En [index.html](index.html), actualiza:

- **WhatsApp**: `href="https://wa.me/"` (botón flotante y footer).
- **Teléfono**: `+56 9 7975 7441`.
- **Email**: `palomaperez@bgichile.cl`.
- **Dirección**: `Av. Apoquindo 7935, oficina 410-B, Las Condes`.
- **Google Maps**: link en el footer.
- **Año del copyright** en el footer: `© 2026 Land & Asset Advisory...`.

### Operaciones realizadas

Para añadir una nueva operación, duplica un bloque `.property-card` dentro de la sección `#operaciones` en [index.html](index.html) y reemplaza:

- La imagen (`<img src="img/Planos/...">`).
- El título de la barra (`<div class="card-title-bar">`).
- Los campos del overlay (ubicación, superficie, estado, gestión).

### Logos de clientes

Los logos se almacenan en `img/logos/` (formatos SVG y PNG). Para añadir o reemplazar:

1. Coloca el nuevo archivo en `img/logos/`.
2. Edita la sección `#clientes` del HTML.
3. El carrusel está **duplicado intencionalmente** para generar el **loop infinito**; asegúrate de mantener ambos sets sincronizados.
4. Los logos se muestran inicialmente en escala de grises con opacidad reducida y recuperan su color original al hacer **hover**.

### Rotador de imágenes "Nosotros"

El módulo [js/nosotros-rotator.js](js/nosotros-rotator.js) realiza un **crossfade automático** entre las imágenes de `img/Contrucciones/` en la sección `#nosotros`.

Para modificar las imágenes del rotador, edita el array `IMAGES` al inicio del archivo:

```js
const IMAGES = [
  'img/Contrucciones/edificio-1.jpg',
  'img/Contrucciones/edificio-2.jpg',
  // ...
];

const ROTATE_INTERVAL_MS = 2500; // intervalo de rotación (ms)
const FADE_MS = 250;             // duración del crossfade (ms)
```

Notas:
- La primera imagen del array **reutiliza** el `<img>` del HTML para evitar un parpadeo inicial.
- El resto se **precargan** antes de iniciar la rotación.
- El módulo es idempotente: no se duplica si se reinicializa.

---

## Secciones del sitio

| Sección       | ID              | Descripción                                                  |
| ------------- | --------------- | ------------------------------------------------------------ |
| Hero          | `#hero`         | Imagen de fondo con titular principal y propuesta de valor.  |
| Operaciones   | `#operaciones`  | Portafolio selectivo de activos gestionados.                 |
| Clientes      | `#clientes`     | Carrusel infinito con logos de inmobiliarias y aliados.      |
| Nosotros      | `#nosotros`     | Descripción de la firma con rotador de imágenes.             |
| Propietarios  | `#propietarios` | Servicios ofrecidos a propietarios de activos urbanos.       |
| Contacto      | `#contacto`     | Formulario conectado al webhook de n8n.                      |
| Footer        | —               | Datos de contacto, marca, copyright.                         |

---

## Assets e imágenes

Todas las imágenes se encuentran en la carpeta `img/`:

- `img/hero.png` — Imagen principal del hero.
- `img/logos/` — Logos de clientes (SVG, PNG).
- `img/Contrucciones/` — Fotos de proyectos y edificios (usadas por el rotador "Nosotros").
- `img/Planos/` — Planos y material gráfico de operaciones.

Recomendaciones:

- Usa formatos modernos (**WebP / AVIF**) para mejorar el rendimiento.
- Comprime las imágenes con herramientas como [TinyPNG](https://tinypng.com/) o [Squoosh](https://squoosh.app/).
- Mantén un tamaño máximo recomendado de **500 KB** por imagen.

---

## Accesibilidad y rendimiento

- HTML semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Atributos `alt` en todas las imágenes.
- `aria-label` en el botón hamburguesa y el enlace flotante de WhatsApp.
- Contraste de color siguiendo buenas prácticas WCAG.
- `prefers-reduced-motion: reduce` respetado en el carrusel de clientes (cae a scroll manual con drag).
- Carga de fuentes con `preconnect` y `display=swap` para evitar bloqueos de render.
- Sin librerías externas pesadas: solo Font Awesome vía CDN y Google Fonts.

---

## Compatibilidad de navegadores

- Chrome / Edge (últimas 2 versiones).
- Firefox (últimas 2 versiones).
- Safari (últimas 2 versiones).
- Navegadores móviles: iOS Safari 14+, Chrome Android 90+.

---

## Créditos

- **Diseño y desarrollo:** Land & Asset Advisory.
- **Tipografía:** [Montserrat](https://fonts.google.com/specimen/Montserrat) — Google Fonts.
- **Iconos:** [Font Awesome 6](https://fontawesome.com/).
- **Automatización:** [n8n](https://n8n.io/).

---

## Licencia

© 2026 **Land & Asset Advisory**. Todos los derechos reservados.

Este código se distribuye con fines internos de la empresa. Queda prohibida su reproducción total o parcial sin autorización previa.