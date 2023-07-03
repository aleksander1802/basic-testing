// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const expectedLinkedList = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    };

    const generatedLinkedList = generateLinkedList(values);

    expect(generatedLinkedList).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const values = [1, 2, 3];

    const generatedLinkedList = generateLinkedList(values);

    expect(generatedLinkedList).toMatchSnapshot();
  });
});
