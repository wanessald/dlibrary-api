import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUser: UserEntity = {
  id: 'uuid-1',
  name: 'Wanessa',
  email: 'wanessa@mail.com',
  passwordHash: 'hashed-password',
  isVerified: false,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
};

const mockRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user and return without passwordHash', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(mockUser);
      mockRepository.save.mockResolvedValue(mockUser);

      const result = await service.create({
        name: 'Wanessa',
        email: 'wanessa@email.com',
        password: 'senha123',
      });

      expect(result).not.toHaveProperty('passwordHash');
      expect(result.email).toBe('wanessa@mail.com');
    });

    it('should throw ConflictException if email already exists', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      await expect(
        service.create({
          name: 'Wanessa',
          email: 'wanessa@mail.com',
          password: 'senha123',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should return user without passwordHash', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne('uuid-1');

      expect(result.id).toBe('uuid-1');
      expect(result).not.toHaveProperty('passwordHash');
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('uuid-999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove user and return void', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.remove.mockResolvedValue(undefined);

      await expect(service.remove('uuid-1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('uuid-999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
