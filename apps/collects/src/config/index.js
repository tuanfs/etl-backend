import "dotenv/config";
export const configs = {
  services: {
    generateReportAPI:
      process.env.GENENARATE_REPORT_API ?? "http://localhost:3002",
  },
};
