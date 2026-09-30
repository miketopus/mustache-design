# Guía de Estilo de Iconografía — Rappi Design System

**Versión:** 2.0  
**Equipo:** Design Systems · Rappi  
**Formatos de exportación:** SVG · PNG · JPG  
**Estilos disponibles:** Outline · Filled

---

## 1. ¿Qué es un ícono?

Los íconos son símbolos visuales que representan objetos, acciones o conceptos de forma inmediata y universal. Son independientes del idioma, ocupan poco espacio y reducen la carga cognitiva del usuario cuando se usan correctamente.

Un ícono efectivo es:
- **Reconocible:** el usuario entiende su significado de forma inmediata
- **Distinto:** no se confunde con otros íconos del sistema
- **Consistente:** sigue las mismas reglas de construcción que el resto del set
- **Escalable:** funciona correctamente en todos los tamaños definidos

> Los íconos deben usarse con moderación. Un exceso de íconos sin texto de apoyo aumenta la ambigüedad, no la reduce.

---

## 2. Principios de diseño

Los íconos son una extensión visual de la marca. Antes de diseñar, es importante entender los valores de Rappi y cómo se traducen visualmente.

**Rappi como marca es:** directa, accesible, dinámica y cercana. Esto se refleja en íconos que:
- Tienen trazos de peso consistente (no demasiado delgados ni pesados)
- Usan esquinas ligeramente redondeadas (no puntiagudas ni excesivamente suaves)
- Son figurativos y literales, no abstractos
- Priorizan la claridad sobre la complejidad

---

## 3. Anatomía del ícono

### Grilla base

Todos los íconos se construyen sobre una grilla de **24×24px**.

| Zona | Tamaño | Descripción |
|------|--------|-------------|
| Frame total | 24×24px | Contenedor del ícono. Define el espacio que ocupa en la interfaz |
| Área viva (live area) | 20×20px | Zona donde vive el elemento principal del ícono |
| Margen de contenedor | 2px (cada lado) | Zona de respiro; puede usarse para elementos secundarios que necesiten sobresalir |

### Grilla de píxeles

Siempre alinea los elementos a la grilla de píxeles. Esto garantiza que las líneas se rendericen con nitidez en pantalla y facilita el espaciado consistente.

- Las líneas rectas deben quedar exactamente sobre un píxel
- Las formas curvas también se construyen sobre la grilla de píxeles
- En Figma, activa "Snap to pixel grid" para asegurarte

### Grilla óptica

Los objetos circulares o curvos se perciben visualmente más pequeños que los rectangulares aunque tengan las mismas dimensiones. Para compensar esto, los íconos de diferentes formas base llegan a distintos bordes de la grilla:

- **Cuadrado / rectángulo** → llega al borde del área viva
- **Círculo** → se extiende ligeramente más allá del área viva para equilibrar el peso visual
- **Formas diagonales o irregulares** → el objeto dominante debe estar centrado óptica y geométricamente

El padding sugerido en los bordes del frame es igual al grosor del trazo (2px).

### Bounding box (cuadro delimitador)

El bounding box (área completa de 24×24px) se usa **solo** cuando el ícono incluye elementos adicionales como badges, alertas o indicadores secundarios. Para íconos simples, el elemento principal debe vivir dentro del área viva de 20×20px.

---

## 4. Estilos

Rappi tiene dos estilos de íconos. La elección entre uno y otro depende del contexto y la necesidad de comunicación.

### Outline (trazo)

El estilo outline usa líneas para definir la forma. Es el estilo principal del sistema.

- Permite mayor detalle y precisión
- Tiene una percepción más ligera y moderna
- Se usa en la mayoría de los contextos de la interfaz

### Filled (relleno)

El estilo filled usa formas sólidas. Se usa para:

- Indicar un estado **activo o seleccionado** (por ejemplo, un tab activo en navegación)
- Íconos que necesitan mayor peso visual en contextos de alta densidad
- Situaciones donde la reconocibilidad inmediata es prioritaria

