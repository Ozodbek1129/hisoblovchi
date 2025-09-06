import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Malumot } from './malumotlar/entities/malumotlar.model';
import { MalumotlarModule } from './malumotlar/malumotlar.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        models: [Malumot, User],
        autoLoadModels: true,
        synchronize: true,
        // force: true
      }),
    }),
    MalumotlarModule,
    UsersModule
  ],
})
export class AppModule {}
