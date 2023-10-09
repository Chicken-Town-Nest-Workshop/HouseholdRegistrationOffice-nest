import { Inject, Injectable } from '@nestjs/common';
import { LoginServiceInterface } from './interfaces/login.service.interface';
import { LoginCode, LoginDto, LoginStatusDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { LoginRepositoryInterface } from './interfaces/login.repository.interface';

@Injectable()
export class LoginService implements LoginServiceInterface {
    constructor(
        @Inject('LoginRepositoryInterface')
        private loginRepo: LoginRepositoryInterface
    ) { }

    async login(data: LoginDto): Promise<LoginStatusDto> {

        const userHash = await this.loginRepo.findByUsername(data.userName);
        const isMatch = await bcrypt.compare(data.password, userHash);

        const loginStatus = new LoginStatusDto();
        if (isMatch) {
            loginStatus.code = LoginCode.Success;
            loginStatus.msg = LoginCode.Success.toString();
            return loginStatus;
        } else {
            loginStatus.code = LoginCode.Error;
            loginStatus.msg = '帳號或密碼不正確';
            return loginStatus;
        }
    }
}
