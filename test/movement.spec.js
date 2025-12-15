import { describe, it, expect } from "vitest";
import { Grid } from "../src/world/Grid";
import { Rover } from "../src/domain/Rover";
describe("Movement forward with wrap-around grid", () => {
    it("moves north by +1 in y", () => {
        const grid = new Grid(5, 5);
        const rover = new Rover({ x: 2, y: 2 }, "N");
        const moved = rover.forward(grid);
        expect(moved.position).toEqual({ x: 2, y: 3 });
        expect(moved.direction).toBe("N");
    });
    it("wraps when moving west from x=0", () => {
        const grid = new Grid(5, 5);
        const rover = new Rover({ x: 0, y: 0 }, "W");
        const moved = rover.forward(grid);
        expect(moved.position).toEqual({ x: 4, y: 0 });
    });
    it("wraps when moving south from y=0", () => {
        const grid = new Grid(5, 5);
        const rover = new Rover({ x: 1, y: 0 }, "S");
        const moved = rover.forward(grid);
        expect(moved.position).toEqual({ x: 1, y: 4 });
    });
    it("wraps when moving east from x=width-1", () => {
        const grid = new Grid(5, 5);
        const rover = new Rover({ x: 4, y: 3 }, "E");
        const moved = rover.forward(grid);
        expect(moved.position).toEqual({ x: 0, y: 3 });
    });
});
