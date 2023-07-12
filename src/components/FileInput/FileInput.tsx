'use client';
import { useState, useRef } from 'react';

interface Props {
  setDataToConvert: React.Dispatch<React.SetStateAction<string>>;
}

const FileInput = ({ setDataToConvert }: Props) => {
  const ref = useRef<HTMLFormElement>(null);

  const handleFileChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ref.current) return;

    const inputData = new FormData(ref.current);

    const file = inputData.get('file') as Blob;

    const data = await file.text();

    setDataToConvert(data);
  };

  return (
    <form ref={ref}>
      <label className='block'>
        <span className='sr-only'>Choose JSON File</span>
        <input
          type='file'
          name='file'
          accept='.json'
          className='block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border file:border-0
      file:text-sm file:font-semibold
      file:bg-amber-500 file:text-white
      hover:file:bg-amber-600
    '
          onChange={handleFileChange}
        />
      </label>
    </form>
  );
};

export default FileInput;
