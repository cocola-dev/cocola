"use server";

import { Storage } from "@google-cloud/storage";

export const fetchUserMD = async (user: string | undefined) => {
  try {
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
      const fileRef = `files/${user}/${user}/${"README.md"}`;

      async function listFilesByPrefix() {
        const file = storage.bucket(bucketName).file(fileRef);
        if (!file) {
          resolve({ success: false, message: "File not found" });
        }
        file
          .download()
          .then((data) => {
            const contents = data[0];
            resolve({ success: true, data: contents.toString() });
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
  } catch (error) {
    return null;
  }
};
