import { Post, Controller, Body, Get, Render, Inject, Redirect, Res } from '@nestjs/common';
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
    @Redirect() // 在括號內可以設置重定向的配置
    async login(@Body() data: LoginDto) {
        const loginStatus = await this.loginService.login(data);

        if (loginStatus.code === LoginCode.Success) {
            // 登入成功
            const targetUrl = this.generateTargetUrl(loginStatus.msg); // 根據用戶信息生成目標 URL
            return { url: targetUrl }; // 使用 @Redirect 裝飾器返回重定向配置
        } else {
            // 登入失敗，留在當前頁面
            // 可以執行其他操作，例如顯示錯誤消息
            return { url: '/login', statusCode: 302 }; // 這僅作示例，您可以自行決定如何處理失敗情況
        }
    }

    private generateTargetUrl(user: string): string {
        // 在這裡，您可以根據 user 的角色或權限來生成目標 URL
        // 例如，如果有 ADMIN 角色，可以重定向到管理頁面；如果有 USER 角色，可以重定向到用戶首頁，等等
        // 請根據您的需求自定義邏輯
        return 'http://localhost:3052/api?id=1212'; // 假設重定向到管理頁面
        // if (user.roles.includes('ADMIN')) {
        //     return 'http://localhost:3052/admin'; // 假設重定向到管理頁面
        // } else {
        //     return 'http://localhost:3052/user'; // 假設重定向到用戶首頁
        // }
    }
}
