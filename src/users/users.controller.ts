import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

@Get()
getAll() {
    return this.usersService.getAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
}

@Post()
createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUsers(createUserDto);
}

@Put(':id')
updateUsers(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUsers(id, updateUserDto);
}

@Delete(':id')
removeUsers(@Param('id') id: string) {
    return this.usersService.removeUsers(id);
    }
}
