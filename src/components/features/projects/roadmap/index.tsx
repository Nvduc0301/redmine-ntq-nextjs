'use client';

// Roadmap.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import images from '~/assets/img';
import {
  getProjectVersions,
  getProjectVersionsIssues,
} from '~/services/RoadmapService';
import { RingLoader } from 'react-spinners'; // Import RingLoader
import { RootState } from '~/store/store';
import { setProjectVersions } from '~/store/slices/Roadmap/projectVersionSlice';
import { Issue, ProjectVersionsIssuesResponse } from '~/types/Project';
import { STATUS_OPEN, TRACKER_BUG, TRACKER_TASK } from './const';
import RelatedIssues from './RelatedIssues';

interface RoadmapProps {
  identifier: string;
}

const RoadmapPage: React.FC<RoadmapProps> = (props) => {
  const { identifier } = props;

  const dispatch = useDispatch();
  const projectVersions = useSelector(
    (state: RootState) => state.projectVersion.versions
  );
  const showClosed = useSelector(
    (state: RootState) => state.showClosed.showClosed
  );
  const showBug = useSelector((state: RootState) => state.showBug.showBug);
  const showTask = useSelector((state: RootState) => state.showTask.showTask);

  const [versionCount, setVersionCount] = useState<Record<number, number>>({});
  const [issuesByVersion, setIssuesByVersion] = useState<
    Record<number, { issues: Issue[]; totalHours: number; hours: number }>
  >({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProjectVersions();
  }, [dispatch, identifier]);

  const fetchProjectVersions = async () => {
    try {
      setLoading(true);
      const { data: projectVersionsData, projectId } =
        await getProjectVersions(identifier);
      dispatch(setProjectVersions(projectVersionsData));
      setLoading(false);
      if (projectId) {
        await fetchProjectVersionsIssues(projectId);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchProjectVersionsIssues = async (projectId: number) => {
    try {
      setLoading(true);
      const projectVersionsData: ProjectVersionsIssuesResponse =
        await getProjectVersionsIssues(projectId);
      const projectVersionDataIssues = projectVersionsData.issues;

      const fixedVersions = projectVersionDataIssues.map(
        (issue) => issue.fixed_version.id
      );

      const versionCount = fixedVersions.reduce(
        (acc, id) => {
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        },
        {} as Record<number, number>
      );

      const issuesByVersion = projectVersionDataIssues.reduce(
        (acc, issue) => {
          const versionId = issue.fixed_version.id;
          if (!acc[versionId]) {
            acc[versionId] = { issues: [], totalHours: 0, hours: 0 };
          }
          acc[versionId].issues.push(issue);
          acc[versionId].totalHours += issue.estimated_hours;
          acc[versionId].hours +=
            (issue.estimated_hours * issue.done_ratio) / 100;
          return acc;
        },
        {} as Record<
          number,
          { issues: Issue[]; totalHours: number; hours: number }
        >
      );

      setVersionCount(versionCount);
      setIssuesByVersion(issuesByVersion);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-gray-500 text-lg text-5 font-semibold mb-2 flex items-center justify-between">
        Roadmap
        <a className="flex items-center">
          <Image src={images.add} className="mr-1" alt="Add" />
          <p className="text-blue-300 text-xs font-normal">New version</p>
        </a>
      </h2>
      {loading ? ( // Conditional rendering for loading state
        <div className="flex justify-center items-center h-24">
          <RingLoader color="#34d2c8" speedMultiplier={2} />
        </div>
      ) : (
        projectVersions
          .filter(
            (projectVersion) =>
              showClosed || projectVersion.status === STATUS_OPEN
          )
          .map((projectVersion) => {
            const versionData = issuesByVersion[projectVersion.id];

            const totalHours = versionData?.totalHours || 0;
            const hoursCompleted = versionData?.hours || 0;
            const percentCompleted =
              totalHours > 0 ? (hoursCompleted / totalHours) * 100 : 0;

            return (
              <div className="mb-6" key={projectVersion.id}>
                <h3 className="flex items-center">
                  <Image
                    className="w-4 h-4"
                    src={images.imagePackage}
                    alt="Package"
                  />
                  <p className="text-blue-800 hover:underline hover:text-red-600 block text-base ml-1">
                    {projectVersion.name}
                  </p>
                </h3>
                <div className="text-sm mt-3 mb-2 flex items-center">
                  <strong className="text-black-500 text-5 font-bold pr-1.5">
                    days late
                  </strong>
                  <p className="text-black-500 text-xs">
                    {projectVersion.due_date}
                  </p>
                </div>
                <p className="mb-3 text-xs text-black-500">
                  {projectVersion.description}
                </p>
                {versionData && versionData.issues.length > 0 ? (
                  <div>
                    <div className="items-center">
                      <div className="flex items-center">
                        <table className="flex w-1/2">
                          <tbody className="w-full">
                            <tr className="flex">
                              <td
                                className="border border-gray-700 bg-green-300 h-4"
                                style={{ width: `${percentCompleted}%` }}
                              ></td>
                              <td
                                className="border border-gray-700 bg-gray-200 h-4"
                                style={{ width: `${100 - percentCompleted}%` }}
                              ></td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="text-xs text-black-500 pl-1">
                          {Math.round(percentCompleted)}%
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-primary">
                        <a>{versionCount[projectVersion.id] || 0} issues</a>
                        <p className="pr-1.5 pl-1.5">(0 closed -</p>
                        <a>{versionCount[projectVersion.id] || 0} open)</a>
                      </div>
                    </div>
                    <RelatedIssues
                      issues={versionData.issues}
                      showBug={showBug}
                      showTask={showTask}
                    />
                  </div>
                ) : (
                  <p className="text-xs text-black-500">
                    No issues for this version.
                  </p>
                )}
              </div>
            );
          })
      )}
    </div>
  );
};

export default RoadmapPage;
