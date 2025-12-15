export type Direction = "N" | "E" | "S" | "W";

const LEFT: Record<Direction, Direction> = {
  N: "W",
  W: "S",
  S: "E",
  E: "N"
};

const RIGHT: Record<Direction, Direction> = {
  N: "E",
  E: "S",
  S: "W",
  W: "N"
};

export function turnLeft(d: Direction): Direction {
  return LEFT[d];
}

export function turnRight(d: Direction): Direction {
  return RIGHT[d];
}
