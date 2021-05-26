// sum.test.js
import { sum } from "../../sources/scripts/sum.js";

test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
});

    // "@babel/core": "^7.14.3",
    // "@babel/preset-env": "^7.14.2",
    // "babel-jest": "^27.0.1",
    // "jest": "^27.0.1"