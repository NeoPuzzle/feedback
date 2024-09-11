import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LocalService } from './local.service';
import { CreateLocalDto } from 'src/dtos/create-local.dto';
import { UpdateLocalDto } from 'src/dtos/update-local.dto';

@Controller('local')
export class LocalController {
    constructor(private readonly localService: LocalService) {}

    @Get()
    findAll() {
        return this.localService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.localService.findOne(id);
    }

    @Post()
    async createLocal(@Body() createLocalDto: CreateLocalDto) {
        return this.localService.createLocal(createLocalDto);
    }

    @Put(':id')
    updateLocal(@Param('id') id: string, @Body() updateLocalDto: UpdateLocalDto) {
        return this.localService.updateLocal(id, updateLocalDto);
    }

    @Delete(':id')
    removeLocal(@Param('id') id: string) {
        return this.localService.removeLocal(id);
    }
}
