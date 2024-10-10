import { User } from "../entities/User";

export interface ILogin {
    login: boolean,
    user?: User
}