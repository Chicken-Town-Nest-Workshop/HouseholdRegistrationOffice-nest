import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { LoginCode, LoginDto, LoginStatusDto } from './dtos';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService, {
        provide: 'LoginRepositoryInterface',
        useValue: {
          findByUsername: jest.fn((username) => {
            if (username === 'Chicken')
              return {
                userId: '6ada84f9-c748-4863-aae6-de1d548b7108',
                passwordHash: '$2b$10$ZjJXVtcSOOaHFT23JyC8t.vocu4u.cqs5K2klfLmRltssANNqFLBW'
              };
            else
              throw Error('找不到使用者');
          })
        }
      }],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    // case1
    it('user name is Chicken need return login success', async () => {
      const loginDto = new LoginDto();
      loginDto.userName = 'Chicken';
      loginDto.password = 'test1212';

      const loginStatus = new LoginStatusDto();
      loginStatus.code = LoginCode.Success;
      loginStatus.msg = LoginCode.Success.toString();

      const actual = await service.login(loginDto);

      expect(actual).toStrictEqual(loginStatus);
      return;
    });

    // case2
    it('user name is Chicken but password no match need return login error', async () => {
      const loginDto = new LoginDto();
      loginDto.userName = 'Chicken';
      loginDto.password = 'test';

      const loginStatus = new LoginStatusDto();
      loginStatus.code = LoginCode.Error;
      loginStatus.msg = '帳號或密碼不正確';

      const actual = await service.login(loginDto);

      expect(actual).toStrictEqual(loginStatus);
      return;
    });

    // case3
    it('user name is Dog throw exception no found user', async () => {
      const loginDto = new LoginDto();
      loginDto.userName = 'Dog';
      loginDto.password = 'test1212';

      await expect(() =>
        service.login(loginDto),
      ).rejects
        .toThrowError('找不到使用者');

      return;
    });
  });
});
