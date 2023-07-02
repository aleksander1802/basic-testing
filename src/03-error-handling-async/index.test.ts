// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'Hello, world!';
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Error message!';
    const result = () => throwError(errorMessage);
    expect(result).toThrowError(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const result = () => throwError();
    expect(result).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => throwCustomError();
    expect(result).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const result = rejectCustomError();
    expect(result).rejects.toThrowError(MyAwesomeError);
  });
});
