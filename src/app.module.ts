import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './train/train.entity';
import { TrainModule } from './train/train.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '5q9bsp2ks',
      database: 'train',
      entities: [Train, User],
      synchronize: true,
    }),
    TrainModule,
    AuthModule,
  ],
})
export class AppModule {}
