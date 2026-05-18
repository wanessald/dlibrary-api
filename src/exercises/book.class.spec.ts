import { Book } from './book.class';

describe('Book', () => {
  let book: Book;

  beforeEach(() => {
    book = new Book('1', 'O Hobbit', new Date(), 310);
  });

  it('should return the title via getTitle()', () => {
    expect(book.getTitle()).toBe('O Hobbit');
  });

  it('should update the title via updateTitle()', () => {
    book.updateTitle('O Senhor dos Anéis');
    expect(book.getTitle()).toBe('O Senhor dos Anéis');
  });

  it('should not allow direct access to private title', () => {
    // @ts-expect-error — testando que o compilador bloqueia acesso privado
    expect(() => book.title).toBeTruthy();
  });

  it('should not allow reassigning readonly id', () => {
    // @ts-expect-error — testando que o compilador bloqueia reatribuição
    expect(() => {
      book.id = '2';
    }).toBeTruthy();
  });
});
