export function getAssetPath(path: string): string {
  console.log("getAssetPath called with path:", path);

  // Verificar que path es una cadena
  if (typeof path !== "string") {
    console.error("Error: El argumento path debe ser una cadena de texto");
    throw new TypeError("El argumento path debe ser una cadena de texto");
  }

  // Si es una URL externa, devolverla tal cual
  if (path.startsWith("http") || path.startsWith("mailto:")) {
    console.log("External URL detected:", path);
    return path;
  }

  // Asegurarse de que el path comienza con /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  console.log("Normalized path:", normalizedPath);

  // En producción, usar el dominio completo
  if (process.env.NODE_ENV === "production") {
    const fullPath = `https://v2.gycoding.com${normalizedPath}`;
    console.log("Production environment detected, full path:", fullPath);
    return fullPath;
  }

  console.log(
    "Development environment detected, returning normalized path:",
    normalizedPath
  );
  return normalizedPath;
}

export function useAssetPath(path: string): string {
  console.log("useAssetPath called with path:", path);
  return getAssetPath(path);
}
