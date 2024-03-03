"use server";

import { Storage } from "@google-cloud/storage";

export const FetchBlob = async (
  filename: string | undefined,
  generation: string | undefined,
) => {
  const bucketName = "cocola-412510.appspot.com";

  return new Promise(async (resolve, reject) => {
    const storage = new Storage({
      keyFilename: "cocola-412510-1d0b8901f5ca.json",
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
