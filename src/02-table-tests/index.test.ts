// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 4, b: 4, action: Action.Add, expected: 8 },
  { a: 4, b: 4, action: Action.Subtract, expected: 0 },
  { a: 4, b: 4, action: Action.Multiply, expected: 16 },
  { a: 4, b: 4, action: Action.Divide, expected: 1 },
  { a: 4, b: 4, action: Action.Exponentiate, expected: 256 },
  { a: 4, b: 4, action: 'x', expected: null },
  { a: '4', b: 4, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return correct results',
    ({ expected, a, action, b }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
