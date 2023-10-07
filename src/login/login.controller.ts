import { Post, Controller, Body, Get, Render } from '@nestjs/common';
import { LoginDto, LoginStatusDto } from './dtos';

@Controller('login')
export class LoginController {

    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' };
    }

    @Post()
    async login(@Body() data: LoginDto): Promise<LoginStatusDto> {
        return await new Promise(() => { return new LoginStatusDto(); });
    }
}
