import { UserEntity } from "src/entities/user.entity";
import { LoginRepositoryInterface } from "./interfaces/login.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserInfoDto } from "./dtos";

export class LoginRepository implements LoginRepositoryInterface {
    private readonly _table: string = 'user_table';
    private readonly _schema: string[] = [
        'user_id',
        'inhabitant_id',
        'username',
        'password_hash',
        'email',
        'status'
    ]

    constructor(
        @InjectRepository(UserEntity)
        private readonly userDto: Repository<UserEntity>
    ) { }



    async findByUsername(username: string): Promise<UserInfoDto> {
        const result = await this.userDto.findOne({
            where: {
                username: username,
            },
        });

        return {
            userId: result.user_id,
            passwordHash: result.password_hash
        };
    }

}
