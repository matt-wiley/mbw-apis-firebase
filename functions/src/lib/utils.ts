import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const isRunningLocally = process.env["MBW_APIS_LOCAL"] !== undefined;

const secretGetter = (() => {
  if (isRunningLocally) {
    return {
      getSecret: async (secretName: string): Promise<string> => {
        const secretValue = process.env[secretName];
        if (!secretValue) {
          throw new Error(`Secret ${secretName} not found`);
        }
        return secretValue;
      },
    };
  } else {
    const firebaseApp = admin.initializeApp(functions.config().firebase);
    const db = firebaseApp.firestore();

    return {
      getSecret: async (secretName: string): Promise<string> => {
        const secretRef = db.collection("secrets").doc(secretName);
        const secretDoc = await secretRef.get();
        if (!secretDoc.exists) {
          throw new Error(`Secret ${secretName} not found`);
        }
        return secretDoc.data()?.value;
      },
    };
  }
})();

export const isLocal = () => isRunningLocally;
export const getSecret = secretGetter.getSecret;
