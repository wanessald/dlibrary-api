export abstract class BaseUser {
  constructor(
    public readonly id: string,
    public readonly email: string,
  ) {}

  registerReading(bookId: string): string {
    return `${this.email} registrou leitura do livro ${bookId}`;
  }

  abstract getRole(): string;

  describe(): string {
    return `[${this.getRole()}] ${this.email}`;
  }
}

export class RegularUser extends BaseUser {
  getRole(): string {
    return 'USER';
  }
}

export class Moderator extends BaseUser {
  getRole(): string {
    return 'MODERATOR';
  }

  moderateComment(commentId: string): string {
    return `${this.email} moderou o comentário ${commentId}`;
  }
}

export class Admin extends Moderator {
  getRole(): string {
    return 'ADMIN';
  }

  manageUsers(): string {
    return `${this.email} acessou o painel de usuários`;
  }
}
