import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    controllers: [LoginController],
    providers: [{
        provide: 'LoginServiceInterface',
        useClass: LoginService
    }],
})
export class LoginModule { }
