'use client';
import { useRef } from 'react';

interface Props {
  placeholder: string;
  setDataToConvert: React.Dispatch<React.SetStateAction<string>>;
  dataToConvert?: string;
}

const TextArea = ({ placeholder, dataToConvert, setDataToConvert }: Props) => {
  const ref = useRef<HTMLFormElement>(null);

  const updateDataToConvert = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ref.current) return;

    const input = new FormData(ref.current);

    const data = input.get('input') as string;

    setDataToConvert(data.trim());
  };

  return (
    <form ref={ref} className='w-full'>
      <textarea
        name='input'
        className='py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
        rows={6}
        placeholder={placeholder}
        defaultValue={dataToConvert}
        onChange={updateDataToConvert}
      ></textarea>
    </form>
  );
};

export default TextArea;
