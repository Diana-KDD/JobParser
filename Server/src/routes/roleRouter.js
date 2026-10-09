import express from "express";
import roleController from "../controllers/roleController.js";

const roleRouter = express.Router();

roleRouter.get("/api/roles", roleController.getRoles);

export default roleRouter;
