"use server";

import { Storage } from "@google-cloud/storage";
import path from "path";

export const FetchBlob = async (
  filename: string | undefined,
  generation: string | undefined,
) => {
  const bucketName = process.env.BUCKET_NAME || "cocola-412510.appspot.com";

  if (process.env.GCP_CRED_FILE) {
    var gcsKey = JSON.parse(
      Buffer.from(process.env.GCP_CRED_FILE, "base64").toString(),
    );
  }

  return new Promise(async (resolve, reject) => {
    const storage = new Storage({
      credentials: {
        client_email: gcsKey.client_email,
        private_key: gcsKey.private_key,
      },
      projectId: gcsKey.project_id,
    });

    // const fileRef = `${filename}#${generation}`;
    const fileRef = `${filename}`;

    async function listFilesByPrefix() {
      const file = storage.bucket(bucketName).file(fileRef);

      file
        .download()
        .then((data) => {
          const contents = data[0];
          // console.log("File contents:", contents.toString());
          resolve({ data: contents.toString() });
        })
        .catch((err) => {
          console.error("Error reading file:", err);
        });
    }

    try {
      await listFilesByPrefix();
    } catch (error) {
      reject(error);
    }
  });
};
