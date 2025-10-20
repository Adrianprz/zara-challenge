# Zara Challenge — Documentación técnica

Esta documentación describe la arquitectura, dependencias, flujos de datos, tests y tareas pendientes del proyecto.

[Demo](https://zara-challenge-one.vercel.app/)
[Swagger API Mock](https://prueba-tecnica-api-tienda-moviles.onrender.com/docs/)
[Diseño Figma](<https://www.figma.com/design/Nuic7ePgOfUQ0hcBrUUQrb/Labs-%252F-Zara-Web-Challenge-(Smartphones)?node-id=0-1&t=70pTEDeKhVCCV25p-1>)

## Vista previas

- Home

![Home](https://raw.githubusercontent.com/Adrianprz/zara-challenge/master/screenshots/home.jpg?token)

- Carrito Desplegable

![Carrito Desplegable](https://raw.githubusercontent.com/Adrianprz/zara-challenge/master/screenshots/cart.jpg?token)

![Página carrito](https://raw.githubusercontent.com/Adrianprz/zara-challenge/master/screenshots/cart2.jpg?token)

- Detalle del producto

![Detalle del producto](https://raw.githubusercontent.com/Adrianprz/zara-challenge/master/screenshots/details.jpg?token)

## Stack & Dependencias

- Next.js `15.5.5` (App Router)
- React `19.1.0`
- React DOM `19.1.0`
- TanStack React Query `5.90.3`
- Zod `4.1.12`
- Sass `1.93.2`
- UUID `^13.0.0`
- TypeScript `5`
- ESLint `9` `eslint-config-next`
- Jest `30.2.0`

## Estructura del proyecto

- `src/app`

  - `layout.tsx`: Layout raíz. Envuelve el árbol con los proveedores `QueryProvider` , `CartProvider` , `ToastProvider`. Además renderiza el componente `Header` y la estructura de la página visitada.
  - `page.tsx`: Página Home. Renderiza el componente Search y Listado de productos (Grid) incluyendo como carga (Skeletons)
  - `product/[id]/page.tsx`: Página de detalle en servidor (Async Server Component).
  - `cart/page.tsx`: Página de carrito cliente.

- `src/components`

  - `Header`: Barra superior con Logo y `Cart`.
  - `Back`: Enlace de vuelta a Home con icono.
  - `Search`: Componente search con debounce personalizado.
  - `Skeleton`: Bloque animado para la carga visual.
  - `Carousel`: Carrusel horizontal con drag (mouse/touch).
  - `Toast`: Renderiza notificaciones / alertas personalizables.
  - `Product`
    - `Grid`: Muestra skeletons o listado de `Item`.
    - `Item`: Tarjeta con imagen `next/image`, marca, nombre y precio. Enlace a detalle.
    - `Detail/Detail.tsx`: Detalle del producto cliente. Selección de almacenamiento (`StorageSelector`) y color (`ColorSelector`), botón de `AddToCartButton`, `Specifications` y `Similar`
    - `Error`: Template de error de producto no encontrado.
    - `Similar`: Carrusel de productos similares.
    - `Specifications`: Tabla key/value de especificaciones.
    - `StorageSelector`: Componente con opciones de almacenamiento.
    - `ColorSelector`: Selector de color
    - `SkeletonDetail`: Skeleton para la vista detalle.
  - `Cart`
    - `index.tsx`: Controla apertura/cierre y renderiza `CartIcon` y `CartWrapper`.
    - `CartIcon`: Badge con contador e icono activo/inactivo.
    - `Container`: Contenedor del carrito donde se renderiza los componentes header (`HeaderContainer`), skeleton o lista de `Item`. Incluye Hook para cerrar este contenedor si se pulsa fuera del elemento con `useOutsideClick`.
    - `HeaderContainer`: Título y botón cerrar.
    - `Item`: Item del carrito con imagen, meta y botón para eliminar.
    - `Footer`: Muestra precio y botones de acciones.

- `src/config`
  - `metadata.ts`: Metadatos reutilizables SEO/OG/Twitter

- `src/context`

  - `CartContext.tsx`: Define Interface del contexto (items, loading, addToCart, removeFromCart, totalPrice, isOpen, setIsOpen).
  - `useCart.tsx`: Hook para consumir el contexto del carrito de compras.
  - `ToastContext.tsx`: Contexto para controlar las alertas/notificaciones 'Toasts'

- `src/hooks`

  - `useProductsQuery.tsx`: `useQuery` con `getProducts(searchTerm, signal)`, `queryKeys.products(searchTerm)`, `staleTime` 1 min, `gcTime` 5 min.
  - `useDebounce.tsx`: Devuelve un valor estable tras el `delay` definido.
  - `useLocalStorage.tsx`: Hook para estado persistido en local storage.
  - `useOutsideClick.tsx`: Ejecuta callback si el clic se produce fuera de un contenedor/elemento `ref`.
  - `useToast.tsx`: Hook para lanzar notificaciones/alertas

- `src/providers`

  - `QueryProvider.tsx`: Para el uso de react-query. Crea `QueryClient` estable y provee `QueryClientProvider`.
  - `CartProvider.tsx`: Estado del carrito: `items` desde local storage, valida la información con Zod y acumula cantidad si el ítem ya existe.
    - addToCart
    - removeFromCart
    - totalPrice
    - isOpen
    - loading

  - `ToastProvider`: Estado de notificaciones / alertas.
    - showToast({
      title: string,
      message: string,
      type: "success" | "error" | "info" ,
      duration?: number,
    });

- `src/schemas`

  - `Product`: Schema de validacion para Producto.

    - `ProductListItem` (id, brand, name, basePrice, imageUrl).
    - `ProductColor` (name, hexCode, imageUrl).
    - `ProductStorage` (capacity, price).
    - `ProductSpecs` (screen, resolution, processor, etc.).
    - `ProductDetail` (Producto + Almacenamiento, Colores, Especificaciones y similares).

  - `Cart`: `CartItemSchema` y helpers `validateProduct`, `validateColor`, `validateStorage`.

  - `Error`: Schema de validacion de errores de servidor. 

- `src/services`

  - `Products/config.ts`:
    - `API_BASE_URL`: `https://prueba-tecnica-api-tienda-moviles.onrender.com/`
    - `API_PRODUCTS_URL`: `${API_BASE_URL}products`
    - `API_PRODUCT_URL(id)`: `${API_BASE_URL}products/${id}`
    - `API_KEY`: `process.env.NEXT_PUBLIC_API_KEY`

  - `Products/api/getProducts.ts`:

    - Construye URL con query opcional `search`.
    - Valida resultado con Zod `schema.parse(data)`.

     - `Products/api/getProductById.ts`:

    - Construye URL con id de producto
    - Valida resultado con Zod ProductDetailSchema

- `src/styles`

  - SCSS global en `main.scss`, con estructura por capas: `settings`, `tools`, `generic`, `objects`, `components`, `utils`.
  - Componentes con clases BEM: `c-` (components), `o-` (objects), `u-` (utilities).
  - `settings.scss` (variables de fuente, colores, paddings, animaciones)
  - `breakpoints.scss` (variables breakpoints)
- `src/tests`
  - `search.test.tsx`:
    - Render y accesibilidad (`role="search"`, `textbox`).
    - Interacciones con `user-event`: typing, trimming leading spaces, botón clear, no render clear si vacío.
    - Prevención de submit por defecto.
  - `useLocalStorage.test.tsx`:
    - Inicializa vacío si no hay storage.
    - Lee y sincroniza con storage si existe.
    - Actualiza `localStorage` en `setCart`.
    - Soporta actualización funcional.
    - Fallback si `getItem` es `null` o lanza error.
    - No rompe si `setItem` lanza (mantiene estado en memoria).
  - `cartProvider.test.tsx`:
    - `addToCart` agrega y acumula cantidad;
    - `totalPrice` suma basePrice \* cantidad.
    - `removeFromCart` elimina ítem y resetea total.
  - `tests/mocks/*`: Datos mock para productos y carrito.

## Flujos clave

- Listado de productos (Home)

  - `Search` usa `useDebounce` para reducir llamadas.
  - `useProductsQuery(term)` consulta con clave `["products", term]` y valida respuesta con Zod.
  - `Grid`:
    - Si `isLoading` muestra la estructura y Skeletons animados.
    - Si hay errores de validaciones o no hay datos: `InfoResults`.
    - Si la respuesta es valida: Renderizado el listado de `Item`.

- Detalle de producto

  - Render en servidor: `getProductById(id)` con validación Zod.
  - `Detail` en cliente:
    - Selección de `StorageSelector` y `ColorSelector`.
    - `AddToCartButton` habilitado solo si hay color y storage.
    - Componenentes de productos Similares en carrusel con touch / drag; Tabla de especificaciones del producto.
    - `handleImageError` para fallback `"/error.svg"`.
    - Muestra una notificacion Toast si ha añadido un elemento al carrito

- Carrito (Dropdown / Página individual)

  - `CartProvider` guarda en `localStorage` (`useLocalStorage`), valida entradas con Zod y maneja open/close.
  - `Cart` muestra `CartIcon` con contador; al abrir, `CartWrapper` renderiza `Container` + `Footer`.
  - `Container`:
    - Control de clicks fuera del contenedor (hook useOutsideClick)
    - Skeleton de carga inicial.
    - Lista de `Item` con eliminación.
    - Botones de acciones

- Estado y caché (React Query)
  - `QueryProvider` inicializa `QueryClient`.
  - `useProductsQuery`: `staleTime` 60s evita refetch inmediato, `gcTime` 300s mantiene caché.
  - `signal` permite cancelación (especialmente útil en búsqueda rápida).

## Variables de entorno

.env en la raiz del proyecto y añadir la key/valor:

```bash
NEXT_PUBLIC_API_KEY=tu_api_key_aqui (x-api-key)
```

## Comandos

Instalar dependencias:

```bash
pnpm | npm | yarn install
```

Desarrollo:

```bash
pnpm | npm | yarn run dev
```

Build de producción:

```bash
pnpm | npm | yarn run build
```

Arranque producción:

```bash
pnpm | npm | yarn run start
```

Lint:

```bash
pnpm | npm | yarn run lint
```

Tests en watch:

```bash
pnpm | npm | yarn run test
```

Tests con cobertura (CI):

```bash
pnpm | npm | yarn run test:ci
```

## Tests y cobertura

Puedes encontrar la cobertura en el directorio /coverage/

![Coverage](https://raw.githubusercontent.com/Adrianprz/zara-challenge/master/screenshots/coverage.jpg)

- Suites:
  - `search.test.tsx`: interacción del componente de búsqueda.
  - `useLocalStorage.test.tsx`: persistencia y tolerancia a errores de storage.
  - `cartProvider.test.tsx`: lógica del carrito (add/remove/total).
