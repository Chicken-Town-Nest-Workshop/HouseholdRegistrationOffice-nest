import { ApiProperty } from "@nestjs/swagger";
import { LoginCode } from "./login-code.enum";

export class LoginStatusDto {

    @ApiProperty({
        description: '狀態碼',
        enum: LoginCode
    })
    code: string;

    @ApiProperty({
        description: '錯誤訊息',
        default: LoginCode.Success.toString()
    })
    msg: string;
}

