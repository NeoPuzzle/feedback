import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from 'src/dtos/create-manager.dto';
import { UpdateManagerDto } from 'src/dtos/update-manager.dto';

@Controller('manager')
export class ManagerController {
    constructor(private readonly managerService: ManagerService) {}

    @Get()
    findAll() {
        return this.managerService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.managerService.findOne(id);
    }

    @Post()
    createManager(@Body() createManagerDto: CreateManagerDto) {
        return this.managerService.createManager(createManagerDto);
    }

    @Put(':id')
    updateManager(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
        return this.managerService.updateManager(id, updateManagerDto);
    }

    @Delete(':id')
    removeManager(@Param('id') id: string) {
        return this.managerService.removeManager(id);
    }
}
