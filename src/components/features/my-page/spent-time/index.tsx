import Link from 'next/link';
import React from 'react';
import TotalTime from '../total-time';

const SpentTime: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-1 font-semibold">
        <Link
          href="/time-entries"
          className="text-[#159]  hover:underline hover:text-[#c61a1a]"
          rel="noreferrer noopener"
        >
          Spent time
        </Link>
        <span className="text-[#555555]">(last 7 days)</span>
      </div>
      <TotalTime />
    </div>
  );
};

export default SpentTime;
