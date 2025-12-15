# Mars Rover Mission (TypeScript + Node)

Simulador de un rover que se desplaza sobre un planeta cuadrado procesando una secuencia de comandos (`L`, `R`, `F`).  
El rover mantiene un estado `(x, y, dirección)` y, tras ejecutar la secuencia, devuelve un resultado:

- **OK**: posición y dirección finales.
- **OBSTACLE**: se detecta un obstáculo antes de completar un avance (`F`), el rover **no entra** en la celda bloqueada, **detiene** la ejecución y **reporta** la posición del obstáculo.

---

## Contenido

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Ejecución de tests](#ejecución-de-tests)
- [Build](#build)
- [Ejecución (CLI)](#ejecución-cli)
- [Formato de salida](#formato-de-salida)
- [Modelo de dominio](#modelo-de-dominio)
- [Reglas del mundo (Grid)](#reglas-del-mundo-grid)
- [Obstáculos](#obstáculos)
- [Ejemplos](#ejemplos)
- [Arquitectura](#arquitectura)
- [Scripts disponibles](#scripts-disponibles)
- [Decisiones de diseño](#decisiones-de-diseño)

---

## Requisitos
- Node.js **20+**
- npm

> Nota: el proyecto está configurado como **ESM** (`"type": "module"`).


## Instalación
Instala dependencias de forma reproducible:

```bash
npm ci


## Ejecución de tests
- Ejecuta la suite de tests: 		npm test
- Modo 'watch':						npm run test:watch


## Build
- npm run build


## Ejecución (CLI)
- Uso:								npm run build
									npm start -- "<COMANDOS>" <x> <y> <DIRECCION>

- Parámetros:						<COMANDOS>: cadena con comandos L, R, F.
										Se normaliza a mayúsculas internamente.
										Si contiene un carácter distinto de L, R o F, se produce un error de validación.
									<x> <y>: coordenadas enteras iniciales.
									<DIRECCION>: dirección inicial (N, E, S, W).									

- Ejemplo:							npm start -- "FFRFF" 0 0 N


## Formato de salida
- El CLI imprime una sola línea con el resultado.
	- Misión OK:					OK x y D 	(x y D: estado final del rover)
	- Obstáculo:					OBSTACLE x y D @ ox oy   	(
																- x y D: estado final del rover en el último punto alcanzable. 
																- ox oy: coordenadas del obstáculo detectado. 
																- La ejecución se detiene inmediatamente tras detectar el obstáculo y no se procesan comandos restantes.
																) 

## Modelo de dominio
- Estado del rover:					Posición: (x, y)
									Dirección: N E S W

- Comandos soportados:				L: gira 90° a la izquierda
									R: gira 90° a la derecha
									F: avanza 1 celda en la dirección actual

- Rotaciones:						L: N -> W -> S -> E -> N
									R: N -> E -> S -> W -> N	


## Reglas del mundo (Grid)
- Tamaño del mundo:					with = 200; height = 200	

- Las coordenadas operan en un sistema 0-indexado:				x ∈ [0, 199]
																y ∈ [0, 199]		

- Wrap-around (mundo toroidal):
	El mundo es toroidal: si el rover sale por un borde, reaparece por el lado opuesto.
	Ejemplos conceptuales (en un grid 5x5):
		desde (0,0) hacia W con F → (4,0)
		desde (4,3) hacia E con F → (0,3)
		desde (1,0) hacia S con F → (1,4)
		desde (2,4) hacia N con F → (2,0)																																		


## Obstáculos
El rover consulta su entorno antes de ejecutar un avance.
Los obstáculos se setean en el planeta y se pueden incluir nuevos obstáculos: 
	const DEFAULT_OBSTACLES: Position[] = [
  		{ x: 0, y: 2 },     
  		{ x: 2, y: 2 },     
  		{ x: 199, y: 0 },   
  		{ x: 10, y: 199 }   
	];
Los obstáculos se detectan con cada avance frontal (F). Cuando el rover detecta un obstáculo detiene su avance y reporta la posición de dicho obstáculo.
La detección de un obstáculo aborta la secuencia restante.
La dirección final es la que tenía el rover antes del movimiento bloqueado.
El rover no ejecuta giros pendientes (L/R) posteriores al bloqueo.


## Ejemplos
- Sin obstáculos					npm start -- "FFRFF" 0 0 N 					Salida: 	OK 2 2 E
- Con obstáculo (en 0,2)			npm start -- "FFRFF" 0 0 N 					Salida: 	OBSTACLE 0 1 N @ 0 2


## Arquitectura
- src/domain
	Direction: tipos y funciones de giro (turnLeft, turnRight)
	Rover: estado y operaciones (giro y avance delegando en el mundo)

- src/world
	Grid: tamaño, wrap-around, obstáculos, cálculo de próxima posición

- src/mission
	executeCommands: parsea y ejecuta la secuencia; aplica parada por obstáculo
	runMission: API de alto nivel (inyecta el planeta)

- src/planets
	presets de planetas (p.ej. createMars con tamaño 200x200 y obstáculos predefinidos)

- src/index.ts
	CLI: parseo de argumentos y ejecución de misión


## Scripts disponibles
- npm test
	Ejecuta tests con Vitest.

- npm run test:watch
	Ejecuta tests en modo watch.

- npm run build
	Compila TypeScript a dist/.

- npm start -- ...
	Ejecuta el CLI (node dist/index.js ...). Requiere build previo.

- npm run lint
	Ejecuta ESLint.

- npm run format
	Formatea con Prettier.

- npm run check
	Ejecuta lint + test.


## Decisiones de diseño
- ESM: se utiliza "type": "module" para alinearse con tooling moderno (Vite/Vitest).
- Inmutabilidad del rover: las operaciones devuelven nuevas instancias; reduce efectos colaterales.
- Wrap-around (toroidal): hace el mundo finito y continuo, y simplifica comportamiento en bordes.
- Obstáculos como parte del mundo: evita acoplar “terreno” al rover y facilita planetas configurables.
- Resultado estructurado (OK/OBSTACLE): facilita pruebas y reduce dependencia de strings.

