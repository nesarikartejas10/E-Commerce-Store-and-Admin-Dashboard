import app from "./src/app.js";

const startServer = () => {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
};

startServer();
