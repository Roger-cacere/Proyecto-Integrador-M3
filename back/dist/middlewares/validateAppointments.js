"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateAppointment = (req, res, next) => {
    const { date, time, userId } = req.body;
    if (!date || !time || !userId) {
        res.status(400).json({
            error: "Faltan datos."
        });
    }
    else {
        next();
    }
};
exports.default = validateAppointment;
