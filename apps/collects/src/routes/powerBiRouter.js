import express from "express";
import {
  pushDatasetToPowerBi,
  getAuthentication,
  deleteDataset
} from "../power-bi/index.js";

export const router = express.Router();

router.post("/login", async (req, res) => {
  const { token, message } = await getAuthentication();

  if (!token) {
    return res.status(401).json({
      message
    });
  }

  return res.status(200).json({
    token
  });
});

router.post("/push", async (req, res) => {
  try {
    const token = req.header("token");
    const dataset = req.body;

    const { status, message } = await pushDatasetToPowerBi(token, dataset);

    if (status === 200) {
      return res.status(200).json({
        message: "Push Dataset to Power Bi successfully"
      });
    }

    return res.status(status).json({
      message
    });
  } catch (error) {
    return res.status(404).json({
      message: error?.message
    });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const token = req.header("token");

    const { status, message } = await deleteDataset(token);

    if (status === 200) {
      return res.status(200).json({
        message: "Push Dataset to Power Bi successfully"
      });
    }

    return res.status(!token ? 401 : 403).json({
      message
    });
  } catch (error) {
    return res.status(404).json({
      message: error?.message
    });
  }
});
