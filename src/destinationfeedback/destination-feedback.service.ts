import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDestinationTypeDto } from 'src/dtos/create-destination-type.dto';
import { UpdateDestinationTypeDto } from 'src/dtos/update-destination-type.dto';
import { DestinationType } from 'src/entities/destination-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DestinationTypeService {
  constructor(
    @InjectRepository(DestinationType) private destinationTypeRepository: Repository<DestinationType>,
    ) {}

    getAll(): Promise<DestinationType[]> {
        return this.destinationTypeRepository.find();
    }

    async findOne(id: string): Promise<DestinationType> {
        const destination = await this.destinationTypeRepository.findOne({ where: { id } })
            if (!destination) {
                throw new NotFoundException(`Destination not found ${id} `)
            }
            return destination;
    }

    createDestination(createDestinationTypeDto: CreateDestinationTypeDto): Promise<DestinationType> {
        const destination = this.destinationTypeRepository.create(createDestinationTypeDto);
        return this.destinationTypeRepository.save(destination);
    }

    async updateDestination(id: string, updateDestinationTypeDto: UpdateDestinationTypeDto): Promise<DestinationType> {
        const destination = await this.findOne(id);
        Object.assign(destination, updateDestinationTypeDto)
        return this.destinationTypeRepository.save(destination);
    }

    async removeDestination(id: string): Promise<void> {
        const destination = await this.findOne(id);
        await this.destinationTypeRepository.remove(destination);
    }
}
