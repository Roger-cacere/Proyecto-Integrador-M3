import { Router } from "express";
import { getUsers, getUserById, userRegister, userLoginController} from "../controllers/usersController";
import validateCreateUsers from "../middlewares/validateCreateUser";

const router: Router = Router();

router.get("/users", getUsers)

router.get("/users/:id", getUserById);

router.post("/users/register", validateCreateUsers, userRegister);

router.post("/users/login", userLoginController);

export default router; 