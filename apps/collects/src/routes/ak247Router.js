import express from "express";
import {
  getAllRequestTicketAk247,
  postDatasetToPowerBiAk247
} from "../datasources/ak247/dbController.js";

export const router = express.Router();

router.get("/tickets", async (req, res) => {
  const result = await getAllRequestTicketAk247();

  return res.status(200).json(result);
});

router.post("/generate-report", async (req, res) => {
  const result = await postDatasetToPowerBiAk247({
    datasetName: "ReportTicketAk247"
  });

  return res.status(200).json(result);
});
