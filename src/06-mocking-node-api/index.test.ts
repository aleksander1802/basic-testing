// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and interval', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './index.ts';
    const joinSpy = jest.spyOn(path, 'join');
    const readFileMock = jest.fn(() => Promise.resolve('file content'));

    jest.mock('fs/promises', () => ({
      readFile: readFileMock,
    }));

    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const existsSync = jest.fn().mockReturnValue(false);
    jest.doMock('fs/promises', () => ({ existsSync }));

    const result = await readFileAsynchronously('nonexistent.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './index.ts';
    const fileContent = 'file content';
    const joinSpy = jest.spyOn(path, 'join');
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);

    const result = await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), pathToFile);
    expect(fs.existsSync).toHaveBeenCalledWith(expect.any(String));
    expect(fs.promises.readFile).toHaveBeenCalled();
    expect(result).toBe(fileContent);
  });
});
