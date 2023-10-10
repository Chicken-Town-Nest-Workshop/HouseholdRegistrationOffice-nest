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

    /**
     * 使用者認證
     * @param data 
     * @returns 
     */
    private async userAuthentication(data: LoginDto): Promise<LoginStatusDto> {
        const userInfo = await this.loginRepo.findByUsername(data.userName);
        const isMatch = await bcrypt.compare(data.password, userInfo.passwordHash);

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

    async login(data: LoginDto): Promise<LoginStatusDto> {

        // 1.認證使用者
        const authentication = await this.userAuthentication(data);

        // 2.生成JWT與一次性token寫入DB

        // 3.回傳一次性token

        return authentication;
    }
}
