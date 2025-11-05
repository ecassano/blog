'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { Button } from '@/components/Button';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string>('');

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();
    if (!fileInputRef.current) {
      setImageUrl('');
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput.files?.[0];

    if (!file) {
      setImageUrl('');
      return;
    }

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      toast.error(`O arquivo deve ter menos de ${readableSize}KB`);
      fileInput.value = '';
      setImageUrl('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = '';
        setImageUrl('');
        return;
      }

      setImageUrl(result.url);
      toast.success('Imagem enviada');
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-4 py-4'>
      <Button
        onClick={handleChooseFile}
        type='button'
        className='self-start'
        disabled={isUploading}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>

      {!!imageUrl && (
        <div className='flex flex-col gap-4'>
          <p>
            <b>URL:</b> {imageUrl}
          </p>

          {/* eslint-disable-next-line */}
          <img className='rounded-lg' src={imageUrl} />
        </div>
      )}

      <input
        onChange={handleChange}
        ref={fileInputRef}
        className='hidden'
        name='file'
        type='file'
        accept='image/*'
        disabled={isUploading}
      />
    </div>
  );
}