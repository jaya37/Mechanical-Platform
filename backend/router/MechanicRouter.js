import express from "express";
import * as MechanicController from "../controllers/MechanicController.js";
const mechanicRouter=express.Router();
mechanicRouter.patch("/password",MechanicController.updatePassword)
mechanicRouter.get("/",MechanicController.allMechanics);
mechanicRouter.post("/",MechanicController.addMeachanic);
mechanicRouter.post("/login",MechanicController.login);
mechanicRouter.get("/:email",MechanicController.mechanicGetByEmail);
mechanicRouter.patch("/:id",MechanicController.updateMechanic);
mechanicRouter.delete("/:id",MechanicController.deleteMechanic);
export default mechanicRouter;