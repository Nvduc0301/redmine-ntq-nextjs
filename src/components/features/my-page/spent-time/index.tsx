import Link from 'next/link';
import React from 'react';
import TotalTime from '../total-time';

const SpentTime: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-1 font-semibold">
        <Link
          href="/time-entries"
          className="text-blue-500  hover:underline hover:text-red-500"
          rel="noreferrer noopener"
        >
          Spent time
        </Link>
        <span className="text-gray-500">(last 7 days)</span>
      </div>
      <TotalTime />
    </div>
  );
};

export default SpentTime;
