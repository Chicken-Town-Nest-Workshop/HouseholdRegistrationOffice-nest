import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoginRepository } from './login.repository';
import { EntitiesModule } from 'src/entities/entities.module';

@Module({
    imports: [EntitiesModule],
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
