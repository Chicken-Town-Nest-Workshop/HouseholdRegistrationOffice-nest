import { Injectable } from '@nestjs/common';
import { LoginServiceInterface } from './interfaces/login.service.interface';
import { LoginDto, LoginStatusDto } from './dtos';

@Injectable()
export class LoginService implements LoginServiceInterface {
    login(data: LoginDto): Promise<LoginStatusDto> {



        throw new Error('Method not implemented.');
    }
}
