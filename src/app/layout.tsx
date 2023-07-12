import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'toJSONL',
  description: 'Transform Your JSON Data into JSONL Effortlessly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-slate-900 min-h-screen`}
      >
        <header className='lg:hidden sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:pl-64 dark:bg-gray-800 dark:border-gray-700'>
          <nav
            className='flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8'
            aria-label='Global'
          >
            <div className='mr-5 lg:mr-0 lg:hidden'>
              <a
                className='flex-none text-xl font-semibold dark:text-white'
                href='/'
                aria-label='Brand'
              >
                toJSONL
              </a>
            </div>

            <div className='w-full flex items-center justify-end ml-auto sm:justify-between sm:gap-x-3 sm:order-3'>
              <div className='sm:hidden'>
                <button
                  type='button'
                  className='inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800'
                >
                  <svg
                    className='w-3.5 h-3.5'
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
