import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoginRepository } from './login.repository';

@Module({
    controllers: [LoginController],
    providers: [
        {
            provide: 'LoginServiceInterface',
            useClass: LoginService
        },
        {
            provide: 'LoginRepositoryInterface',
            useClass: LoginRepository
        },
    ],
})
export class LoginModule { }
