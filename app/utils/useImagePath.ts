export function useImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/gy-web' : '';
  return `${basePath}${path}`;
}
