// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => ({
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
  unmockedFunction: jest.requireActual('./index').unmockedFunction,
}));

describe('partial mocking', () => {
  const consoleLogSpy = jest.spyOn(console, 'log');

  afterAll(() => {
    jest.unmock('./index');
    consoleLogSpy.mockRestore();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(consoleLogSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
