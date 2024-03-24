import "dotenv/config";
export const configs = {
  workSpaceId: process.env.WORKSPACE_ID ?? "",
  getRoutePowerBI: (dataset) => {
    return `https://api.powerbi.com/v1.0/myorg/groups/${
      config.workSpaceId
    }/datasets${dataset ? `/${dataset}` : ""}`;
  },
};
