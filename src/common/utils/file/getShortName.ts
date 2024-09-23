export const getShortName = (fileName: string): string => {
  const fileExtensionIndex: number = fileName.lastIndexOf('.');
  const fileExtension = fileName.substring(fileExtensionIndex);

  return fileName
    .substring(0, 5)
    .concat('...')
    .concat(fileName.substring(fileExtensionIndex - 5, fileExtensionIndex))
    .concat(fileExtension);
};
