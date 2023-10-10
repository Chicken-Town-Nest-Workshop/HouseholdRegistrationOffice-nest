import { Inject, Injectable } from '@nestjs/common';
import { LoginServiceInterface } from './interfaces/login.service.interface';
import { AuthenticationDto, LoginCode, LoginDto, LoginStatusDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { LoginRepositoryInterface } from './interfaces/login.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from 'src/entities/token.entity';
import { ClockServiceInterface } from 'src/clock/clock.service.interface';

@Injectable()
export class LoginService implements LoginServiceInterface {
    constructor(
        @Inject('LoginRepositoryInterface')
        private loginRepo: LoginRepositoryInterface,
        private jwtService: JwtService,
        @Inject('ClockServiceInterface')
        private clockService: ClockServiceInterface,
    ) { }

    /**
     * 使用者認證
     * @param data 
     * @returns 
     */
    private async userAuthentication(data: LoginDto): Promise<AuthenticationDto> {
        const userInfo = await this.loginRepo.findByUsername(data.userName);
        const isMatch = await bcrypt.compare(data.password, userInfo.passwordHash);

        const authenticationDto = new AuthenticationDto();
        if (isMatch) {
            authenticationDto.userId = userInfo.userId;
            authenticationDto.userName = data.userName;
            return authenticationDto;
        } else {
            throw new Error('帳號或密碼不正確');
        }
    }

    /**
     * 生成JWT
     * 
     * @param userId 
     * @param userName 
     * @returns 
     */
    private async generateJWT(userId: string, userName: string): Promise<string> {
        const payload = { sub: userId, username: userName };
        return await this.jwtService.signAsync(payload);
    }
    /**
     * 存入JWT，並回傳一次性token
     * 
     * @param userId 
     * @param jwt 
     */
    private async setToken(userId: string, jwt: string): Promise<string> {
        const tokenEntity = new TokenEntity();

        tokenEntity.token_type = 'JWT';
        tokenEntity.token_value = jwt;
        tokenEntity.one_time_token_disable = false;

        const user = await this.loginRepo.findByUserId(userId);
        tokenEntity.user = user;

        const today = new Date(this.clockService.getDateTime());
        const tomorrow = new Date(this.clockService.getDateTime());
        tomorrow.setDate(today.getDate() + 1);
        tokenEntity.expiration_time = tomorrow;

        return await this.loginRepo.setToken(tokenEntity);
    }

    async login(data: LoginDto): Promise<LoginStatusDto> {

        // 1.認證使用者
        const authentication = await this.userAuthentication(data);

        // 2.生成JWT與一次性token寫入DB
        const jwt = await this.generateJWT(authentication.userId, authentication.userName);

        const oneTimeToken = await this.setToken(authentication.userId, jwt);

        // 3.回傳一次性token
        const loginStatus = new LoginStatusDto();
        loginStatus.code = LoginCode.Success;
        loginStatus.msg = oneTimeToken;

        return loginStatus;
    }
}
