import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DestinationTypeService } from './destination-feedback.service';
import { DestinationType } from 'src/entities/destination-type.entity';
import { CreateDestinationTypeDto } from 'src/dtos/create-destination-type.dto';
import { UpdateDestinationTypeDto } from 'src/dtos/update-destination-type.dto';

@Controller('destination-type')
export class DestinationTypeController {
    constructor(private readonly destinationTypeService: DestinationTypeService) {}

    @Get()
    findAll() {
        return this.destinationTypeService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.destinationTypeService.findOne(id);
    }

    @Post()
    createDestination(@Body() createDestinationTypeDto: CreateDestinationTypeDto) {
        return this.destinationTypeService.createDestination(createDestinationTypeDto);
    }

    @Put(':id')
    updateDestination(@Param('id') id: string, @Body() updateDestinationTypeDto: UpdateDestinationTypeDto) {
        return this.destinationTypeService.updateDestination(id, updateDestinationTypeDto);
    }

    @Delete(':id')
    removeDestination(@Param('id') id: string) {
        return this.destinationTypeService.removeDestination(id);
    }
}
