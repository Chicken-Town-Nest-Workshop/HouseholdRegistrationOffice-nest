import { Post, Controller, Body } from '@nestjs/common';
import { LoginDto, LoginStatusDto } from './dtos';

@Controller('login')
export class LoginController {


    @Post()
    async login(@Body() data: LoginDto): Promise<LoginStatusDto> {
        return await new Promise(() => { return new LoginStatusDto(); });
    }
}
