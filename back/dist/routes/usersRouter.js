"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const validateCreateUser_1 = __importDefault(require("../middlewares/validateCreateUser"));
const router = (0, express_1.Router)();
router.get("/users", usersController_1.getUsers);
router.get("/users/:id", usersController_1.getUserById);
router.post("/users/register", validateCreateUser_1.default, usersController_1.userRegister);
router.post("/users/login", usersController_1.userLoginController);
exports.default = router;
