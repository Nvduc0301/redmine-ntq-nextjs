// src/components/Activity.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import images from '~/assets/img';
import { OverviewProps, Time, Wikis } from '~/types/Project';
import { RootState } from '~/store/store';
import Nodata from '~/app/components/Nodata/Nodata';
import { getIssueSchedule } from '~/services/IssueService';
import { getWiki, timeEntries } from '~/services/ProjectService';
import { Issue } from '~/types/Issue';
import { formatDate, formatTime } from '~/utils/FormatDay';

interface DataSample {
  title: string;
  type: string;
  description: string;
  author: { id: number; name: string };
  created_on: string;
  trackerName?: string;
  statusName?: string;
  subject?: string;
  id?: number;
  hours?: number;
  version?: number;
}

const Activity: React.FC<OverviewProps> = () => {
  const [time, setTime] = useState<Time[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [wikis, setWikis] = useState<Wikis[]>([]);
  const [data, setData] = useState<DataSample[]>([]);
  const filters = useSelector((state: RootState) => state.filter);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const identifier = pathname.split('/')[2];
  useEffect(() => {
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
    fetchProjects();
  }, [identifier]);

  const groupByDate = (data: DataSample[]) => {
    const groupedData = data.reduce(
      (acc, item) => {
        const date = item.created_on.split('T')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
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

    return groupedData;
  };

  useEffect(() => {
    const issuesDataSample: DataSample[] = issues.map((issue) => ({
      title: issue.subject || '',
      type: 'issue',
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
        type: 'timeEntries',
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
      type: 'wiki',
      description: '',
      author: {
        id: wiki.author.id,
        name: wiki.author.name,
      },
      created_on: wiki.created_on || '',
      version: wiki.version,
    }));

    setData([...issuesDataSample, ...timeEntriesDataSample, ...wikiDataSample]);
  }, [issues, time, wikis]);

  const filteredData = data.filter((item) => {
    if (item.type === 'issue' && filters.showIssues) {
      return true;
    }
    if (item.type === 'timeEntries' && filters.showTimeEntries) {
      return true;
    }
    if (item.type === 'wiki' && filters.showWikiEdits) {
      return true;
    }
    return false;
  });

  const groupedData = groupByDate(filteredData);
  const sortedDates = Object.keys(groupedData).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const minDate = data.length > 0 ? data[data.length - 1].created_on : '';
  const maxDate = new Date().toLocaleDateString('en-CA');

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
          {sortedDates.length > 0 ? (
            <>
              {sortedDates.map((date) => (
                <div key={date} className="mb-4">
                  <h2 className="font-semibold mb-2 text-[#555]">
                    {formatDate(date)}
                  </h2>
                  <div className="ml-6 my-3">
                    {groupedData[date].map((item, index) => (
                      <div key={index} className="flex items-start mb-2.5">
                        <Image
                          src={
                            item.type === 'issue'
                              ? images.ticket_overview
                              : item.type === 'timeEntries'
                                ? images.time
                                : images.wiki
                          }
                          alt={
                            item.type === 'issue'
                              ? 'ticket'
                              : item.type === 'timeEntries'
                                ? 'time'
                                : 'wiki'
                          }
                        />
                        <Image
                          className="border border-primary-border mr-3 ml-1.5 p-0.5"
                          src={images.avatar}
                          alt="avatar"
                        />
                        <div className="flex flex-col justify-center items-start">
                          <div className="flex items-end gap-1">
                            <span className="text-10 text-[#777]">
                              {formatTime(item.created_on)}
                            </span>
                            {item.type === 'issue' ? (
                              <a
                                className="text-xs text-[#169] font-medium cursor-pointer hover:underline hover:text-[#b2290f]"
                                href={`/issues/${item.id}`}
                              >
                                {item.trackerName} #{item.id} ({item.statusName}
                                ): {item.subject}
                              </a>
                            ) : item.type === 'timeEntries' ? (
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
                            ) : item.type === 'wiki' ? (
                              <span className="text-xs text-[#169] font-medium">
                                <a href="/projects/fresher-_-reactjs-fresher/wiki/Wiki/1">
                                  Wiki edit: {item.title} (#{item.version})
                                </a>
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

export default Activity;
