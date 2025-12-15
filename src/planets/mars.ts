import { Grid, type Position } from "../world/Grid.js";

export function createMars(obstacles: Position[] = []): Grid {
  return new Grid(200, 200, obstacles);
}
