// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts';
  const expectedUrl = 'https://jsonplaceholder.typicode.com';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: null });

    await throttledGetDataFromApi(relativePath);

    expect(axiosSpy).toHaveBeenCalledWith({ baseURL: expectedUrl });
  });

  test('should perform request to correct provided url', async () => {
    const responseData = { data: null };
    const axiosGetSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce(responseData);

    await throttledGetDataFromApi(relativePath);

    jest.runOnlyPendingTimers();

    expect(axiosGetSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const expectedId = 1;
    const responseData = [{ id: expectedId }];
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: responseData });

    const result = await throttledGetDataFromApi('/posts');

    expect(result[0].id).toEqual(expectedId);
  });
});
