import { Post, Controller, Body, Get, Render, Inject } from '@nestjs/common';
import { LoginCode, LoginDto, LoginStatusDto } from './dtos';
import { LoginServiceInterface } from './interfaces/login.service.interface';

@Controller('login')
export class LoginController {

    constructor(
        @Inject('LoginServiceInterface')
        private loginService: LoginServiceInterface
    ) { }

    @Get()
    @Render('index')
    root() {
        return;
    }

    @Post()
    async login(@Body() data: LoginDto): Promise<LoginStatusDto> {
        return await this.loginService.login(data);
    }
}
