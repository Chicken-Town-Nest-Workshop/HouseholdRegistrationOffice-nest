import { TokenEntity } from "src/entities/token.entity";
import { UserInfoDto } from "../dtos";
import { UserEntity } from "src/entities/user.entity";


export interface LoginRepositoryInterface {
    /**
     * 使用者名稱查詢密碼
     * 
     * @param username 使用者名稱
     */
    findByUsername(username: string): Promise<UserInfoDto>;

    /**
     * 使用id查出USER
     * 
     * @param userId user id
     */
    findByUserId(userId: string): Promise<UserEntity>;

    /**
     * 存入JWT並回傳一次性token
     * 
     * @param jwt 
     */
    setToken(data: TokenEntity): Promise<string>;
}
