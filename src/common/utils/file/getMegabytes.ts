export const getMegabytesToBytes = (megabytes: number): number =>
  megabytes * 1024 * 1024;

export const getBytesToMegabytes = (bytes: number): number =>
  bytes / 1024 / 1024;
