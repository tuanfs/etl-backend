import express from "express";
import { getAllTicketRequestCa } from "../datasources/ca/dbController.js";

export const router = express.Router();

router.get("/tickets", async (req, res) => {
  const result = await getAllTicketRequestCa();
  return res.status(200).json(result);
});
