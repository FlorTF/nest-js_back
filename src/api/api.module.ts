import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensedia_Data_Queue } from '../sensedia_data_queue/sensedia_data_queue.entity';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sensedia_Data_Queue])],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}