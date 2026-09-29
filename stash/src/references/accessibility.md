# accesibilidad                                    · [header content=label+title]

> Cómo Mustache garantiza que cualquier persona, sin importar su capacidad visual, motriz, auditiva o cognitiva, pueda usar Rappi. No es un checklist al final: es la base que sostiene color, tipografía, iconografía y spacing.

**Estado:** en construcción (borrador estratégico, sin origen en Figma aún) · [badge type=default]

---

## Qué es y por qué importa

La accesibilidad es que una persona con baja visión, daltonismo, movilidad reducida o que usa un lector de pantalla pueda pedir un domicilio, cobrar como Rappitendero o repartir un pedido sin fricción extra.

Para Rappi como compañía madura, esto ya no es "nice to have":

- **Escala del problema.** En EE. UU. 1 de cada 4 adultos vive con alguna discapacidad; en Canadá es 22%; en el resto del mundo, cerca de 1 de cada 7 (fuentes: CDC, Statistics Canada, Banco Mundial).
- **Envejecimiento del mercado.** La visión empeora de forma gradual desde los 40 años. Rappi tiene usuarios de todas las edades pidiendo domicilios; un mejor contraste ayuda a esa base cada vez más grande, no solo a quien tiene una discapacidad diagnosticada.
- **Contexto real de uso.** Un repartidor viendo la app bajo sol directo, con guantes, en movimiento, tiene básicamente las mismas necesidades que alguien con baja visión o destreza motriz reducida: texto legible, áreas táctiles grandes, poca dependencia del color.
- **Riesgo legal en LATAM.** Colombia (Ley 1618 de 2013 y Resolución 1519 de 2020 sobre accesibilidad digital), Brasil (Lei Brasileira de Inclusão / LBI) y otros mercados donde opera Rappi ya exigen accesibilidad digital en servicios esenciales. Un domicilio de comida cada vez se lee más como servicio esencial.

## Principios / reglas

1. **Accesible por defecto, no como parche.** La regla no es documentar accesibilidad al final, es que los tokens y componentes ya vengan resueltos, así el equipo de producto no tiene que resolverlo cada vez.
2. **Perceptible, operable, comprensible y robusto (POUR).** Estos cuatro principios ordenan cualquier decisión: se puede percibir con cualquier sentido, se puede operar con cualquier método de entrada, se entiende sin ambigüedad, y funciona con cualquier tecnología asistiva.
3. **Bajo carga cognitiva beneficia a todos.** Lenguaje simple, flujos lineales y poca sobrecarga no son solo para discapacidad cognitiva: ayudan a cualquiera usando la app con una mano, apurado, mientras reparte un pedido.
4. **Construir una vez, accesible en todas partes.** Si el componente de Mustache ya trae foco visible, contraste correcto y `contentDescription`, cada equipo de producto hereda eso gratis. Es más barato resolverlo en el Design System que auditar 40 pantallas después.
5. **Probar con tecnología real, no solo con checklist.** Un componente puede "pasar" el criterio en papel y seguir siendo confuso con VoiceOver o TalkBack activado. La validación final es usar el lector de pantalla, no solo revisar la lista de criterios.

## Anatomía / escala

Mínimos que Mustache exige, alineados al estándar internacional **WCAG 2.2 nivel AA**:

| Criterio | Mínimo Mustache | Por qué |
|---|---|---|
| Contraste texto normal | 4.5:1 | Legible para baja visión y bajo sol directo |
| Contraste texto grande (≥18pt o ≥14pt bold) | 3:1 | El tamaño ya compensa parte del contraste |
| Contraste de elementos gráficos y UI (íconos, bordes de input, foco) | 3:1 | Si no se ve el borde, no se sabe que es interactivo |
| Área táctil mínima | 48×48px | Clave para repartidores en movimiento |
| Separación entre áreas táctiles adyacentes | 8px | Evita toques accidentales |
| Foco visible | Siempre, con token `interactive/focus` (o el que defina [[color]]) | Navegación por teclado/switch debe verse, no solo funcionar |
| Escalado de texto | Hasta 200% sin romper el layout | Personas que agrandan la fuente del sistema |
| Animaciones/parpadeo | Nada que parpadee más de 3 veces por segundo; respetar "reducir movimiento" del sistema | Riesgo de crisis fotosensibles |

`[por confirmar]`: valores exactos de contraste ya resueltos en la colección "Colors (Light mode)" de **semantics**; falta correr `get_variable_defs` sobre pares reales (texto/fondo) para confirmar que todos los tokens `ink/*` sobre `background/*` cumplen 4.5:1.

## Cómo usarlo

**Diseño**
1. Nunca uses el color como único indicador de estado (error, éxito, deshabilitado). Súmale ícono o texto.
2. Verifica contraste con un checker antes de entregar, no después.
3. Diseña el estado de foco de cada componente interactivo, no lo dejes al navegador/OS por defecto.

