import { Router } from "express";
export const userRouter = Router();
import users from "../controller/user.controller.js";
import UserCheck from '../middlewares/user.check.js'


userRouter.get("/", users.GET);
userRouter.get("/:id", users.GETID);
userRouter.post("/", users.POST);
userRouter.delete("/:id", users.DELETE);
userRouter.put("/:id", UserCheck, users.PUT);
