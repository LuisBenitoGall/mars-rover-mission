import { Rover } from "../domain/Rover.js";
import type { Direction } from "../domain/Direction.js";
import { Grid, type Position } from "../world/Grid.js";

export type Command = "L" | "R" | "F";

export type ExecutionResult =
  | { status: "OK"; rover: Rover }
  | { status: "OBSTACLE"; rover: Rover; obstacle: Position };

export function parseCommands(input: string): Command[] {
  const cmds = input.trim().toUpperCase().split("");
  for (const c of cmds) {
    if (c !== "L" && c !== "R" && c !== "F") {
      throw new Error(`Invalid command: '${c}'`);
    }
  }
  return cmds as Command[];
}

export function executeCommands(rover: Rover, grid: Grid, commands: string | Command[]): ExecutionResult {
  const sequence = typeof commands === "string" ? parseCommands(commands) : commands;

  let current = rover;

  for (const cmd of sequence) {
    if (cmd === "L") {
      current = current.left();
      continue;
    }

    if (cmd === "R") {
      current = current.right();
      continue;
    }

    // cmd === "F"
    const next = grid.nextForwardPosition(current.position, current.direction);
    if (grid.isObstacle(next)) {
      return { status: "OBSTACLE", rover: current, obstacle: next };
    }
    current = new Rover(next, current.direction);
  }

  return { status: "OK", rover: current };
}
