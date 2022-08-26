export const getFirstLetter = (name) => {
  return name[0].toUpperCase();
};

export const getFileId = (file_path) => {
  return file_path.split("/")[1];
};
