import mongoose from "mongoose";

export async function getAllRequestTicket() {
  try {
    const response = await mongoose.connection
      .useDb("db_ca_request")
      .collection("tickets")
      .find({tenant: "MAILDEV"})
      .toArray();

    return response.map((item) => {
      return {
        ...item,
        _id: undefined,
        template: undefined,
        workflow: undefined,
        attachments: undefined,
        watchers: undefined,
        ct_fields: undefined,
        sla: undefined,
        calendar: undefined,
        activities: undefined,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}
