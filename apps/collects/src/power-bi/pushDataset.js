import axios from "axios";

export async function pushDatasetToPowerBi(token, dataset) {
  const urlPush =
    "https://api.powerbi.com/beta/f6d670d7-8f78-4832-908d-1d5e54c11b5d/datasets/c52afc92-e0e5-49b7-9e0b-86bbd77e35ae/rows?experience=power-bi&key=qLa%2BOIPx%2B%2BT2AR9UaqMj4eoTGTlqsiSpaC4jXNQbRuD56sp1y9iCn24LPxb3OlQGkXQg25td%2FVuB9On2II%2BSUg%3D%3D&rows=ReplaceRows";

  return await axios
    .post(
      urlPush,
      {
        rows: dataset
      },
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
      console.log("🚀 ~ app.post ~ error:", error.response.status);
      return {
        message: error.message,
        status: error.response.status
      };
    });
}

export async function deleteDataset(token) {
  const urlDelete =
    "https://api.powerbi.com/v1.0/myorg/datasets/c52afc92-e0e5-49b7-9e0b-86bbd77e35ae";

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
