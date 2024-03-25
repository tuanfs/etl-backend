import "dotenv/config";
export const configs = {
  services: {
    generateReportAPI:
      process.env.GENENARATE_REPORT_API ?? "http://localhost:3002/power-bi"
  },
  token: process.env.Token
};
