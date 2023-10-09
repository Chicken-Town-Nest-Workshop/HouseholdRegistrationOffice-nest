import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {

    @ApiProperty({ description: '使用者名稱' })
    userName: string;

    @ApiProperty({ description: '使用者密碼' })
    password: string;
}