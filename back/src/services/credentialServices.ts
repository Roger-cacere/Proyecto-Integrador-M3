import { CredentialModel } from "../config/dataSource";
import { Credential } from "../entities/Credential";
import { validateCredentialsRepository } from "../repositories/CredentialRepository";
import { ICredentialDto } from "../dto/credentialDto";

export const createCredential = async(username:string, password:string):Promise<Credential> => {

    const newCredential = CredentialModel.create({ username, password })    
    await CredentialModel.save(newCredential);
    return newCredential;
}

export const validateUser = async(credentialData: ICredentialDto)=> {

    const userCredential = await validateCredentialsRepository.findCredentials(credentialData.username, credentialData.password);

    if(!userCredential) throw Error("No se encontró un usuario con esas credenciales.")
    else return userCredential;
}

