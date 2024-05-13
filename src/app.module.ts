//import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common/decorators';
import { MerchantModule } from './merchant/merchant.module';
import { RoleModule } from './role/role.module';
import { SensediaDataQueueModule } from './sensedia_data_queue/sensedia_data_queue.module';
import { UserModule } from './user/user.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'toor',
      database: 'dboard',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    MerchantModule,
    RoleModule,
    SensediaDataQueueModule,
    UserModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
