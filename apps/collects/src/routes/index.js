import express from "express";
import { router as powerBiRouter } from "./powerBiRouter.js";

export const router = express.Router();

router.use("/power-bi", powerBiRouter);
