import { Post, Controller, Body, Get, Render } from '@nestjs/common';
import { LoginCode, LoginDto, LoginStatusDto } from './dtos';

@Controller('login')
export class LoginController {

    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' };
    }

    @Post()
    async login(@Body() data: LoginDto): Promise<LoginStatusDto> {
        const loginDto = new LoginStatusDto();
        loginDto.code = LoginCode.Error;
        loginDto.msg = '請輸入正確的帳號或密碼';
        return await Promise.resolve(loginDto);
    }
}
