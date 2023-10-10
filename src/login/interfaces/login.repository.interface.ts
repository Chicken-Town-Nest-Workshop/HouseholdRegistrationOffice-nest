import { TokenEntity } from "src/entities/token.entity";
import { UserInfoDto } from "../dtos";


export interface LoginRepositoryInterface {
    /**
     * 使用者名稱查詢密碼
     * 
     * @param username 使用者名稱
     */
    findByUsername(username: string): Promise<UserInfoDto>;

    /**
     * 存入JWT並回傳一次性token
     * @param jwt 
     */
    setToken(data: TokenEntity): Promise<string>;
}
