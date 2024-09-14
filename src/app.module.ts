import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm';
import { FeedbackModule } from './feedback/feedback.module';
import { UsersModule } from './users/users.module';
import { ManagerModule } from './manager/manager.module';
import { LocalModule } from './local/local.module';
import { FeedbackTypeModule } from './feedbacktype/feedback-type.module';
import { DestinationTypeModule } from './destinationfeedback/destination-feedback.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
  }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')
    }),
    FeedbackModule,
    UsersModule,
    ManagerModule,
    LocalModule,
    FeedbackTypeModule,
    DestinationTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
