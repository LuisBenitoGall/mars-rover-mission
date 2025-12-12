import { describe, it, expect } from "vitest";
import { Grid } from "../src/world/Grid";
import { Rover } from "../src/domain/Rover";
import { executeCommands } from "../src/mission/executeCommands";

describe("Command execution", () => {
  it("executes a sequence of commands", () => {
    const grid = new Grid(5, 5);
    const rover = new Rover({ x: 0, y: 0 }, "N");

    const result = executeCommands(rover, grid, "FFRFF");

    expect(result.status).toBe("OK");
    if (result.status === "OK") {
      expect(result.rover.position).toEqual({ x: 2, y: 2 });
      expect(result.rover.direction).toBe("E");
    }
  });

  it("stops before obstacle, reports it, and aborts remaining commands", () => {
    const grid = new Grid(5, 5, [{ x: 0, y: 2 }]);
    const rover = new Rover({ x: 0, y: 0 }, "N");

    const result = executeCommands(rover, grid, "FFR"); // el R NO debe ejecutarse

    expect(result.status).toBe("OBSTACLE");
    if (result.status === "OBSTACLE") {
      expect(result.rover.position).toEqual({ x: 0, y: 1 });
      expect(result.rover.direction).toBe("N");
      expect(result.obstacle).toEqual({ x: 0, y: 2 });
    }
  });

  it("detects obstacle after wrap-around", () => {
    const grid = new Grid(5, 5, [{ x: 4, y: 0 }]);
    const rover = new Rover({ x: 0, y: 0 }, "W");

    const result = executeCommands(rover, grid, "F");

    expect(result.status).toBe("OBSTACLE");
    if (result.status === "OBSTACLE") {
      expect(result.rover.position).toEqual({ x: 0, y: 0 });
      expect(result.obstacle).toEqual({ x: 4, y: 0 });
    }
  });

  it("rejects invalid commands", () => {
    const grid = new Grid(5, 5);
    const rover = new Rover({ x: 0, y: 0 }, "N");

    expect(() => executeCommands(rover, grid, "FX")).toThrowError("Invalid command");
  });
});
