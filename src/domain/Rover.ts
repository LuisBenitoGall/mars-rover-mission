import type { Direction } from "./Direction";
import { turnLeft, turnRight } from "./Direction";

export type Position = Readonly<{ x: number; y: number }>;

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
}
