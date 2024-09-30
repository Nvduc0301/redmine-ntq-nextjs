import React, { useState, useEffect } from 'react';
import images from '~/assets/img';
import { formatDate } from '~/utils/FormatDay';
import { TimeEntriesType } from '~/types/spentTime';
import { groupIssuesByDate } from '~/utils/GroupByDate';
import { getIssueSchedule } from '~/services/IssueService';
import { Issue } from '~/types/Issue';
import Image from 'next/image';
import { HEADERS, IMAGE_ALTS, SORT_ORDER } from './const';

type DetailProps = {
  data: TimeEntriesType[];
  selectedColumns: string[];
};

const Detail: React.FC<DetailProps> = ({ selectedColumns, data }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [sortOrder, setSortOrder] = useState<string>(SORT_ORDER.INCREASE);
  const [sortedData, setSortedData] = useState<TimeEntriesType[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const result = await getIssueSchedule();
      setIssues(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const convertColumn = (list: string[]) => {
    return list.map((item, index) => ({
      id: index + 1,
      label: item,
    }));
  };

  const MENU_HEADER_TABLE = convertColumn(selectedColumns);

  useEffect(() => {
    const sorted = sortData(data, sortOrder);
    setSortedData(sorted);
  }, [data, sortOrder]);

  const sortData = (
    data: TimeEntriesType[],
    order: string
  ): TimeEntriesType[] => {
    return data.slice().sort((a, b) => {
      const dateA = new Date(a.spent_on);
      const dateB = new Date(b.spent_on);
      return order === SORT_ORDER.INCREASE
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  };

  const handleSort = () => {
    setSortOrder(
      sortOrder === SORT_ORDER.INCREASE
        ? SORT_ORDER.DECREASE
        : SORT_ORDER.INCREASE
    );
  };

  const renderCellContent = (
    header: { label: string },
    item: TimeEntriesType,
    issue: Issue | undefined
  ) => {
    switch (header.label) {
      case HEADERS.DATE:
        return formatDate(item.spent_on, true);
      case HEADERS.PROJECT:
        return item.project.name;
      case HEADERS.USER:
        return item.user.name;
      case HEADERS.ACTIVITY:
        return item.activity.name;
      case HEADERS.ISSUES:
        return item.issue?.id ? (
          <>
            <a
              className="text-blue-300 hover:underline hover:text-red-400"
              href=""
              rel="noreferrer noopener"
            >
              {issue
                ? `${issue.tracker.name} #${issue.id}:`
                : `Bug #${item.issue.id}:`}
            </a>
            <div className="">{issue ? issue.subject : 'API issue'}</div>
          </>
        ) : null;
      case HEADERS.COMMENT:
        return item.comments;
      case HEADERS.HOURS:
        return item.hours.toFixed(2);
      default:
        return '';
    }
  };

  // total time
  const totalHours = Object.values(groupIssuesByDate(data)).reduce(
    (sum, { totalHours }) => sum + totalHours,
    0
  );

  return (
    <div>
      <h2 className="text-13 my-3 font-bold">
        Total time:<span> {totalHours.toFixed(2)}</span>
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className=" p-1 text-xs border border-gray-300">
              <Image src={images.check} alt={IMAGE_ALTS.CHECK} />
            </th>
            {MENU_HEADER_TABLE.map((header) => (
              <th
                key={header.id}
                className="text-blue-800 hover:underline hover:text-red-500 p-1 text-xs border border-gray-300 cursor-pointer"
                onClick={header.label === HEADERS.DATE ? handleSort : undefined}
              >
                {header.label}
                {header.label === HEADERS.DATE && (
                  <Image
                    src={
                      sortOrder === SORT_ORDER.INCREASE
                        ? images.arrow_up
                        : images.arrow_down
                    }
                    alt={
                      sortOrder === SORT_ORDER.INCREASE
                        ? IMAGE_ALTS.SORT_UP
                        : IMAGE_ALTS.SORT_DOWN
                    }
                    className="inline ml-1"
                  />
                )}
              </th>
            ))}
            <th className="p-1 text-xs border border-gray-300"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 h-6">
          {sortedData.map((item, index) => {
            const issue = issues.find((issue) => issue.id === item.issue?.id);

            return (
              <tr
                className={`${index % 2 === 0 ? 'bg-gray-150' : 'bg-white'} hover:bg-yellow-100`}
                key={item.id}
              >
                <td className="p-1 text-center text-xs border border-gray-300">
                  <input type="checkbox" />
                </td>
                {MENU_HEADER_TABLE.map((header) => (
                  <td
                    key={header.id}
                    className="p-1 text-start text-xs border border-gray-300"
                  >
                    {renderCellContent(header, item, issue)}
                  </td>
                ))}
                <td className="flex justify-center items-end pb-3 gap-1 p-1 text-xs border border-gray-300 ">
                  <a href="" className="h-full" rel="noreferrer noopener">
                    <Image src={images.edit} alt={IMAGE_ALTS.EDIT} />
                  </a>
                  <a href="" className="h-full" rel="noreferrer noopener">
                    <Image src={images.remove} alt={IMAGE_ALTS.DELETE} />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-11 text-black-500 my-2">
        (1-{data.length})/{data.length}
      </div>

      <div className="flex items-center gap-1 justify-end text-11 mb-2">
        <span>Also available in: CSV</span>
        <a
          className="flex items-center gap-1 text-blue-300 hover:underline hover:text-red-400"
          href=""
          rel="noreferrer noopener"
        >
          <Image src={images.feed} alt={IMAGE_ALTS.FEED} />
          Atom
        </a>
        <span>|</span>
        <a
          href=""
          className="text-blue-300  text-11 hover:underline hover:text-red-400"
          rel="noreferrer noopener"
        >
          CSV
        </a>
      </div>
    </div>
  );
};

export default Detail;
