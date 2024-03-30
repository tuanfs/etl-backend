import mongoose from "mongoose";
import {
  postDatasetToPowerBi,
  postRowToTable,
  deleteAllRowTable,
} from "../../services/index.js";
import {configs} from "../../config/index.js";

export async function getAllRequestTicketAk247() {
  try {
    console.log("getAllRequestTicket");
    const response = await mongoose.connection
      .useDb("request")
      .collection("tickets")
      .find({tenant: "MAILDEV"})
      .limit(100)
      .sort({created_time: -1})
      .toArray()
      .catch((error) => {
        console.log("getAllRequestTicketAk247 error", error);
        return {message: error.message};
      });

    console.log("response", response);

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

export async function postDatasetToPowerBiAk247({datasetName, allRows}) {
  const tokenNew = configs.token;

  const responseDelete = await deleteAllRowTable({
    token: tokenNew,
    dataset: "25e7edfb-7661-4d21-9803-bb3c3f52e89b",
    tableName: "Tickets",
  });

  console.log(responseDelete);

  const responseTickets = await getAllRequestTicketAk247();

  const newRows = responseTickets.map((item) => {
    return {
      Name: item.name,
      ["Cán bộ hỗ trợ"]: item.technician?.email,
      ["Mã yêu cầu"]: item.number,
      Description: item.description,
      Tenant: item.tenant,
      ["Ngày tạo"]: item.created_time,
      ["Người tạo"]: item.creator.email,
      ["Trạng thái"]: item.status.name,
      ["Loại request"]: item.type.name,
      Channel: item.channel.name,
      ["Nhóm hỗ trợ"]: item.group.name,
      ["Mức độ ưu tiên"]: item.priority?.name,
      ["Dịch vụ"]: item.service.name,
    };
  });

  const responseRow = await postRowToTable({
    token: tokenNew,
    dataset: "25e7edfb-7661-4d21-9803-bb3c3f52e89b",
    tableName: "Tickets",
    allRows: newRows,
  });

  console.log(responseRow);

  return [];

  // const responseDataset = await postDatasetToPowerBi({
  //   token: tokenNew,
  //   datasetName,
  //   tables: {
  //     name: datasetName,
  //     defaultMode: "Push",
  //     tables: [
  //       {
  //         name: "Tickets",
  //         columns: [
  //           {
  //             name: "Name",
  //             dataType: "string"
  //           },
  //           {
  //             name: "Cán bộ hỗ trợ",
  //             dataType: "string"
  //           },
  //           {
  //             name: "Mã yêu cầu",
  //             dataType: "string"
  //           },
  //           {
  //             name: "Description",
  //             dataType: "string"
  //           },
  //           {
  //             name: "Tenant",
  //             dataType: "string"
  //           },
  //           {
  //             name: "Ngày tạo",
  //             dataType: "DateTime"
  //           },
  //           {
  //             name: "Người tạo",
  //             dataType: "string"
  //           },
  //           {
  //             name: "Trạng thái",
  //             dataType: "string"
  //           },
  //           {
  //             name: "Loại request",
  //             dataType: "string"
  //           },
  //           {
  //             name: "Channel",
  //             dataType: "string"
  //           },
  //           {
  //             name: "Nhóm hỗ trợ",
  //             dataType: "string"
  //           },
  //           {
  //             name: "Mức độ ưu tiên",
  //             dataType: "string"
  //           },
  //           {
  //             name: "Dịch vụ",
  //             dataType: "string"
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // });
}
