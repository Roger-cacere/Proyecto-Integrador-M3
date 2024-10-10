"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = (req, res, next) => {
    const { token } = req.headers;
    if (token === "usuario existente")
        next();
    else
        res.status(400).json({ message: "El usuario no existe" });
};
exports.default = auth;
