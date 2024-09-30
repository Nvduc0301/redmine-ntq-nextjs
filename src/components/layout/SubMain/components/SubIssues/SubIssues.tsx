import React from 'react';

const SubIssues = () => {
  return (
    <div>
      <h3 className="text-sm text-black-200 font-medium mt-3.5 mb-2.5">
        Issues
      </h3>
      <ul className="text-xs">
        <li>
          <a
            className="text-blue-800 hover:underline hover:text-red-600"
            rel="noreferrer noopener"
            href="/projects/fresher-_-reactjs-fresher/issues?set_filter=1"
          >
            View all issues
          </a>
        </li>
        <li>
          <a
            className="text-blue-800 hover:underline hover:text-red-600"
            rel="noreferrer noopener"
            href="/projects/fresher-_-reactjs-fresher/issues/report"
          >
            Summary
          </a>
        </li>

        <li>
          <a
            className="text-blue-800 hover:underline hover:text-red-600"
            rel="noreferrer noopener"
            href="/projects/fresher-_-reactjs-fresher/issues/calendar"
          >
            Calendar
          </a>
        </li>
        <li>
          <a
            className="text-blue-800 hover:underline hover:text-red-600"
            rel="noreferrer noopener"
            href="/projects/fresher-_-reactjs-fresher/issues/gantt"
          >
            Gantt
          </a>
        </li>
      </ul>

      <h3 className="text-sm text-black-200 font-medium mt-3.5 mb-2.5">
        Custom queries
      </h3>
      <ul>
        <li>
          <a
            className="text-xs text-blue-800 hover:underline hover:text-red-600"
            href="/projects/fresher-_-reactjs-fresher/issues?query_id=3229"
          >
            Ticket open by subProject
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SubIssues;
