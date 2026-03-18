import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    try {
      const result = await this.usersRepository.save(user);
      this.logger.log(`User created with id: ${result.id}`);

      return result;
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      throw new BadRequestException('Failed to create user');
    }
  }

  async findUserbyEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        this.logger.warn(`User not found with email: ${email}`);
        throw new BadRequestException('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error('Failed to find user', error.stack);
      throw new BadRequestException('Failed to find user');
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        this.logger.warn(`User not found with id: ${id}`);
        throw new BadRequestException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error('Failed to find user', error.stack);
      throw new BadRequestException('Failed to find user');
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find();
      this.logger.log(`Retrieved ${users.length} users`);
      return users;
    } catch (error) {
      this.logger.error('Failed to retrieve users', error.stack);
      throw new BadRequestException('Failed to retrieve users');
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        this.logger.warn(`User not found with id: ${id}`);
        throw new BadRequestException('User not found');
      }
      const updatedUser = this.usersRepository.merge(user, dto);
      const result = await this.usersRepository.save(updatedUser);
      this.logger.log(`User updated with id: ${result.id}`);

      return result;
    } catch (error) {
      this.logger.error('Failed to update user', error.stack);
      throw new BadRequestException('Failed to update user');
    }
  }

  async delete(id: number) {
    try {
      const result = await this.usersRepository.delete(id);
      if (result.affected === 0) {
        this.logger.warn(`User not found with id: ${id}`);
        throw new BadRequestException('User not found');
      }
    } catch (error) {
      this.logger.error('Failed to delete user', error.stack);
      throw new BadRequestException('Failed to delete user');
    }
  }
}
