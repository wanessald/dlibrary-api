import { IBook } from './book.interface';

export class Book implements IBook {
  constructor(
    public readonly id: string,
    private title: string,
    public readonly createdAt: Date,
    private pageCount: number,
  ) {}

  getTitle(): string {
    return this.title;
  }

  updateTitle(newTitle: string): void {
    this.title = newTitle;
  }

  getPageCount(): number {
    return this.pageCount;
  }
}
