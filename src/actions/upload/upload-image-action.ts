'use server';

import {
  IMAGE_UPLOAD_DIRECTORY,
  IMAGE_UPLOAD_MAX_SIZE,
  IMAGE_SERVER_URL,
} from '@/lib/constants';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

type UploadImageActionResult = {
  url: string;
  error: string;
};
export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ url: '', error: 'Dados inválidos' });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return makeResult({ url: '', error: 'Arquivo inválido' });
  }

  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    return makeResult({
      url: '',
      error: 'Arquivo muito grande',
    });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({
      url: '',
      error: 'Arquivo não é uma imagem',
    });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = resolve(
    process.cwd(),
    'public',
    IMAGE_UPLOAD_DIRECTORY,
  );

  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = file.arrayBuffer();
  const buffer = Buffer.from(await fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const url = `${IMAGE_SERVER_URL}/${IMAGE_UPLOAD_DIRECTORY}/${uniqueImageName}`;

  return makeResult({ url });
}
