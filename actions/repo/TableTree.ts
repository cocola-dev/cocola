"use server";

import { Storage } from "@google-cloud/storage";

export const TableTree = async ({
  user = null,
  repository = null,
}: {
  user: string | null | undefined;
  repository: string | null;
}) => {
  const bucketName = "cocola-412510.appspot.com";
  const prefix = `files/${user}/${repository}/`;
  const delimiter = "/";

  return new Promise(async (resolve, reject) => {
    const data = {};

    const storage = new Storage({
      keyFilename: "./cocola-412510-1d0b8901f5ca.json",
    });

    async function listFilesByPrefix() {
      const options = {
        prefix: prefix,
      };

      // Lists files in the bucket, filtered by a prefix
      const [files] = await storage.bucket(bucketName).getFiles(options);

      files.forEach((file) => {
        const filePath = file.name.substring(prefix.length); // Remove prefix
        const parts = filePath.split(delimiter); // Split into parts

        // Traverse the tree and create folders as needed
        let current: any = data;
        parts.forEach((part) => {
          if (!current[part]) {
            current[part] = {}; // Create folder
          }
          current = current[part]; // Move to the next level
        });

        // Set type to 'tree' for folders
        current.type = "blob";

        // Add metadata for files
        current.metadata = file.metadata;
      });
    }

    try {
      await listFilesByPrefix();

      // Convert the tree structure to array of objects
      const result2 = convertToFlatArray(data);
      const result = sortbytree(result2);

      resolve({ data: result });
    } catch (error) {
      reject(error);
    }
  });
};

function convertToFlatArray(data: any) {
  const result: any[] = [];

  Object.entries(data).forEach(([name, value]) => {
    const obj = {
      name: name,
      // @ts-ignore
      type: value?.type || "tree",
      // @ts-ignore
      metadata: value?.metadata || null,
    };

    // if (value.type === "tree") {
    //   obj.children = convertToFlatArray(value);
    // }

    result.push(obj);
  });

  // console.log(result);

  return result;
}

function sortbytree(data: any) {
  const result: any[] = [];

  // Sort the data array so that objects with type "tree" come first
  data.sort((a: any, b: any) => {
    if (a.type === "tree" && b.type !== "tree") {
      return -1;
    } else if (a.type !== "tree" && b.type === "tree") {
      return 1;
    } else {
      return 0;
    }
  });

  Object.entries(data).forEach(([name, value]) => {
    const obj = {
      name: (value as any).name,
      type: (value as any).type,
      metadata: (value as any).metadata,
    };

    result.push(obj);
  });

  return result;
}
