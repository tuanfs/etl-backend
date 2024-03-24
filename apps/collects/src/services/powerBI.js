import axios from "axios";
import {configs} from "../config/index.js";

export async function postDatasetToPowerBi({token, datasetName, tables}) {
  return await axios
    .post(
      urlPost,
      {
        name: datasetName,
        defaultMode: "Push",
        tables,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
    .then((reponse) => {
      return {status: reponse.status};
    })
    .catch((error) => {
      console.log("🚀 ~ app.post ~ error:", error.response.status);
      return {
        message: error.message,
        status: error.response.status,
      };
    });
}

export async function deleteDataset({token, dataset}) {
  const urlDelete = configs.getRoutePowerBI(dataset);
  return await axios
    .delete(
      urlDelete,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
    .then((reponse) => {
      return {status: reponse.status};
    })
    .catch((error) => {
      console.log("🚀 ~ app.post ~ error:", error.message);
      return {
        message: error.message,
      };
    });
}

export async function deleteAllRowTable({token, dataset, tableName}) {
  const routeUrl = configs.getRoutePowerBI(dataset);
  const urlDelete = routeUrl && `${routeUrl}/tables/${tableName}/rows`;
  return await axios
    .delete(
      urlDelete,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
    .then((reponse) => {
      return {status: reponse.status};
    })
    .catch((error) => {
      console.log("🚀 ~ app.post ~ error:", error.message);
      return {
        message: error.message,
      };
    });
}

export async function postRowToTable({token, dataset, tableName, allRows}) {
  const routeUrl = configs.getRoutePowerBI(dataset);
  const urlPost = routeUrl && `${routeUrl}/tables/${tableName}/rows`;
  return await axios
    .post(
      urlPost,
      {rows: allRows},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
    .then((reponse) => {
      return {status: reponse.status};
    })
    .catch((error) => {
      console.log("🚀 ~ app.post ~ error:", error.message);
      return {
        message: error.message,
      };
    });
}

export async function refreshDataset({token, dataset}) {
  const routeUrl = config.getRoutePowerBI(dataset);
  const urlRefresh = routeUrl && `${routeUrl}/refreshes`;
  return await axios
    .post(
      urlRefresh,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
    .then((reponse) => {
      return {status: reponse.status};
    })
    .catch((error) => {
      console.log("🚀 ~ app.post ~ error:", error.message);
      return {
        message: error.message,
      };
    });
}
