import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocalDto } from 'src/dtos/create-local.dto';
import { UpdateLocalDto } from 'src/dtos/update-local.dto';
import { Local } from 'src/entities/local.entity';
import { ManagerService } from 'src/manager/manager.service';
import { Repository } from 'typeorm';

@Injectable()
export class LocalService {
    constructor(
    @InjectRepository(Local) 
    private localRepository: Repository<Local>,
    private managerService: ManagerService,
    ) {}

    getAll(): Promise<Local[]> {
        return this.localRepository.find({ relations: ['feedbacks', 'manager'] });
    }

    async findOne(id: string): Promise<Local> {
        const local = await this.localRepository.findOne({ 
            where: { id },
            relations: ['feedbacks', 'manager'],
        });
            if (!local) {
                throw new NotFoundException(`Local not found ${id}`)
            }
            return local;
    };

    async createLocal(createLocalDto: CreateLocalDto): Promise<Local> {
        const manager = createLocalDto.managerId ? await this.managerService.findOne(createLocalDto.managerId) : null;

        const local = this.localRepository.create({ 
            name: createLocalDto.name,
            address: createLocalDto.address,
            status: createLocalDto.status ?? 'Activo',
            createdAt: createLocalDto.createdAt,
            manager 
        });
        return this.localRepository.save(local);
    }

    async updateLocal(id: string, updateLocalDto: UpdateLocalDto): Promise<Local> {
        const local = await this.findOne(id)
        if (updateLocalDto.managerId) {
            local.manager = await this.managerService.findOne(updateLocalDto.managerId);
        }
        Object.assign(local, updateLocalDto);
        return this.localRepository.save(local);
    }

    async removeLocal(id: string): Promise<void> {
        const local = await this.findOne(id);
        await this.localRepository.remove(local);
    }
}
