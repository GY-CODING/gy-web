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

  // En producción, usar el dominio completo
  if (process.env.NODE_ENV === 'production') {
    const fullPath = `https://www.gycoding.com${normalizedPath}`;
    return fullPath;
  }

  return normalizedPath;
}

export function useAssetPath(path: string): string {
  return getAssetPath(path);
}
