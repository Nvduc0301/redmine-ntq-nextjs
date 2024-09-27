// src/components/Activity.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import Link from 'next/link';
import Image from 'next/image';

import images from '~/assets/img';
import { RootState } from '~/store/store';
import Nodata from '~/components/common/Nodata/Nodata';
import { getIssueSchedule } from '~/services/IssueService';
import { getWiki, timeEntries } from '~/services/ProjectService';
import { Issue } from '~/types/Issue';
import { formatDate, formatTime } from '~/utils/FormatDay';
import { DataSample, Time, Wikis } from './types';
import { FILTERS, IMAGE_ALT_TEXT } from './const';

type ActivityProps = {
  identifier: string;
};

const ActivityPage: React.FC<ActivityProps> = (props) => {
  const { identifier } = props;

  const [time, setTime] = useState<Time[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [wikis, setWikis] = useState<Wikis[]>([]);
  const [data, setData] = useState<DataSample[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [minDate, setMinDate] = useState<string>('');
  const [maxDate, setMaxDate] = useState<string>('');

  const filters = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    fetchProjects();
  }, [identifier]);

  useEffect(() => {
    setData(transformData(issues, time, wikis));
  }, [issues, time, wikis]);

  useEffect(() => {
    if (data.length > 0) {
      setMinDate(data[data.length - 1].created_on);
    } else {
      setMinDate('');
    }
    setMaxDate(new Date().toLocaleDateString('en-CA'));
  }, [data]);

  const fetchProjects = async () => {
    try {
      const [issuesResult, timeResult, wikiEdit] = await Promise.all([
        getIssueSchedule(),
        timeEntries(identifier),
        getWiki(identifier),
      ]);
      setIssues(issuesResult);
      setTime(timeResult);
      // Ensure wikiEdit is an array
      if (Array.isArray(wikiEdit)) {
        setWikis(wikiEdit);
      } else {
        setWikis([wikiEdit]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const transformData = (
    issues: Issue[],
    time: Time[],
    wikis: Wikis[]
  ): DataSample[] => {
    const issuesDataSample: DataSample[] = issues.map((issue) => ({
      title: issue.subject || '',
      type: FILTERS.ISSUES,
      description: issue.description || '',
      author: {
        id: issue.author?.id ?? 0,
        name: issue.author?.name || '',
      },
      created_on: issue.created_on || '',
      trackerName: issue.tracker.name || '',
      statusName: issue.status?.name || '',
      subject: issue.subject || '',
      id: issue.id ?? 0,
    }));

    const timeEntriesDataSample: DataSample[] = time.map((entry) => {
      const relatedIssue = entry.issue
        ? issues.find((issue) => issue.id === entry.issue?.id)
        : undefined;
      return {
        title: entry.activity?.name || '',
        type: FILTERS.TIME_ENTRIES,
        description: entry.comments || '',
        author: {
          id: entry.user.id,
          name: entry.user.name,
        },
        created_on: entry.created_on || '',
        hours: entry.hours,
        trackerName: relatedIssue?.tracker.name || '',
        statusName: relatedIssue?.status?.name || '',
        subject: relatedIssue?.subject || '',
        id: entry.issue?.id ?? 0,
      };
    });

    const wikiDataSample: DataSample[] = wikis.map((wiki) => ({
      title: wiki.title || '',
      type: FILTERS.WIKI,
      description: '',
      author: {
        id: wiki.author.id,
        name: wiki.author.name,
      },
      created_on: wiki.created_on || '',
      version: wiki.version,
    }));

    return [...issuesDataSample, ...timeEntriesDataSample, ...wikiDataSample];
  };

  const groupByDate = (
    data: DataSample[],
    filters: {
      showIssues: boolean;
      showTimeEntries: boolean;
      showWikiEdits: boolean;
    }
  ) => {
    const groupedData = data.reduce(
      (acc, item) => {
        // Filter items based on the type
        if (
          (item.type === FILTERS.ISSUES && filters.showIssues) ||
          (item.type === FILTERS.TIME_ENTRIES && filters.showTimeEntries) ||
          (item.type === FILTERS.WIKI && filters.showWikiEdits)
        ) {
          const date = item.created_on.split('T')[0];
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
        }
        return acc;
      },
      {} as Record<string, DataSample[]>
    );

    // Sort items in each date group by time (created_on)
    Object.keys(groupedData).forEach((date) => {
      groupedData[date].sort(
        (a, b) =>
          new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
      );
    });

    // Sort the dates in descending order
    return Object.keys(groupedData)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .map((date) => ({ date, items: groupedData[date] }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1 text-[#555]">Activity</h2>
      {loading ? (
        <div className="flex justify-center items-center h-24">
          <RingLoader color="#34d2c8" speedMultiplier={2} />
        </div>
      ) : (
        <>
          {minDate && (
            <div className="text-xs italic mb-3">
              From {formatDate(minDate, true)} to {formatDate(maxDate, true)}
            </div>
          )}
          {groupByDate(data, filters).length > 0 ? (
            <>
              {groupByDate(data, filters).map(({ date, items }) => (
                <div key={date} className="mb-4">
                  <h2 className="font-semibold mb-2 text-[#555]">
                    {formatDate(date)}
                  </h2>
                  <div className="ml-6 my-3">
                    {items.map((item, index) => (
                      <div key={index} className="flex items-start mb-2.5">
                        <Image
                          src={
                            item.type === FILTERS.ISSUES
                              ? images.ticket_overview
                              : item.type === FILTERS.TIME_ENTRIES
                                ? images.time
                                : images.wiki
                          }
                          alt={
                            item.type === FILTERS.ISSUES
                              ? IMAGE_ALT_TEXT.TICKET
                              : item.type === FILTERS.TIME_ENTRIES
                                ? IMAGE_ALT_TEXT.TIME
                                : IMAGE_ALT_TEXT.WIKI
                          }
                        />
                        <Image
                          className="border border-primary-border mr-3 ml-1.5 p-0.5"
                          src={images.avatar}
                          alt={IMAGE_ALT_TEXT.AVATAR}
                        />
                        <div className="flex flex-col justify-center items-start">
                          <div className="flex items-end gap-1">
                            <span className="text-10 text-[#777]">
                              {formatTime(item.created_on)}
                            </span>
                            {item.type === FILTERS.ISSUES ? (
                              <a
                                className="text-xs text-[#169] font-medium cursor-pointer hover:underline hover:text-[#b2290f]"
                                href={`/issues/${item.id}`}
                              >
                                {item.trackerName} #{item.id} ({item.statusName}
                                ): {item.subject}
                              </a>
                            ) : item.type === FILTERS.TIME_ENTRIES ? (
                              <span className="text-xs text-[#169] font-medium">
                                {(item.hours ?? 0).toFixed(2)} hours
                                {item.id ? (
                                  <>
                                    {' '}
                                    {item.trackerName} #{item.id} (
                                    {item.statusName}): {item.subject}
                                  </>
                                ) : (
                                  '(Project: [Fresher]_ ReactJS Fresher)'
                                )}
                              </span>
                            ) : item.type === FILTERS.WIKI ? (
                              <span className="text-xs text-[#169] font-medium">
                                <Link href="/projects/fresher-_-reactjs-fresher/wiki/Wiki/1">
                                  Wiki edit: {item.title} (#{item.version})
                                </Link>
                              </span>
                            ) : (
                              <span className="text-xs text-[#169] font-medium">
                                Nodata
                              </span>
                            )}
                          </div>
                          <span className="text-11 italic text-[#808080]">
                            {item.description}
                          </span>
                          <a
                            href={`/users/${item.author.id}`}
                            className="text-11 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]"
                          >
                            {item.author.name}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Nodata />
          )}

          <Link
            className="text-xs text-[#169] hover:underline hover:text-red-400 mt-3"
            href="/projects/fresher-_-reactjs-fresher/activity?from=2024-07-02"
            title="From 06/03/2024 to 07/02/2024"
          >
            « Previous
          </Link>
          <div className="flex items-center gap-1 justify-end text-11 mb-2">
            <span>Also available in:</span>
            <Link
              className="flex items-center gap-1 text-[#169] hover:underline hover:text-red-400"
              href=""
              rel="noreferrer noopener"
            >
              <Image src={images.feed} alt="feed" />
              Atom
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityPage;
