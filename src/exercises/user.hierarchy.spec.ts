import { RegularUser, Moderator, Admin, BaseUser } from './user.hierarchy';

describe('User hierarchy', () => {
  const regular = new RegularUser('1', 'user@email.com');
  const moderator = new Moderator('2', 'mod@email.com');
  const admin = new Admin('3', 'admin@email.com');

  it('all users can register readings', () => {
    expect(regular.registerReading('book-1')).toContain('registrou leitura');
    expect(moderator.registerReading('book-1')).toContain('registrou leitura');
    expect(admin.registerReading('book-1')).toContain('registrou leitura');
  });

  it('each user returns correct role', () => {
    expect(regular.getRole()).toBe('USER');
    expect(moderator.getRole()).toBe('MODERATOR');
    expect(admin.getRole()).toBe('ADMIN');
  });

  it('describe() uses getRole() polymorphically', () => {
    expect(regular.describe()).toBe('[USER] user@email.com');
    expect(moderator.describe()).toBe('[MODERATOR] mod@email.com');
    expect(admin.describe()).toBe('[ADMIN] admin@email.com');
  });

  it('moderator and admin can moderate', () => {
    expect(moderator.moderateComment('c-1')).toContain('moderou');
    expect(admin.moderateComment('c-1')).toContain('moderou');
  });

  it('only admin can manage users', () => {
    expect(admin.manageUsers()).toContain('painel de usuários');
    // @ts-expect-error — RegularUser não tem manageUsers
    expect(() => regular.manageUsers).toBeTruthy();
  });

  it('all users are instances of BaseUser', () => {
    expect(regular).toBeInstanceOf(BaseUser);
    expect(moderator).toBeInstanceOf(BaseUser);
    expect(admin).toBeInstanceOf(BaseUser);
  });
});
