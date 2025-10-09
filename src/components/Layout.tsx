'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePrintMode } from '@/hooks/usePrintMode';

const tabs = [
  { id: 'summary', label: 'Summary', path: '/' },
  { id: 'income', label: 'Income', path: '/income' },
  { id: 'expenses', label: 'Expenses', path: '/expenses' },
  { id: 'analysis', label: 'Analysis', path: '/analysis' },
  { id: 'harvest', label: 'Harvest', path: '/harvest' },
  { id: 'report', label: 'Report', path: '/report' },
];

export const Navigation = () => {
  const pathname = usePathname();
  const { printMode, setPrintMode } = usePrintMode();

  return (
    <div className='sticky top-0 z-50 bg-white shadow-md print:shadow-none'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Mobile & Desktop Layout */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4'>

          {/* Tabs Navigation */}
          <div className='flex overflow-x-auto scrollbar-hide gap-2 lg:gap-3'>
            {tabs.map((tab) => {
              const isActive = pathname === tab.path;

              return (
                <Link
                  key={tab.id}
                  href={tab.path}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? printMode
                        ? 'bg-black text-white'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                      : printMode
                      ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-700 hover:from-blue-100 hover:to-indigo-100'
                  }`}>
                  {tab.label}
                </Link>
              );
            })}
          </div>

          {/* Print Mode Toggle */}
          <button
            onClick={() => setPrintMode(!printMode)}
            className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all shadow-md hover:shadow-lg print:hidden ${
              printMode
                ? 'bg-black text-white border-2 border-black'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
            }`}>
            {printMode ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>B&W Mode</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                <span>Print Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};