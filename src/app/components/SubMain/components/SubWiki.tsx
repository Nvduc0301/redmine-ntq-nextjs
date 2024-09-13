import React from "react";
import { Link } from "react-router-dom";

const SubWiki = () => {
  return (
    <div>
      <h3 className="text-sm text-[#666] font-medium mt-3.5 mb-2.5">Wiki</h3>
      <ul className="text-xs">
        <li>
          <Link
            className="text-[#169] hover:underline hover:text-[#c61a1a]"
            rel="noreferrer noopener"
            to="/projects/fresher-_-reactjs-fresher/issues?set_filter=1"
          >
            Start page
          </Link>
        </li>
        <li>
          <Link
            className="text-[#169] hover:underline hover:text-[#c61a1a]"
            rel="noreferrer noopener"
            to="/projects/fresher-_-reactjs-fresher/issues/report"
          >
            Index by title
          </Link>
        </li>

        <li>
          <Link
            className="text-[#169] hover:underline hover:text-[#c61a1a]"
            rel="noreferrer noopener"
            to="/projects/fresher-_-reactjs-fresher/issues/calendar"
          >
            Index by date
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SubWiki;
