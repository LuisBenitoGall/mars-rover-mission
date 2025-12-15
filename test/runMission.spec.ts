import { describe, it, expect } from "vitest";
import { createMars } from "../src/planets";
import { runMission } from "../src/mission/runMission";

describe("runMission", () => {
  it("runs mission on Mars grid", () => {
    const planet = createMars();
    const result = runMission({
      start: { position: { x: 0, y: 0 }, direction: "N" },
      commands: "FFRFF",
      planet
    });

    expect(result.status).toBe("OK");
    if (result.status === "OK") {
      expect(result.rover.position).toEqual({ x: 2, y: 2 });
      expect(result.rover.direction).toBe("E");
    }
  });

  it("reports obstacle on Mars grid", () => {
    const planet = createMars([{ x: 0, y: 2 }]);
    const result = runMission({
      start: { position: { x: 0, y: 0 }, direction: "N" },
      commands: "FF",
      planet
    });

    expect(result.status).toBe("OBSTACLE");
    if (result.status === "OBSTACLE") {
      expect(result.rover.position).toEqual({ x: 0, y: 1 });
      expect(result.obstacle).toEqual({ x: 0, y: 2 });
    }
  });
});
