import axios from "axios";
import { configs } from "../config/index.js";
import { promises as fs } from "fs";

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

    return {
      access_token: response.data.access_token,
      expires_in: response.data.expires_in
    };
  } catch (error) {
    console.error(
      "Error acquiring token:",
      error.response ? error.response.data.error : error.message
    );
    return { status: 401, message: error.message };
  }
}

async function readTokenFromFile() {
  try {
    const data = await fs.readFile("token.json", "utf8");
    const tokenData = JSON.parse(data);

    return tokenData.token;
  } catch (error) {
    console.error("Error reading token:", error);
    throw error;
  }
}

async function writeTokenToFile({ token, expires_in }) {
  const jsonData = JSON.stringify(
    { token, expired_at: Math.floor(Date.now() / 1000) + expires_in },
    null,
    2
  );

  await fs.writeFile("token.json", jsonData, "utf8");
}

export async function readTicketToUse() {
  const now = Math.floor(Date.now() / 1000);
  const { token, expired_at } = readTokenFromFile();

  if (now <= expired_at || !token) {
    const { access_token, expires_in } = await getAuthentication();

    writeTokenToFile({ token: access_token, expires_in });

    return access_token;
  } else if (token) {
    return token;
  }
}
