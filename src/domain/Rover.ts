import type { Direction } from "./Direction.js";
import { turnLeft, turnRight } from "./Direction.js";
import type { Position } from "../world/Grid.js";
import { Grid } from "../world/Grid.js";

export class Rover {
  public readonly position: Position;
  public readonly direction: Direction;

  constructor(position: Position, direction: Direction) {
    this.position = position;
    this.direction = direction;
  }

  left(): Rover {
    return new Rover(this.position, turnLeft(this.direction));
  }

  right(): Rover {
    return new Rover(this.position, turnRight(this.direction));
  }

  forward(grid: Grid): Rover {
    const next = grid.nextForwardPosition(this.position, this.direction);
    return new Rover(next, this.direction);
  }
}
