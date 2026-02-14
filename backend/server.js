import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { config } from "./src/config/envConfig.js";

const PORT = config.port || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
}

startServer();
