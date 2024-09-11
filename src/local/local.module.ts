import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalService } from './local.service';
import { LocalController } from './local.controller';
import { Local } from '../entities/local.entity';
import { ManagerService } from 'src/manager/manager.service';
import { Manager } from 'src/entities/manager.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Local, Manager])],
    providers: [LocalService, ManagerService],
    controllers: [LocalController],
    exports: [LocalService],
})
export class LocalModule {}
