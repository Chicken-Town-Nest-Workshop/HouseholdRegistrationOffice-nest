import { LoginDto, LoginStatusDto } from "../dtos";

export interface LoginServiceInterface {
    /**
     * 登入
     * @param data 登入狀態
     */
    login(data: LoginDto): Promise<LoginStatusDto>;
}