import type { Direction } from "./Direction";
import { turnLeft, turnRight } from "./Direction";
import type { Position } from "../world/Grid";
import { Grid } from "../world/Grid";

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
