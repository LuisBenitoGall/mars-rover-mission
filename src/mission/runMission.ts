import { Rover } from "../domain/Rover.js";
import type { Direction } from "../domain/Direction.js";
import type { Position } from "../world/Grid.js";
import { Grid } from "../world/Grid.js";
import { executeCommands, type ExecutionResult } from "./executeCommands.js";

export type MissionInput = Readonly<{
  start: { position: Position; direction: Direction };
  commands: string;
  planet: Grid;
}>;

export function runMission(input: MissionInput): ExecutionResult {
  const rover = new Rover(input.start.position, input.start.direction);
  return executeCommands(rover, input.planet, input.commands);
}
