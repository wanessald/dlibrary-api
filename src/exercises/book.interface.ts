export interface IBook {
  id: string;
  title: string;
  pageCount: number;
  createdAt: Date;
  getTitle(): string;
}

export type BookStatus = 'reading' | 'finished' | 'wishlist';

export type BookWithStatus = IBook & { status: BookStatus };
