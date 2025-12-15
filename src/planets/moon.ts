import { Grid, type Position } from "../world/Grid.js";

export function createMoon(obstacles: Position[] = []): Grid {
  return new Grid(200, 200, obstacles);
}
