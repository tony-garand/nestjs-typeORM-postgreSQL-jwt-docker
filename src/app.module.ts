import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as typeOrmConfig from './typeorm.config';
import { UserModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule, 
    UserModule, SettingsModule
  ]
})
export class AppModule {}
