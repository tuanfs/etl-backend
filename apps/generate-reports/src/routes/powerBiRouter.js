import express from "express";
import {
  postDatasetToPowerBi,
  deleteDataset,
  deleteAllRowTable,
  postRowToTable,
  refreshDataset,
  getAuthentication,
  deleteDataset,
} from "../power-bi/index.js";

export const router = express.Router();

router.post("/login", async (req, res) => {
  const {token, message} = await getAuthentication();

  if (!token) {
    return res.status(401).json({
      message,
    });
  }

  return res.status(200).json({
    token,
  });
});

router.post("/", async (req, res) => {
  try {
    const token = req.header("token");
    const dataset = req.body;

    const {status, message} = await postDatasetToPowerBi(token, dataset);

    if (status === 200) {
      return res.status(200).json({
        message: "Post Dataset to Power Bi successfully",
      });
    }

    return res.status(status).json({
      message,
    });
  } catch (error) {
    return res.status(404).json({
      message: error?.message,
    });
  }
});

router.post("/rows", async (req, res) => {
  try {
    const token = req.header("token");
    const dataset = req.body;

    const {status, message} = await postRowToTable(token, dataset);

    if (status === 200) {
      return res.status(200).json({
        message: "Push rows to Power Bi successfully",
      });
    }

    return res.status(status).json({
      message,
    });
  } catch (error) {
    return res.status(404).json({
      message: error?.message,
    });
  }
});

router.put("/rows", async (req, res) => {
  try {
    const token = req.header("token");
    const dataset = req.body;

    const {status, message} = await refreshDataset(token, dataset);

    if (status === 200) {
      return res.status(200).json({
        message: "Refresh Dataset to Power Bi successfully",
      });
    }

    return res.status(status).json({
      message,
    });
  } catch (error) {
    return res.status(404).json({
      message: error?.message,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const token = req.header("token");
    const dataset = req.body.dataset;

    const {status, message} = await deleteDataset({token, dataset});

    if (status === 200) {
      return res.status(200).json({
        message: "Delete dataset to Power Bi successfully",
      });
    }

    return res.status(!token ? 401 : 403).json({
      message,
    });
  } catch (error) {
    return res.status(404).json({
      message: error?.message,
    });
  }
});

router.delete("/table", async (req, res) => {
  try {
    const token = req.header("token");
    const dataset = req.body.dataset;
    const tableName = req.body.tableName;

    const {status, message} = await deleteAllRowTable({
      token,
      dataset,
      tableName,
    });

    if (status === 200) {
      return res.status(200).json({
        message: "Delete table to Power Bi successfully",
      });
    }

    return res.status(!token ? 401 : 403).json({
      message,
    });
  } catch (error) {
    return res.status(404).json({
      message: error?.message,
    });
  }
});