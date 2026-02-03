import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { config } from "./src/config/envConfig.js";

const startServer = () => {
  const PORT = config.port || 3000;

  app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectDB();
  });
};

startServer();
