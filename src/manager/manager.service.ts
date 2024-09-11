import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManagerDto } from 'src/dtos/create-manager.dto';
import { UpdateManagerDto } from 'src/dtos/update-manager.dto';
import { Manager } from 'src/entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
    constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
    ) {}

    getAll(): Promise<Manager[]> {
    return this.managerRepository.find({relations: ['local'] });
    }

    async findOne(id: string): Promise<Manager> {
    const manager = await this.managerRepository.findOne({ 
            where: { id },
            relations: ['local'],
        });
        if (!manager) {
            throw new NotFoundException(`Manager not found ${id}`);
        }
        return manager;
        
    }

    createManager(createManagerDto: CreateManagerDto): Promise<Manager> {
        const manager = this.managerRepository.create(createManagerDto);
        return this.managerRepository.save(manager);
    }

    async updateManager(id: string, updateManagerDto: UpdateManagerDto): Promise<Manager> {
        const manager = await this.findOne(id);
        Object.assign(manager, updateManagerDto);
        return this.managerRepository.save(manager);
    }

    async removeManager(id: string): Promise<void> {
        const user = await this.findOne(id)
        await this.managerRepository.remove(user);
    }
}
