import "dotenv/config";

export const configs = {
  workSpaceId: process.env.WORKSPACE_ID ?? "",
  getRoutePowerBI: (dataset) => {
    return `https://api.powerbi.com/v1.0/myorg/groups/${
      configs.workSpaceId
    }/datasets${dataset ? `/${dataset}` : ""}`;
  },
  clientId: process.env.CLIENT_ID ?? "",
  usernameMS: process.env.USERNAME_MS ?? "",
  passwordMS: process.env.PASSWORD_MS ?? "",
  tenantId: process.env.TENNANT_ID ?? "",
  clientSecret: process.env.CLIENT_SECRET ?? ""
};
