'use client';

import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import Link from 'next/link';
import Image from 'next/image';

import images from '~/assets/img';
import { DAYS_OF_WEEK } from '~/const/MyPage';
import { OPTIONS_STATUS_1 } from '~/const/Project';
import { getLastWeekOfPreviousMonth, isToday } from '~/utils/FormatDay';
import { AppDispatch, RootState } from '~/store/store';
import Select from '~/components/common/Select/Select';
import { fetchIssuesSchedule } from '~/store/slices/issues/issuesScheduleSlice';
import CustomTooltip from '~/components/features/my-page/schedule/CustomTooltip';
import { filterOptions, statusOptions } from './const';

const CalendarPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { issuesSchedule, loading: loadingSchedule } = useSelector(
    (state: RootState) => state.issuesSchedule
  );

  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  useEffect(() => {
    if (issuesSchedule?.month.length === 0) {
      dispatch(fetchIssuesSchedule());
    }
  }, [dispatch, issuesSchedule?.month.length]);

  const handleToggleFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const generateDaysArray = (start: moment.Moment, daysCount: number) => {
    return Array.from({ length: daysCount }, (_, i) =>
      start.clone().add(i, 'days')
    );
  };

  const daysArray = generateDaysArray(getLastWeekOfPreviousMonth(), 35);
  return (
    <>
      <p className="text-start mb-2 font-bold">Calendar</p>

      {loadingSchedule ? (
        <div className="flex justify-center items-center h-24">
          <RingLoader speedMultiplier={2} />
        </div>
      ) : (
        <>
          <div>
            <fieldset className="mb-4">
              <legend
                onClick={handleToggleFilter}
                className="cursor-pointer pb-2 text-xs"
              >
                {!isOpenFilter ? (
                  <Image
                    className="inline w-3"
                    alt="collapsed"
                    src={images.arrow_rightgrey}
                  ></Image>
                ) : (
                  <Image
                    className="inline w-3"
                    alt="expanded"
                    src={images.arrow_downgrey}
                  ></Image>
                )}
                Filters
              </legend>
              {!isOpenFilter ? null : (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <input type="checkbox" id="cb_status_id" />
                    <label htmlFor="cb_status_id" className="pl-1 text-xs">
                      Status
                    </label>
                  </div>
                  <select
                    id="operators_status_id"
                    className="border border-gray-300 w-16 h-6 text-xs"
                  >
                    {statusOptions.map((option) => (
                      <option
                        key={option.value}
                        className="text-xs"
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <span></span>

                  <div>
                    <label htmlFor="add_filter_select" className="pr-1">
                      Add filter
                    </label>
                    <select
                      id="add_filter_select"
                      className="border border-gray-300 w-32 h-6 text-xs"
                    >
                      {filterOptions.map((option) => (
                        <option
                          key={option.value}
                          className="text-xs"
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </fieldset>
            <div className="flex items-center justify-between text-11 mt-3 mb-4 ">
              <div className="flex item-center gap-1">
                <div className="flex items-center gap-1">
                  <label htmlFor="month">Month</label>
                  <Select
                    value="selectedValue"
                    className="h-6 text-xs text-black font-medium border border-gray-300 rounded-none"
                    onChange={() => {
                      return 'selectedValue';
                    }}
                    options={OPTIONS_STATUS_1}
                    label="Select an option"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <label htmlFor="Year">Year</label>
                  <Select
                    value="selectedValue"
                    className="h-6 text-xs text-black font-medium border border-gray-300 rounded-none"
                    onChange={() => {
                      return 'selectedValue';
                    }}
                    options={OPTIONS_STATUS_1}
                    label="Select an option"
                  />
                </div>

                <div className="flex items-center gap-1 ">
                  <span className="flex items-center gap-1 text-xs text-blue-800 hover:underline hover:text-red-600 cursor-pointer text-primaryText hover:text-hoverText ">
                    <Image src={images.check} alt="check" />
                    <span>Apply</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs text-blue-800 hover:underline hover:text-red-600 cursor-pointer text-primaryText hover:text-hoverText ">
                    <Image src={images.reload} alt="reload" />
                    <span>Clear</span>
                  </span>
                </div>
              </div>
              <div className="">
                <Link
                  href="/projects/fresher-_-reactjs-fresher/issues/calendar?month=7&year=2024"
                  className="text-blue-800 hover:underline hover:text-red-600"
                >
                  « July
                </Link>
                <span>|</span>
                <Link
                  href="/projects/fresher-_-reactjs-fresher/issues/calendar?month=9&year=2024"
                  className="text-blue-800 hover:underline hover:text-red-600"
                >
                  September »
                </Link>
              </div>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 table-auto">
            <thead className="bg-gray-200 h-7">
              <tr>
                <th className="w-7"></th>
                {DAYS_OF_WEEK.map((day) => (
                  <th key={day.id} scope="col" className="p-1 text-xs">
                    {day.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {daysArray
                .reduce((rows, day, index) => {
                  if (index % DAYS_OF_WEEK.length === 0) {
                    rows.push([]);
                  }
                  rows[rows.length - 1].push(day);
                  return rows;
                }, [] as moment.Moment[][])
                .map((weekDays, weekIndex) => (
                  <tr key={weekIndex}>
                    <td className="bg-gray-200 p-1 text-right align-top">
                      {weekDays[0].clone().startOf('week').format('W')}
                    </td>
                    {weekDays.map((currentDay, dayIndex) => {
                      const dayData = issuesSchedule?.month?.find(
                        (data) => data.day === currentDay.format('YYYY-MM-DD')
                      );
                      const dayClassName = isToday(currentDay)
                        ? 'bg-yellow-50'
                        : '';
                      return (
                        <td
                          key={dayIndex}
                          className={`border border-gray-300 p-1 text-right align-top w-full sm:w-12 md:w-24 lg:w-32 xl:w-44 ${dayClassName}`}
                        >
                          {currentDay.format('DD')}
                          {dayData?.tasks?.map((task, taskIndex) => (
                            <div
                              data-tooltip-id={`tooltip-${task.id}-${taskIndex}`}
                              data-tooltip-variant="light"
                              key={taskIndex}
                              data-tooltip-offset={-100}
                              className="min-h-16 p-4 bg-yellow-50 border border-gray-300 text-left mb-2 cursor-pointer"
                            >
                              <div className=" text-11">
                                <Image
                                  src={images.add}
                                  alt=""
                                  className="mx-1 inline align-middle"
                                />
                                <a
                                  href="#"
                                  className="text-blue-600"
                                  rel="noreferrer noopener"
                                >
                                  {task?.tracker.name} #{task.id}
                                </a>
                                : {task.subject}
                              </div>
                              <Tooltip
                                id={`tooltip-${task.id}-${taskIndex}`}
                                clickable={true}
                              >
                                <CustomTooltip {...task} />
                              </Tooltip>
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="text-xs my-3">
            <span className="flex ">
              <Image src={images.arrow_right} alt="arrow right" />
              issue beginning this day
            </span>
            <span className="flex">
              <Image src={images.arrow_left} alt="arrow left" />
              issue ending this day
            </span>
            <span className="flex">
              <Image src={images.diamond} alt="diamond" />
              issue beginning and ending this day
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default CalendarPage;
