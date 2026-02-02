import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello welcome to Ecommerce Store</h1>");
});

export default app;
