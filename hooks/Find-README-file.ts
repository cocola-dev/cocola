import { FileMetadata } from "@/types/TreeInterface";

export function findBlobByName(name: string, data: FileMetadata[]) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].type === "blob" && data[i].name === name) {
      return data[i];
    }
  }
  return null;
}
