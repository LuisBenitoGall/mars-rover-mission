# Mars Rover Mission

Simulador de un rover que se desplaza sobre un planeta cuadrado procesando una secuencia de comandos (`L`, `R`, `F`).  
El rover mantiene un estado `(x, y, dirección)` y, al ejecutar comandos, termina en una posición y orientación finales.  
Si un movimiento hacia delante (`F`) encuentra un obstáculo, el rover **no avanza**, **detiene la ejecución** y **reporta** la posición del obstáculo.

---

## Requisitos

- Node.js **20+**
- npm

---

## Instalación

```bash
npm ci


