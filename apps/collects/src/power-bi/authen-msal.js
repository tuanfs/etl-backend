import axios from "axios";

const clientId = "12915b8c-5394-4728-a041-c3efd9596ff6";

const username = "hiepnn9@chipad.onmicrosoft.com";
const password = "Vok89967";
const tenantId = "f6d670d7-8f78-4832-908d-1d5e54c11b5d";

async function getToken() {
  try {
    const requestBody = {
      grant_type: "password",
      client_id: clientId,
      client_secret: clientSecret,
      username: username,
      password: password,
      scope: "https://analysis.windows.net/powerbi/api/.default"
    };

    const response = await axios.post(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      new URLSearchParams(requestBody),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    console.log("response");

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error acquiring token:",
      error.response ? error.response.data.error : error.message
    );
  }
}

const accessToken = await getToken();
console.log(accessToken);