> **Regla de consistencia:** nunca mezcles estilos outline y filled en el mismo conjunto o componente, a menos que sea intencionalmente para comunicar un estado diferente.

---

## 5. Construcción

### Color

Los íconos de producto usan **un solo color: negro** (o el color de texto del sistema). Esto garantiza que los componentes sean fáciles de reutilizar y adaptar.

- Íconos de producto: 1 color
- Íconos de marketing: máximo 2 colores si es parte esencial de la marca
- 3 o más colores = ilustración, no ícono

Los diseñadores ajustan el color del ícono en sus archivos individuales. Nunca en el archivo maestro.

### Tamaño y escala

Los íconos se diseñan en un solo tamaño canónico y se escalan para los usos definidos.

| Tamaño | Uso recomendado |
|--------|-----------------|
| 16px | Íconos en contextos de alta densidad: tablas, listas compactas, inputs |
| 24px | Uso general en la interfaz (tamaño base) |
| 32px | Íconos con mayor jerarquía visual: empty states, onboarding, encabezados |

**Proceso de construcción recomendado:** diseña primero en el tamaño más grande y ve reduciendo. Es más fácil simplificar que añadir detalle.

Cuando un ícono se use en tamaños grandes para marketing (80px o más), considera añadir detalle visual que a 24px no sería visible ni necesario.

### Trazos (Strokes)

- Grosor de línea estándar: **2px**
- Todos los trazos del set deben tener el mismo grosor
- El espacio entre trazos paralelos no debe ser menor que el grosor del trazo (2px mínimo)
- No usar íconos outline en tamaños menores a **10px** (a esa escala se vuelven ilegibles)

### Terminaciones y esquinas

**Terminaciones (end caps):** redondeadas en todos los íconos. Elige un estilo y aplícalo de forma consistente en todo el set.

**Esquinas:** redondeadas según la composición del ícono. Para formas concéntricas, el radio interior es siempre menor que el exterior para mantener proporciones correctas.

### Formas geométricas

Usa formas básicas como punto de partida: rectángulos, cuadrados y círculos. Esto facilita la consistencia visual entre íconos y los hace más fáciles de mantener y editar.

Para formas diagonales, **no uses un rectángulo rotado**. Dibuja los vértices directamente sobre la grilla de píxeles para asegurarte de que los puntos de ancla estén bien colocados.

### Metáfora y legibilidad

La metáfora es la asociación conceptual que hace que el ícono sea entendible. Un ícono de casa = inicio. Un insecto = error.

Al escalar un ícono a tamaños pequeños, mantén la metáfora, no la forma exacta. Si no caben todos los detalles, conserva los más importantes. Si el espacio es muy limitado, simplifica los detalles en lugar de eliminarlos.

### Boolean operations en Figma

Usa las operaciones booleanas para construir íconos editables y limpios:

- **Union:** combina formas; la ruta exterior es la suma de todas menos los solapamientos
- **Subtract:** elimina el área de una forma sobre otra (útil para huecos y ventanas)
- **Intersect:** conserva solo el área donde las formas se superponen
- **Exclude:** conserva solo las áreas que no se superponen

Al terminar un ícono, aplica un **Union** para que sea un solo objeto. Esto facilita el cambio de color a otros diseñadores.

---

## 6. Nombrado y organización

### Convención de nombres

Nombra los íconos por **lo que representan visualmente**, no por su función conceptual.

| Correcto | Incorrecto |
|----------|------------|
| `stopwatch` | `speed` |
| `lightbulb` | `idea` |
| `house` | `home` |

Reglas:
- Nombres en minúsculas
- Palabras separadas por guión: `chef-hat`, `credit-card`
- Nombres cortos y descriptivos

### Variantes con slash

Usa slash (`/`) para separar el estilo y las variantes del nombre base:

```
outline/email
filled/email
outline/shield
outline/shield-dollar
outline/shield-euro
```

### Jerarquía de organización

```
Estilo (outline / filled)
  └── Categoría (communication, navigation, finance...)
        └── Nombre del ícono (email, arrow-right, credit-card)
```

