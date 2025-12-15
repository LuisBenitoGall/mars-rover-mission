import { createMars } from "./planets/index.js";
import { runMission } from "./mission/runMission.js";

function usage(): never {
  console.error('Usage: npm start -- "<COMMANDS>" <x> <y> <N|E|S|W>');
  process.exit(1);
}

const [, , commands, xStr, yStr, dir] = process.argv;

if (!commands || !xStr || !yStr || !dir) usage();

const x = Number(xStr);
const y = Number(yStr);

if (!Number.isInteger(x) || !Number.isInteger(y)) {
  console.error("x and y must be integers");
  process.exit(1);
}

if (!["N", "E", "S", "W"].includes(dir)) {
  console.error("Direction must be one of: N E S W");
  process.exit(1);
}

const planet = createMars(); // luego podrás cambiar a otro planeta
const result = runMission({
  start: { position: { x, y }, direction: dir as "N" | "E" | "S" | "W" },
  commands,
  planet
});

if (result.status === "OK") {
  console.log(`OK ${result.rover.position.x} ${result.rover.position.y} ${result.rover.direction}`);
} else {
  console.log(
    `OBSTACLE ${result.rover.position.x} ${result.rover.position.y} ${result.rover.direction} @ ${result.obstacle.x} ${result.obstacle.y}`
  );
}
