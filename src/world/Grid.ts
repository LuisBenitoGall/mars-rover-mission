import type { Direction } from "../domain/Direction.js";

export type Position = Readonly<{ x: number; y: number }>;

export class Grid {
  public readonly width: number;
  public readonly height: number;
  private readonly obstacles: Set<string>;

  constructor(width: number, height: number, obstacles: Position[] = []) {
    if (width <= 0 || height <= 0) throw new Error("Grid size must be positive");
    this.width = width;
    this.height = height;
    this.obstacles = new Set(obstacles.map((p) => Grid.key(this.normalize(p))));
  }

  normalize(p: Position): Position {
    const x = ((p.x % this.width) + this.width) % this.width;
    const y = ((p.y % this.height) + this.height) % this.height;
    return { x, y };
  }

  isObstacle(p: Position): boolean {
    const n = this.normalize(p);
    return this.obstacles.has(Grid.key(n));
  }

  nextForwardPosition(from: Position, dir: Direction): Position {
    const raw =
      dir === "N"
        ? { x: from.x, y: from.y + 1 }
        : dir === "S"
          ? { x: from.x, y: from.y - 1 }
          : dir === "E"
            ? { x: from.x + 1, y: from.y }
            : { x: from.x - 1, y: from.y };

    return this.normalize(raw);
  }

  private static key(p: Position): string {
    return `${p.x},${p.y}`;
  }
}
