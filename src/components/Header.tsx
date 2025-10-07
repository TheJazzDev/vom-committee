import React from 'react';

interface HeaderProps {
  // activeTab: string;
  printMode: boolean;
  onTogglePrintMode: () => void;
  onDownloadExcel: () => void;
  onDownloadText: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  // activeTab,
  printMode,
  onTogglePrintMode,
  onDownloadExcel,
  onDownloadText,
}) => {
  return (
    <div className={`${printMode ? 'bg-white border border-black' : 'bg-white'} rounded-lg shadow-lg p-8 mb-6`}>
      <div className='flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-0'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>
            C&S Movt. VOM Harvest Committee 2025
          </h1>
          <h2 className='text-xl text-gray-600 mb-4'>
            Comprehensive Financial Report{' '}
            {/* <span className='capitalize font-semibold'>({activeTab})</span> */}
          </h2>
          <p className='text-sm text-gray-500'>
            Period: March - October 2025 | Generated:{' '}
            {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className='flex gap-3 flex-wrap'>
          <button
            onClick={onTogglePrintMode}
            className={`${
              printMode ? 'bg-black text-white border-2 border-black' : 'bg-purple-600 text-white'
            } px-4 py-2 rounded-lg hover:opacity-80 transition-colors`}>
            {printMode ? '✓ B&W Mode' : 'Print Mode (B&W)'}
          </button>
          <button
            onClick={onDownloadExcel}
            className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors'>
            Download Excel
          </button>
          <button
            onClick={onDownloadText}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};