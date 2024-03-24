import express from "express";
import {getAllRequestTicket} from "../datasources/ak247/dbController.js";

export const router = express.Router();

router.get("/tickets", async (req, res) => {
  const result = await getAllRequestTicket();

  return res.status(200).json(result);
});
