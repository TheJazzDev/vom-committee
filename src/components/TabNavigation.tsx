import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  printMode: boolean;
}

const tabs = ['summary', 'income', 'expenses', 'analysis', 'report'];

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  printMode,
}) => {
  return (
    <div className={`${printMode ? 'bg-white border border-black' : 'bg-white'} rounded-lg shadow-lg mb-6`}>
      <div className='flex flex-wrap'>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex-1 py-3 lg:py-4 px-4 lg:px-6 font-semibold capitalize transition-colors ${
              activeTab === tab
                ? printMode
                  ? 'border-b-4 border-black text-black'
                  : 'border-b-4 border-blue-500 text-blue-600'
                : printMode
                ? 'text-black hover:bg-gray-100'
                : 'text-gray-600 hover:text-gray-800'
            }`}>
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};
