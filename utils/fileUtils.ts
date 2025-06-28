import mime from 'mime';
import * as FileSystem from 'expo-file-system';

export const saveImageToLocalCache = async (uri: string): Promise<string> => {
  const fileName = uri.split('/').pop();
  const localUri = `${FileSystem.documentDirectory}${fileName}`;
  await FileSystem.copyAsync({ from: uri, to: localUri });

  return localUri;
};

export const getImageInfo = (uri: string) => {
  const name = uri.split('/').pop() || 'image.jpg';
  const type = mime.getType(uri) || 'image/jpeg';

  return { uri, name, type };
};