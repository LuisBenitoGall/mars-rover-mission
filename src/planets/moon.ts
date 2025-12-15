import { Grid, type Position } from "../world/Grid.js";

const DEFAULT_OBSTACLES: Position[] = [
  { x: 0, y: 2 },     // para que "FF..." desde (0,0) mirando N choque pronto
  { x: 2, y: 2 },     // otro obstáculo “cercano”
  { x: 199, y: 0 },   // útil para probar wrap-around desde (0,0) mirando W
  { x: 10, y: 199 }   // por tener uno en el borde superior
];

export function createMoon(obstacles: Position[] = []): Grid {
  return new Grid(400, 150, [...DEFAULT_OBSTACLES, ...obstacles);
}
