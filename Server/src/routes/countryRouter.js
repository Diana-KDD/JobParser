import express from "express";
import countryController from "../controllers/countryController.js";

const countryRouter = express.Router();

countryRouter.get("/api/countries", countryController.getCountries);

export default countryRouter;
