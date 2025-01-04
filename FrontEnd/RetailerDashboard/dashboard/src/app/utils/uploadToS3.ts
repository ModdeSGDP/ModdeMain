import axios from 'axios';

export const uploadToS3 = async (file: File, preSignedUrl: string) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.put(preSignedUrl, formData, {
    headers: { 'Content-Type': file.type },
  });

  return response.status === 200;
};
