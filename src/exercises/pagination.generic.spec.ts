import { paginate } from './pagination.generic';

describe('paginate', () => {
  const books = ['Livro 1', 'Livro 2', 'Livro 3', 'Livro 4', 'Livro 5'];

  it('should return correct page slice', () => {
    const result = paginate(books, 1, 2);
    expect(result.data).toEqual(['Livro 1', 'Livro 2']);
  });

  it('should calculate totalPages correctly', () => {
    const result = paginate(books, 1, 2);
    expect(result.totalPages).toBe(3);
  });

  it('should return last page with remaining items', () => {
    const result = paginate(books, 3, 2);
    expect(result.data).toEqual(['Livro 5']);
  });

  it('should work with any type — numbers', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = paginate(numbers, 2, 2);
    expect(result.data).toEqual([3, 4]);
  });
});
