import app from "./src/app.js";
import { config } from "./src/config/envConfig.js";

const startServer = () => {
  const PORT = config.port || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
