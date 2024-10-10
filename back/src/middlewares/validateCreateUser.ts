import { NextFunction, Request, Response } from "express";

const validateCreateUsers = (req: Request, res: Response, next: NextFunction) => {

    const { name, email, birthdate, nDni, username, password } = req.body;

    if(!name || !email || !birthdate || !nDni || !username || !password){
        res.status(400).json({
            error: "Faltan datos."
        });
    }else{
        next();
    }
}

export default validateCreateUsers;