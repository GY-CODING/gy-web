/**
 * Función para obtener la ruta correcta de cualquier asset sin necesidad de hooks
 */
export function getAssetPath(path: string): string {
  // Si es una URL externa, devolverla tal cual
  if (path.startsWith('http') || path.startsWith('mailto:')) {
    return path;
  }

  // Asegurarse de que el path comienza con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // En producción, usar el dominio completo
  if (process.env.NODE_ENV === 'production') {
    return `https://v2.gycoding.com${normalizedPath}`;
  }
  
  return normalizedPath;
}

/**
 * Hook para obtener la ruta correcta de cualquier asset (imágenes, lottie, etc.)
 * teniendo en cuenta si estamos en desarrollo o producción
 * 
 * Ejemplos de uso:
 * - Imágenes: useAssetPath('/icons/gycoding.svg')
 * - Lottie: useAssetPath('/lottie/animation.json')
 * - Links internos: useAssetPath('/about')
 * - Links externos: no usar (dejar la URL completa)
 */
export function useAssetPath(path: string): string {
  return getAssetPath(path);
}
