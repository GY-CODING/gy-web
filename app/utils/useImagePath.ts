export function getAssetPath(path: string): string {
  // Verificar que path es una cadena
  if (typeof path !== 'string') {
    console.error('Error: El argumento path debe ser una cadena de texto');
    throw new TypeError('El argumento path debe ser una cadena de texto');
  }

  // Si es una URL externa, devolverla tal cual
  if (path.startsWith('http') || path.startsWith('mailto:')) {
    return path;
  }

  // Asegurarse de que el path comienza con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Antes forzaba https://www.gycoding.com en producción (resto del legado de GitHub Pages +
  // dominio propio, como el assetPrefix de next.config.js). `www.` no tiene ni registro DNS
  // ahora mismo, así que esas imágenes no cargaban en ningún sitio donde se usa esta función
  // (Header, Footer, LoadingScreen —en todas las páginas—, menús…). Relativo funciona siempre,
  // da igual el dominio o el hosting.
  return normalizedPath;
}

export function useAssetPath(path: string): string {
  return getAssetPath(path);
}
