import axios from "axios";
import qs from "querystring";

export async function getAuthentication() {
  const clientId = "12915b8c-5394-4728-a041-c3efd9596ff6";

  const tenantId = "f6d670d7-8f78-4832-908d-1d5e54c11b5d";

  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const data = {
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://analysis.windows.net/powerbi/api/.default"
  };

  const requestBody = qs.stringify(data);

  return axios
    .post(tokenEndpoint, requestBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then((response) => {
      const accessToken = response.data.access_token;
      return { token: accessToken };
    })
    .catch((error) => {
      console.error("Error:", error.message);
      return { message: error.message };
    });
}
