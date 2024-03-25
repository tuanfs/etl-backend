import axios from "axios";
import { configs } from "../config/index.js";

export async function postDatasetToPowerBi({ token, datasetName, tables }) {
  const urlPost = configs.services.generateReportAPI;

  return await axios
    .post(urlPost, {
      name: datasetName,
      defaultMode: "Push",
      tables,
      token: token
    })
    .then((reponse) => {
      return { status: reponse.status };
    })
    .catch((error) => {
      console.log("🚀 ~ app.post ~ error:", error.response.status);
      return {
        message: error.message,
        status: error.response.status
      };
    });
}

export async function postRowToTable({ token, dataset, tableName, allRows }) {
  const routeUrl = configs.services.generateReportAPI;
  const urlPost = routeUrl && `${routeUrl}/tables`;

  return await axios
    .post(urlPost, { rows: allRows, token, dataset, tableName })
    .then((reponse) => {
      return { status: reponse.status };
    })
    .catch((error) => {
      console.log("postRowToTable", error.message);
      return {
        message: error.message
      };
    });
}

export async function deleteDataset({ token, dataset }) {
  const urlDelete = configs.getRoutePowerBI(dataset);
  return await axios
    .delete(
      urlDelete,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
    .then((reponse) => {
      return { status: reponse.status };
    })
    .catch((error) => {
      console.log("🚀 ~ app.post ~ error:", error.message);
      return {
        message: error.message
      };
    });
}

export async function deleteAllRowTable({ token, dataset, tableName }) {
  const routeUrl = configs.services.generateReportAPI;
  const urlDelete = `${routeUrl}/tables`;

  console.log(urlDelete);
  return await axios
    .put(urlDelete, { token, dataset, tableName })
    .then((reponse) => {
      return { status: reponse.status };
    })
    .catch((error) => {
      console.log("deleteAllRowTable", error.message);
      return {
        message: error.message
      };
    });
}

export async function refreshDataset({ token, dataset }) {
  const routeUrl = configs.getRoutePowerBI(dataset);
  const urlRefresh = routeUrl && `${routeUrl}/refreshes`;
  return await axios
    .post(
      urlRefresh,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
    .then((reponse) => {
      return { status: reponse.status };
    })
    .catch((error) => {
      console.log("🚀 ~ app.post ~ error:", error.message);
      return {
        message: error.message
      };
    });
}
