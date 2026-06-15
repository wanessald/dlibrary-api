import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

export interface IUserService {
  create(dto: CreateUserDto): Promise<UserResponseDto>;
  findAll(): Promise<UserResponseDto[]>;
  findOne(id: string): Promise<UserResponseDto>;
  update(id: string, dto: UpdateUserDto): Promise<UserResponseDto>;
  remove(id: string): Promise<void>;
}
