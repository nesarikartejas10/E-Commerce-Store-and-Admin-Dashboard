import app from "./src/app";

const PORT = 5000;
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
}

startServer();
