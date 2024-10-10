import { NextFunction, Request, Response } from "express";

const validateAppointment = (req: Request, res: Response, next: NextFunction) => {

    const { date, time, userId } = req.body;

    if(!date || !time || !userId ){
        res.status(400).json({
            error: "Faltan datos."
        });
        
    }else{
        next();
        
    }
}

export default validateAppointment;