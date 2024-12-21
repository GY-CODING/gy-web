export function useImagePath(path: string): string {
  // Asegurarse de que el path comienza con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // En producción, añadir el prefijo /gy-web
  if (process.env.NODE_ENV === 'production') {
    return `/gy-web${normalizedPath}`;
  }

  return normalizedPath;
}
