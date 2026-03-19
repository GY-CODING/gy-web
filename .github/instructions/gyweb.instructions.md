---
applyTo: '**'
---

## Instrucciones de Refactorización y Buenas Prácticas

Siempre sigue estas directrices al generar código, responder preguntas o revisar cambios:

- **Escalabilidad:** Estructura el código y los componentes para que puedan crecer y adaptarse fácilmente a nuevas funcionalidades.
- **Mantenibilidad:** Prioriza la legibilidad, la separación de responsabilidades y la claridad en la lógica de cada componente.
- **Sostenibilidad:** Usa patrones y estructuras que faciliten el mantenimiento a largo plazo y la colaboración en equipo.
- **Buenas prácticas de Clean Code:** Nombres descriptivos, funciones y componentes pequeños, evita duplicidad, comentarios útiles solo cuando sean necesarios.
- **Principios SOLID:** Aplica los principios SOLID en la arquitectura y diseño de componentes y lógica de negocio.
- **Tipado estricto y explícito:** Usa TypeScript con tipado fuerte y explícito, evita el uso de `any`, define tipos y/o interfaces para props, estados y datos.
- **Next.js:** Aprovecha las convenciones y ventajas de Next.js (rutas, SSR/SSG, API routes, etc.), mantén la estructura recomendada.
- **Uso de constantes:** Centraliza valores estáticos y reutilizables en archivos de constantes.
- **Componentización:** Divide la UI en componentes reutilizables y desacoplados, cada uno con su propia lógica y estilos si aplica. Favorece la reutilización y encapsulación de componentes y lógica, evitando repetir lo mismo en diferentes sitios.
- **Hooks:** Favorece el uso de hooks personalizados para encapsular lógica reutilizable y desacoplar la lógica de la UI.
- **Organización de carpetas:** Cada componente debe tener su propia carpeta si tiene lógica, estilos, hooks o subcomponentes asociados.
- **Testing:** Incluye pruebas unitarias y de integración cuando sea relevante, especialmente para lógica compleja.
- **Documentación:** Documenta componentes, props y lógica relevante usando comentarios o archivos README si es necesario.

Ejemplo de estructura para un componente:
---- components
------ button
------- button.tsx
------- button.test.tsx
------- button.css / scss / tailwind
------- utils/...
------- hooks/...
------- button-label
-------- button-label.tsx ...
