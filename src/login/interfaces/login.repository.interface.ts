import { UserDto } from "../dtos/"

export interface LoginRepositoryInterface {
    // 根据用户名查找用户
    findByUsername(username: string): Promise<UserDto>;
}
