import { getSecret } from "../../../lib/utils";
import * as logger from "firebase-functions/logger";

const _api = (async () => {
  const notionDatabaseId = await getSecret("NOTION_BOOKMARKS_DATABASE_ID");

  return {
    addBookmark: async (url = ""): Promise<any> => {
      // Add bookmark to Notion
      logger.info(`Adding bookmark to Notion: ${url}`);
      logger.info(`Notion database ID: ${notionDatabaseId}`);

      return new Promise((resolve) => {
        resolve({
          databaseId: notionDatabaseId,
          url: url,
        });
      });
    },
  };
})();

export const bookmarksApi = _api;
