export type Direction = "N" | "E" | "S" | "W";

const order: Direction[] = ["N", "E", "S", "W"];

export function turnLeft(d: Direction): Direction {
  const i = order.indexOf(d);
  return order[(i + 3) % 4];
}

export function turnRight(d: Direction): Direction {
  const i = order.indexOf(d);
  return order[(i + 1) % 4];
}
