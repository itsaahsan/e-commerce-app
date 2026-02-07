import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full animate-pulse">
      <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full ml-2"></div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>

        <div className="flex items-center mb-2">
          <div className="flex">
            <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-10 ml-2"></div>
        </div>

        <div className="mb-3 flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>

        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;