### Keywords y descripción del componente

Usa el campo de descripción del componente en Figma para agregar sinónimos y palabras clave de búsqueda. Esto evita nombres largos y ayuda a otros diseñadores a encontrar íconos por concepto.

Ejemplo para el ícono `lightbulb`: descripción → "idea, sugerencia, consejo, tip, inspiración"

---

## 7. Categorías del sistema

El sistema de íconos de Rappi está organizado en las siguientes categorías:

Accessibility · Alert · Alphabet · Animals · Arrows · Astronomy · Automotive · Buildings · Business · Camping · Charity · Charts + Diagrams · Childhood · Clothing + Fashion · Coding · Communication · Connectivity · Construction · Design · Devices + Hardware · Disaster + Crisis · Editing · Education · Emoji · Energy · Files · Film + Video · Food + Beverage · Fruits + Vegetables · Gaming · Genders · Halloween · Hands · Holidays · Household · Humanitarian · Logistics · Maps · Maritime · Marketing · Mathematics · Media Playback · Medical + Health · Money · Moving · Music + Audio · Nature · Numbers · Photos + Images · Political · Punctuation + Symbols · Religion · Science · Science Fiction · Security · Shapes · Shopping · Social · Spinners · Sports + Fitness · Text Formatting · Time · Toggle · Transportation · Travel + Hotel · Users + People · Weather · Writing

---

## 8. Exportación y formatos

| Formato | Uso |
|---------|-----|
| SVG | Desarrollo (web y app). Código limpio y escalable |
| PNG @1x / @2x / @3x | Partners externos, materiales de marketing |
| JPG | Casos específicos donde no se requiere transparencia |

Al exportar SVGs desde Figma:
- Asegúrate de que el ícono sea un solo objeto (aplica Union si es necesario)
- No debe haber capas vacías, líneas sobrantes ni elementos fuera del frame
- Verifica que todos los elementos estén dentro del frame de 24×24px

---

## 9. Gobernanza y colaboración

### Quién puede editar

El archivo maestro de íconos tiene acceso de **edición solo para el equipo de Design Systems**. El resto del equipo tiene acceso de **visualización y uso de librería**.

Esto garantiza que:
- Cada ícono sea auditado antes de entrar al sistema
- No haya duplicados ni versiones divergentes
- Los cambios se propaguen correctamente a todos los usos

### Proceso para agregar un ícono nuevo

1. El diseñador solicita el ícono nuevo al equipo de Design Systems
2. Se verifica que no exista ya un ícono equivalente (revisa keywords en la librería)
3. Se diseña siguiendo esta guía
4. Se hace peer review con al menos otro diseñador
5. Se agrega al archivo maestro con el nombre y categoría correctos
6. Se comunica la actualización al equipo

### Coordinación con Ingeniería

Antes de iniciar un set nuevo o hacer cambios estructurales al sistema de íconos, habla con el equipo de ingeniería. Ellos pueden darte información sobre:
- Formatos preferidos para implementación en el stack actual
- Tamaños que ya están en uso en código
- Convenciones de nombres esperadas en los componentes

---

## 10. Checklist de calidad

Antes de agregar un ícono al sistema, verifica:

- [ ] Construido sobre grilla de 24×24px con área viva de 20×20px
- [ ] Alineado a la grilla de píxeles
- [ ] Grosor de trazo de 2px (si es outline)
- [ ] Terminaciones redondeadas y consistentes
- [ ] Esquinas redondeadas según la composición
- [ ] Un solo objeto (Boolean Union aplicado)
- [ ] Sin capas vacías ni elementos fuera del frame
- [ ] Nombre correcto: describe lo que se ve, no lo que significa
- [ ] Categoría asignada
- [ ] Keywords en la descripción del componente
- [ ] Revisado por un segundo diseñador

---

*Guía mantenida por el equipo de Design Systems de Rappi. Para cambios o preguntas, contacta al equipo directamente.*
