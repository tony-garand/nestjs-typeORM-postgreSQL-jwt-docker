import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads'
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
