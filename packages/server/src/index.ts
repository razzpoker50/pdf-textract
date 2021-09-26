import express from "express";

const app = express();
const port = 3005;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/upload", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
