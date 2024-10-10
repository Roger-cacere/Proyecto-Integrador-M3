import { Credential } from "../entities/Credential";
import { AppDataSource } from "../config/dataSource";

export const validateCredentialsRepository = AppDataSource.getRepository(Credential).extend({
    findCredentials: async function (username: string, password: string): Promise<Credential> {
        const credential: Credential | null = await this.findOneBy({username,  password})

        if(credential) return credential;
        else throw new Error("credenciales inválidas.")
    }
})

