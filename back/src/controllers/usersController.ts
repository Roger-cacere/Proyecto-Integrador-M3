import { Request, Response } from "express";
import { getAllUsers, getUserElementForId, createNewUser, userLogin} from "../services/userServices";
import { User } from "../entities/User";

export const getUsers = async(req: Request, res: Response) => {
    const users: User[] = await getAllUsers();
    res.status(200).json(users)
}

export const getUserById = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    
    try {
        const userById = await getUserElementForId(id);

        if(userById){
            res.status(200).json(userById);
        }else{
            res.status(404).json({message: `El usuario no fue encontrado.`})
        }
    } catch (error) {
        res.status(500).json({message: "Error interno del servidor"})
    }
}

export const userRegister = async(req: Request, res: Response) => {
    const { name, email, birthdate, nDni, username, password } = req.body;
    const newUserCreated = await createNewUser({name, email, birthdate, nDni, username, password});
    res.status(201).json(newUserCreated);
}


export const userLoginController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "El nombre de usuario y la contraseña son requeridos" });
        }

        const userLoginResult = await userLogin({username, password});

        if (!userLoginResult) {
            res.status(400).json({ message: "Nombre de Usuario o Contraseña inválidos" });
        } else {
            res.status(200).json(userLoginResult)
        }
    } catch (error) {
        if(error instanceof Error){
            if (error.message === "credenciales inválidas.") {
                return res.status(400).json({ message: "Nombre de Usuario o Contraseña inválidos" });
            } else {
                console.error("Error en userLoginController:", error);
                return res.status(500).json({ message: "Error interno del servidor" });
            }
        }
    }
};