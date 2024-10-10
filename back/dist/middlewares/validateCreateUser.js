"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateCreateUsers = (req, res, next) => {
    const { name, email, birthdate, nDni, username, password } = req.body;
    if (!name || !email || !birthdate || !nDni || !username || !password) {
        res.status(400).json({
            error: "Faltan datos."
        });
    }
    else {
        next();
    }
};
exports.default = validateCreateUsers;
