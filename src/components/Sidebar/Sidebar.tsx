'use client';
import { useEffect } from 'react';
import Footer from '../Footer';

const KOFI_LINK = process.env.NEXT_PUBLIC_KOFI_LINK as string;

const Sidebar = () => {
  useEffect(() => {
    import('preline');
  }, []);

  return (
    <div
      id='application-sidebar'
      className='hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700'
    >
      <div className='px-6'>
        <a
          className='flex-none text-xl font-semibold dark:text-white'
          href='#'
          aria-label='toJSONL'
        >
          toJSONL
        </a>
      </div>

      <nav
        className='hs-accordion-group p-6 w-full flex flex-col flex-wrap justify-center'
        data-hs-accordion-always-open
      >
        <ul className='space-y-1.5'>
          <li>
            <a
              className='flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md hover:bg-amber-500  hover:text-white dark:bg-gray-900 dark:text-white'
              href='/'
            >
              <svg
                className='w-3.5 h-3.5'
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z'
                />
                <path
                  fillRule='evenodd'
                  d='M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z'
                />
              </svg>
              JSON to JSONL
            </a>
          </li>
        </ul>
        <div className='absolute bottom-0'>
          <Footer />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
