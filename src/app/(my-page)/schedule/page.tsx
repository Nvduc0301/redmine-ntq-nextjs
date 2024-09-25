import { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';

import { getStartOfWeek, isToday } from '~/utils/FormatDay';
import { fetchIssuesSchedule } from '~/store/slices/issues/issuesScheduleSlice';
import { AppDispatch, RootState } from '~/store/store';
import CustomTooltip from '~/components/features/Schedule/CustomTooltip';
import { DAYS_OF_WEEK } from '~/const/MyPage';
import Image from 'next/image';
import images from '~/assets/img';

const Schedule: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { issuesSchedule, loading: loadingSchedule } = useSelector(
    (state: RootState) => state.issuesSchedule
  );
  useEffect(() => {
    if (issuesSchedule?.week.length === 0) {
      dispatch(fetchIssuesSchedule());
    }
  }, [dispatch, issuesSchedule?.week.length]);

  return (
    <>
      <p className="text-start mb-2 font-bold text-[#505050]">Calendar</p>
      {loadingSchedule ? (
        <div className="flex justify-center items-center h-24">
          <RingLoader color="#34d2c8" speedMultiplier={2} />
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 table-auto">
          <thead className="bg-primary-sub_bg h-7">
            <tr>
              <th className="w-7"></th>
              {DAYS_OF_WEEK.map((day) => (
                <th key={day.id} scope="col" className="p-1 text-xs">
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            <tr>
              <td className="bg-primary-sub_bg p-1 text-right align-top">
                {getStartOfWeek().week()}
              </td>
              {issuesSchedule?.week?.map((data, index) => {
                const currentDay = getStartOfWeek().clone().add(index, 'day');
                const dayClassName = isToday(currentDay) ? 'bg-yellow-50' : '';
                return (
                  <td
                    key={index}
                    className={`border border-gray-300 p-1 text-right align-top w-full sm:w-12 md:w-24 lg:w-32 xl:w-44 ${dayClassName}`}
                  >
                    {currentDay.format('DD')}
                    {data.tasks?.map((task, taskIndex) => (
                      <div
                        data-tooltip-id={`tooltip-${task.id}-${taskIndex}`}
                        data-tooltip-variant="light"
                        key={taskIndex}
                        data-tooltip-offset={-100}
                        className="min-h-16 p-4 bg-yellow-50 border border-gray-300 text-left mb-2 cursor-pointer"
                      >
                        <div className="text-xs">
                          {task.project.name} -
                          <Image
                            src={images.attachment}
                            alt=""
                            className="mx-1 inline align-middle"
                          />
                          <a
                            href="#"
                            className="text-primary-blue"
                            rel="noreferrer noopener"
                          >
                            {task?.tracker.name} #{task.id}
                          </a>
                          : {task.subject}
                        </div>
                        <Tooltip
                          id={`tooltip-${task.id}-${taskIndex}`}
                          clickable={true}
                          className="border"
                        >
                          <CustomTooltip {...task} />
                        </Tooltip>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default Schedule;
