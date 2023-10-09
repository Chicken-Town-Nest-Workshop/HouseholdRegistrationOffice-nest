import { LoginRepositoryInterface } from "./interfaces/login.repository.interface";

export class LoginRepository implements LoginRepositoryInterface {
    findByUsername(username: string): string {
        throw new Error("Method not implemented.");
    }

}