**Contenido**
1. Escribe labels que digan qué hace el control ("Confirmar pedido", no "Aceptar").
2. Evita depender solo de un ícono para comunicar una acción crítica.

**Desarrollo**
1. Usa los componentes de Mustache tal cual: ya traen `contentDescription`/`aria-label`, foco y área táctil resueltos.
2. Si necesitas un elemento custom, primero revisa si existe en la librería antes de reinventarlo sin accesibilidad.

## Cómo se aplica por fundamento

Esta ficha es el paraguas. Cada foundation hereda una parte:

- [[color]]: los pares `ink/*` sobre `background/*` deben cumplir el contraste de la tabla de arriba, en light y dark.
- [[tipografia]]: la escala debe seguir siendo legible al 200% de zoom; el peso Medium (que reemplaza a Bold en Mustache) necesita suficiente contraste de peso, no solo de color.
- [[iconos]]: todo ícono funcional lleva texto o label accesible; el trazo de 2px ayuda al reconocimiento con baja visión.
- [[spacing]]: la escala de spacing es la que sostiene el área táctil de 48px y los 8px de separación.
- Motion `[por documentar]`: nada de parpadeo agresivo; respetar la preferencia de "reducir movimiento" del sistema operativo.

## Cómo le pega a Rappi como compañía madura

Para escalarlo dentro de Rappi:

1. **Empieza por foundations, no por componentes sueltos.** Si color, tipografía y spacing ya cumplen los mínimos, cada componente nuevo hereda accesibilidad gratis. Auditar 200 componentes uno por uno es más caro que arreglar 3 foundations.
2. **Prioriza por uso, no por visibilidad.** Botón, input, tarjeta de producto y navegación inferior se repiten en miles de pantallas: ahí vive el 80% del impacto real para el usuario final y el repartidor.
3. **Un dueño, no un comité difuso.** Alguien en el equipo de DS necesita ser el punto de referencia de accesibilidad, aunque sea part-time al inicio.
4. **Súmalo al changelog del DS.** Cada mejora de contraste o de foco que se resuelva en semantics queda registrada ahí (ver [[rappi-design-system]]), así el criterio de "por qué cambió este token" no se pierde.
5. **Piensa multi-país desde el día uno.** Lo que en Colombia es buena práctica, en Brasil es requisito legal (LBI). Documentar el mínimo como WCAG 2.2 AA evita rehacer el trabajo por país.
6. **Que se note en el negocio, no solo en QA.** Menos fricción para reparar un pedido con una mano, mejor legibilidad bajo sol, menos tickets de soporte por "no encuentro el botón": la accesibilidad bien hecha reduce carga operativa, no solo riesgo legal.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Marcar un error con ícono + texto + color | Marcar un error solo con el borde rojo |
| Diseñar el estado de foco de cada control | Confiar en el foco por defecto del navegador |
| Probar el flujo crítico con VoiceOver/TalkBack antes de publicar | Asumir que "pasa el checklist" es lo mismo que "funciona con lector de pantalla" |
| Dar 48×48px de área táctil aunque el ícono visual sea de 24px | Reducir el área táctil para que el diseño "se vea más limpio" |

## Dependencias / relación

- [[color]]: contraste de tokens semánticos.
- [[tipografia]]: escalado y jerarquía.
- [[iconos]]: labels accesibles y trazo reconocible.
- [[spacing]]: área táctil y separación entre elementos.
- [[rappi-design-system]]: dónde queda el registro de cambios de accesibilidad en el changelog.

## Marco normativo y documentos relacionados

**Estándar de referencia**
- WCAG 2.2, nivel de conformidad AA (World Wide Web Consortium). Es el criterio técnico que sostiene toda la tabla de mínimos de este documento.

**Marco regulatorio por país (mercados donde opera Rappi)**
- Colombia: Ley Estatutaria 1618 de 2013 y Resolución 1519 de 2020 (accesibilidad digital en entornos TIC).
- Brasil: Lei Brasileira de Inclusão (Lei nº 13.146/2015).
- `[pendiente]`: mapear el resto de países donde opera Rappi (México, Argentina, Chile, Perú, Costa Rica, Ecuador, Uruguay) contra su marco local de accesibilidad digital.

**Documentos internos relacionados**
- [[rappi-design-system]]: estructura de foundations, ubicación del changelog de semantics.
- [[color]], [[tipografia]], [[iconos]], [[spacing]]: foundations que heredan los mínimos definidos aquí.

**Control de versión**
- Versión: 0.1 (borrador para revisión interna).
- Propietario: equipo de Design System, Mustache.
- Última actualización: 23 sep, 2026.
