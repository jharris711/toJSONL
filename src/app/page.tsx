'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import CodeBlock from '@/components/CodeBlock';
import FileInput from '@/components/FileInput';
import MemoizedReactMarkdown from '@/components/MemoizedReactMarkdown';
import Sidebar from '@/components/Sidebar';
import TextArea from '@/components/TextArea';
import Toast from '@/components/Toast';

interface Toast {
  type: string;
  message: string;
}

export default function Home() {
  const [toast, setToast] = useState<Toast | null>(null);
  const [dataToConvert, setDataToConvert] = useState<string>('');
  const [convertedData, setConvertedData] = useState<string>('');
  const [requestError, setRequestError] = useState<boolean>(false);
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestError(false);
    setToast({ type: 'info', message: 'Converting...' });

    if (!dataToConvert) {
      setRequestError(true);
      setToast({ type: 'error', message: 'No data to convert' });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        'jsonlConverter',
        {
          body: { data: JSON.parse(dataToConvert) },
        }
      );

      if (error) {
        throw error;
      }

      setConvertedData(data.jsonl);
      setToast({ type: 'success', message: 'Converted Successfully' });
    } catch (err) {
      const e = err as Error;
      setRequestError(true);
      setToast({ type: 'error', message: e.message });
    }
  };

  return (
    <>
      <Toast toast={toast} setToast={setToast} />
      {/* <!-- Sidebar Toggle --> */}
      <div className='sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700'>
        <div className='flex items-center py-4'>
          {/* <!-- Navigation Toggle --> */}
          <button
            type='button'
            className='text-gray-500 hover:text-gray-600'
            data-hs-overlay='#application-sidebar'
            aria-controls='application-sidebar'
            aria-label='Toggle navigation'
          >
            <span className='sr-only'>Toggle Navigation</span>
            <svg
              className='w-5 h-5'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
              />
            </svg>
          </button>
          {/* <!-- End Navigation Toggle --> */}
        </div>
      </div>
      {/* <!-- End Sidebar Toggle --> */}

      {/* <!-- Sidebar --> */}
      <Sidebar />
      {/* <!-- End Sidebar --> */}

      {/* <!-- Content --> */}
      <div className='w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72'>
        {/* <!-- Page Heading --> */}
        <header>
          <p className='mb-2 text-sm font-semibold text-amber-600'>
            Seamlessly Convert JSON to JSONL
          </p>
          <h1 className='block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white'>
            A simple tool for converting your JSON data to JSONL
          </h1>
          <p className='mt-2 text-lg text-gray-800 dark:text-gray-400'>
            Just copy and paste your data into the box below, or upload a file.
          </p>
          <div className='mt-5 flex flex-row items-center gap-2 sm:gap-3'>
            <FileInput setDataToConvert={setDataToConvert} />
            <div className='w-full flex flex-col justify-center items-end gap-2 rounded-md border border-transparent font-semibold text-sm py-3 px-4'>
              <TextArea
                placeholder='Enter your json data here...'
                dataToConvert={dataToConvert}
                setDataToConvert={setDataToConvert}
                requestError={requestError}
              />
              <button
                type='button'
                onClick={handleSubmit}
                className='py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-amber-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
              >
                Submit
              </button>
            </div>
          </div>
          <div className='mt-5 w-full flex flex-row items-center gap-2 sm:gap-3'>
            {convertedData ? (
              <div className='space-y-3 w-full bg-gray-500 dark:bg-gray-800 p-6 rounded-lg'>
                <div className='flex flex-row w-full items-center justify-center'>
                  <MemoizedReactMarkdown
                    className='prose dark:prose-invert flex-1 w-full'
                    remarkPlugins={[remarkGfm, remarkMath]}
                    /* rehypePlugins={[rehypeMathjax]} */
                    components={{
                      pre({ children }) {
                        return <pre className='w-full'>{children}</pre>;
                      },
                      code({ node, inline, className, children, ...props }) {
                        if (children.length) {
                          if (children[0] == '▍') {
                            return (
                              <span className='animate-pulse cursor-default mt-1'>
                                ▍
                              </span>
                            );
                          }

                          children[0] = (children[0] as string).replace(
                            '`▍`',
                            '▍'
                          );
                        }

                        const match = /language-(\w+)/.exec(className || '');

                        return !inline ? (
                          <CodeBlock
                            key={Math.random()}
                            language={(match && match[1]) || ''}
                            value={String(children).replace(/\n$/, '')}
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                      table({ children }) {
                        return (
                          <table className='border-collapse border border-black px-3 py-1 dark:border-white'>
                            {children}
                          </table>
                        );
                      },
                      th({ children }) {
                        return (
                          <th className='break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white'>
                            {children}
                          </th>
                        );
                      },
                      td({ children }) {
                        return (
                          <td className='break-words border border-black px-3 py-1 dark:border-white'>
                            {children}
                          </td>
                        );
                      },
                    }}
                  >
                    {'```json\n' + `${convertedData}\n` + '```'}
                  </MemoizedReactMarkdown>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </header>
        {/* <!-- End Page Heading --> */}
      </div>
      {/* <!-- End Content --> */}
    </>
  );
}
