import axios from "axios";
import { configs } from "../config/index.js";

export async function getAuthentication() {
  try {
    const tenantId = configs.tenantId;
    const requestBody = {
      grant_type: "password",
      client_id: configs.clientId,
      client_secret: configs.clientSecret,
      username: configs.usernameMS,
      password: configs.passwordMS,
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

    return { token: response.data.access_token };
  } catch (error) {
    console.error(
      "Error acquiring token:",
      error.response ? error.response.data.error : error.message
    );
    return { status: 401, message: error.message };
  }
}
