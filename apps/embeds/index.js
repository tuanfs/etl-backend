import express from "express";

const app = express();

app.use("/", (req, res) => {
  console.log("tuuaua");
  res.status(200).send("Ok");
});

app.listen(3003, () => {
  console.log("Listen on port 3003");
});
