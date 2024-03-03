export interface FileMetadata {
  type: string;
  name: string;
  metadata: {
    kind: string;
    id: string;
    selfLink: string;
    mediaLink: string;
    name: string;
    bucket: string;
    generation: string;
    metageneration: string;
    contentType: string;
    storageClass: string;
    size: string;
    md5Hash: string;
    contentDisposition: string;
    crc32c: string;
    etag: string;
    timeCreated: string;
    updated: string;
    timeStorageClassUpdated: string;
    metadata: {
      satus: string;
      commitId: string;
      commitTitle: string;
      commitDescription: string;
      filePath: string;
      firebaseStorageDownloadTokens: string;
    };
  };
}
