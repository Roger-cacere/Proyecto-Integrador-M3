import { AppDataSource, UserModel } from "../config/dataSource";
import { User } from "../entities/User";
import IUserDto from "../dto/userDto";
import { createCredential, validateUser } from "./credentialServices";
import { Credential } from "../entities/Credential";
import { ICredentialDto } from "../dto/credentialDto";

//Devuelve el arreglo de los usuarios
export const getAllUsers = async(): Promise<User[]> => {
    return await UserModel.find({
        relations: {
            appointments: true
        }
    }); 
};

//Devuelve el elemento por id
export const getUserElementForId = async(id: number): Promise<User | null>=> {
    const results = await UserModel.findOne({
        where: { id },
        relations: { appointments: true }
    })
    return results;
}

//Crea el usuario con su correspondiente par de credenciales
export const createNewUser = async(userData: IUserDto): Promise<User> => {

    const { name, email, birthdate, nDni, username, password } = userData;
    
    const newUser = await UserModel.create({ name, email, birthdate, nDni });
    const newCredential = await createCredential(username, password)
    newUser.credentials = newCredential;

    await UserModel.save(newUser);
    
    return newUser;
}

export const userLogin = async(credentialData: ICredentialDto) => {

        const credentials: Credential =  await validateUser(credentialData);

        const {id} = credentials

        const userCredentials = await UserModel.findOneBy({ id })
        
        if(userCredentials){
            return {login: true, userCredentials}
        }else{
            return null
        }
};
