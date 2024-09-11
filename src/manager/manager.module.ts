import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Manager } from '../entities/manager.entity';
import { LocalModule } from '../local/local.module';

@Module({
  imports: [TypeOrmModule.forFeature([Manager]),
  LocalModule
],
  providers: [ManagerService],
  controllers: [ManagerController],
  exports: [ManagerService],
})
export class ManagerModule {}
