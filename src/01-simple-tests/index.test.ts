// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const data = { a: 4, b: 4, action: Action.Add };
    const result = simpleCalculator(data);
    expect(result).toBe(8);
  });

  test('should subtract two numbers', () => {
    const data = { a: 4, b: 4, action: Action.Subtract };
    const result = simpleCalculator(data);
    expect(result).toBe(0);
  });

  test('should multiply two numbers', () => {
    const data = { a: 4, b: 4, action: Action.Multiply };
    const result = simpleCalculator(data);
    expect(result).toBe(16);
  });

  test('should divide two numbers', () => {
    const data = { a: 4, b: 4, action: Action.Divide };
    const result = simpleCalculator(data);
    expect(result).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const data = { a: 4, b: 4, action: Action.Exponentiate };
    const result = simpleCalculator(data);
    expect(result).toBe(256);
  });

  test('should return null for invalid action', () => {
    const data = { a: 4, b: 4, action: undefined || null };
    const result = simpleCalculator(data);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const data = { a: '4', b: 4, action: Action.Add };
    const result = simpleCalculator(data);
    expect(result).toBeNull();
  });
});
