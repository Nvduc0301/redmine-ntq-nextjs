import React, { useEffect } from 'react';
import images from '~/assets/img';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import Link from 'next/link';

import { formatDate } from '~/utils/FormatDay';
import { groupIssuesByDate } from '~/utils/GroupByDate';
import { HeaderTotalData } from '~/const/MyPage';
import { AppDispatch, RootState } from '~/store/store';
import { fetchSpentTime } from '~/store/slices/issues/SpentTimeSlice';

const TotalTime: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { SpentTime, loading: loadingSpentTime } = useSelector(
    (state: RootState) => state.SpentTime
  );
  useEffect(() => {
    if (SpentTime?.length === 0) {
      dispatch(fetchSpentTime());
    }
  }, [dispatch, SpentTime?.length]);

  // data table
  const groupedIssues = groupIssuesByDate(SpentTime);
  // total time
  const totalHours = Object.values(groupedIssues).reduce(
    (sum, { totalHours }) => sum + totalHours,
    0
  );

  return (
    <div>
      {loadingSpentTime ? (
        <div className="flex justify-center items-center h-24">
          <RingLoader color="#34d2c8" speedMultiplier={2} />
        </div>
      ) : (
        <>
          <div className="flex justify-between my-3">
            <h2 className=" font-bold text-[#505050]">
              Total time:<span>{totalHours.toFixed(2)}</span>
            </h2>
            <Link
              href="/log-time"
              className="flex items-center gap-1 text-primary text-11 hover:underline hover:text-red-400"
              rel="noreferrer noopener"
            >
              <Image src={images.add} alt="add" />
              <span>Log time</span>
            </Link>
          </div>
          <table className="min-w-full divide-gray-200 border border-gray-300">
            <thead className="bg-primary-sub_bg h-7">
              <tr>
                {HeaderTotalData.map((data) => (
                  <th
                    key={data.id}
                    className="p-1 text-xs border border-primary-border"
                  >
                    {data.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 h-6">
              {Object.keys(groupedIssues).map((date) => {
                return (
                  <React.Fragment key={date}>
                    <tr className={'hover:bg-[#ffffdd] bg-[#f6f7f8]'}>
                      <td className="p-1 text-center text-xs font-medium text-gray-900 border border-primary-border">
                        {formatDate(date)}
                      </td>
                      <td
                        colSpan={2}
                        className="col-span p-1 text-left text-xs border border-primary-border"
                      ></td>
                      <td className="p-1 text-center text-xs border border-primary-border">
                        {groupedIssues[date].totalHours.toFixed(2)}
                      </td>
                      <td className="p-1 text-center text-xs border border-primary-border"></td>
                    </tr>
                    {groupedIssues[date].issues.map((issue) => (
                      <tr key={issue.id} className={'hover:bg-[#ffffdd]'}>
                        <td className="p-1 text-center text-xs font-medium text-gray-900 border border-primary-border">
                          {issue.activity.name}
                        </td>
                        <td className="p-1 text-center text-xs border border-primary-border">
                          {issue.project.name}
                        </td>
                        <td className="p-1 text-left text-xs border border-primary-border">
                          {issue.comments}
                        </td>
                        <td className="p-1 text-center text-xs border border-primary-border">
                          {issue.hours.toFixed(2)}
                        </td>
                        <td className="flex justify-center gap-1 p-1 text-xs border border-primary-border">
                          <Link href="" rel="noreferrer noopener">
                            <Image src={images.edit} alt="edit" />
                          </Link>
                          <Link href="" rel="noreferrer noopener">
                            <Image src={images.remove} alt="delete" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TotalTime;
