import * as express from "express";
import * as logger from "firebase-functions/logger";

import { bookmarksApi } from "./endpoints/bookmarks";


class ApiHolder {

  private static bookmarksApi: any;

  public static async getBookmarksApi() {
    if (!this.bookmarksApi) {
      logger.info("Loading Bookmarks API");
      this.bookmarksApi = await bookmarksApi;
    }
    return this.bookmarksApi
  }

}

const _server = (() => {

  const app = express();
  app.use(express.json());

  app.post("/bookmark", async (req, res) => {
    const api = await ApiHolder.getBookmarksApi()
    res.send(await api.addBookmark()); // FIXME: Setup arguments
  });

  const runningLocally: boolean = process.env["FIREBASE_CONFIG"] === undefined;
  if (runningLocally) {
    logger.info("Running locally, starting express server");
    const DEV_PORT = 3001;
    app.listen(DEV_PORT, () => {
      logger.info(`Server is running on http://localhost:${DEV_PORT}`);
    });

    const unusedServer = express();
    return unusedServer;
  }

  logger.info(
    "Running in the cloud, returning express app for Firebase to use"
  );
  return app;
})();


export const server = _server;
