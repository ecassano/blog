'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
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

  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return makeResult({
      url: '',
      error: 'Faça login em outra aba antes de enviar.',
    });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ url: '', error: 'Dados inválidos' });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return makeResult({ url: '', error: 'Arquivo inválido' });
  }

  if (
    file.size >
    parseInt(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE || '921600')
  ) {
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

  const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads';
  const uploadFullPath = resolve(process.cwd(), 'public', uploadDir);

  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = file.arrayBuffer();
  const buffer = Buffer.from(await fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const imgServerUrl =
    process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';
  const url = `${imgServerUrl}/${uniqueImageName}`;

  return makeResult({ url });
}
