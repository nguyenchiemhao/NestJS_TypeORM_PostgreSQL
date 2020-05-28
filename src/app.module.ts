import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfiguration } from './configuration/typeorm.configuration';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfiguration), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
