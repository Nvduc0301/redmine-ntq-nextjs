import React from "react";
import { Link } from "react-router-dom";

const SubDocuments = () => {
  return (
    <div>
      <h3 className="text-sm text-[#666] font-medium mt-3.5 mb-2.5">Sort by</h3>
      <ul className="text-xs">
        <li>
          <Link
            className="text-[#169] hover:underline hover:text-[#c61a1a]"
            rel="noreferrer noopener"
            to="/projects/fresher-_-reactjs-fresher/issues?set_filter=1"
          >
            Category
          </Link>
        </li>
        <li>
          <Link
            className="text-[#169] hover:underline hover:text-[#c61a1a]"
            rel="noreferrer noopener"
            to="/projects/fresher-_-reactjs-fresher/issues/report"
          >
            Date
          </Link>
        </li>

        <li>
          <Link
            className="text-[#169] hover:underline hover:text-[#c61a1a]"
            rel="noreferrer noopener"
            to="/projects/fresher-_-reactjs-fresher/issues/calendar"
          >
            Title
          </Link>
        </li>
        <li>
          <Link
            className="text-[#169] hover:underline hover:text-[#c61a1a]"
            rel="noreferrer noopener"
            to="/projects/fresher-_-reactjs-fresher/issues/gantt"
          >
            Author
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SubDocuments;
