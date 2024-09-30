import Link from 'next/link';
import React from 'react';

const SubWiki = () => {
  return (
    <div>
      <h3 className="text-sm text-black-200 font-medium mt-3.5 mb-2.5">Wiki</h3>
      <ul className="text-xs">
        <li>
          <Link
            className="text-blue-800 hover:underline hover:text-red-600"
            rel="noreferrer noopener"
            href="/projects/fresher-_-reactjs-fresher/issues?set_filter=1"
          >
            Start page
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-800 hover:underline hover:text-red-600"
            rel="noreferrer noopener"
            href="/projects/fresher-_-reactjs-fresher/issues/report"
          >
            Index by title
          </Link>
        </li>

        <li>
          <Link
            className="text-blue-800 hover:underline hover:text-red-600"
            rel="noreferrer noopener"
            href="/projects/fresher-_-reactjs-fresher/issues/calendar"
          >
            Index by date
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SubWiki;
