import { UserEntity } from "src/entities/user.entity";
import { LoginRepositoryInterface } from "./interfaces/login.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UserInfoDto } from "./dtos";
import { TokenEntity } from "src/entities/token.entity";

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
    private readonly _tokenTable: string = 'token_table';
    private readonly _tokenSchema: string[] = [
        'token_id',
        'user_id',
        'token_type',
        'token_value',
        'expiration_time',
        'one_time_token',
        'one_time_token_disable'
    ]

    constructor(
        private readonly dataSource: DataSource,
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

    async setToken(data: TokenEntity): Promise<string> {
        const queryBuilder = this.dataSource
            .getRepository(TokenEntity)
            .createQueryBuilder(this._tokenTable);

        const result = await queryBuilder
            .insert()
            .into(TokenEntity)
            .values([data])
            .returning(this._tokenSchema)
            .updateEntity(true)
            .execute();

        const model = result.raw[0] as TokenEntity;
        return model.one_time_token;
    }
}
