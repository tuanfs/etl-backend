import mongoose from "mongoose";

// let uriConnectMongo =
//   "mongodb://root:1@10.15.220.60:27001,10.15.220.60:27002,10.15.220.60:27003/admin?retryWrites=false&loadBalanced=false&replicaSet=rs0&readPreference=primary&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256";

let uriConnectMongo = "mongodb://mongodb:27017";

export function connectMongo(onSuccess) {
  const connectionUri = uriConnectMongo;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(connectionUri, {})
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((err) => {
      console.error("%O", err);
    });
}

export function connectedToMongo() {
  return mongoose.connection.readyState === 1;
}
