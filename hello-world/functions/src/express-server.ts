import * as express from "express";
import * as logger from "firebase-functions/logger";

export const expressServer = (() => {
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    logger.info("Hello world received a request at '/'");
    res.send(`Hello from firebase! -- ${Date.now().toString()}`);
  });

  const runningLocally: boolean = process.env["FIREBASE_CONFIG"] === undefined;
  if (runningLocally) {
    logger.info("Running locally, starting express server");
    const DEV_PORT = 3000;
    app.listen(DEV_PORT, () => {
      logger.info(`Server is running on http://localhost:${DEV_PORT}`);
    });

    const unusedServer = express();
    return unusedServer;
  }

  logger.info("Running in the cloud, returning express app for Firebase to use");
  return app;
})();
