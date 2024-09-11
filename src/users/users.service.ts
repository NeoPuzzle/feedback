import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(Users) 
    private usersRepository: Repository<Users>,

    ) {}

    getAll(): Promise<Users[]> {
        return this.usersRepository.find({ relations: ['feedbacks'] });
    }

    async findOne(id: string): Promise<Users> {
        const user = await this.usersRepository.findOne({ 
            where: { id },
            relations: ['feedbacks'],
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    createUsers(createUserDto: CreateUserDto): Promise<Users> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(createUserDto);
    }

    async updateUsers(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
        const user = await this.findOne(id);
        Object.assign(id, updateUserDto);
        return this.usersRepository.save(user);
    }

    async removeUsers(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.usersRepository.delete(user);
    }
}
