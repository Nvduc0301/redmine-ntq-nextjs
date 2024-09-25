'use client';

import React, { useEffect, useState } from 'react';
import { getMembers, getTrackerQuantity } from '~/services/ProjectService';
import Image from 'next/image';
import images from '~/assets/img';
import { RingLoader } from 'react-spinners';
import Link from 'next/link';
import { setLocalMembers } from '~/store/slices/users/memberSlice';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { Member, TrackerItem } from '~/types/Project';
interface OverviewProps {
  identifier: string;
}

const Overview: React.FC<OverviewProps> = () => {
  const pathname = usePathname();
  const identifier = pathname.split('/')[2];
  const [members, setMembers] = useState<Member[]>([]);
  const [trackerQuantity, setTrackerQuantity] = useState<TrackerItem[]>([]);

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const links = [
    { href: `/projects/${identifier}/issues`, text: 'View all issues' },
    { href: `/projects/${identifier}/calendar`, text: 'Calendar' },
    { href: `/projects/${identifier}/gantt`, text: 'Gantt' },
  ];

  useEffect(() => {
    fetchData();
  }, [identifier, dispatch]);

  const fetchData = async () => {
    try {
      const [membersResult, trackerResult] = await Promise.all([
        getMembers(identifier),
        getTrackerQuantity(identifier),
      ]);
      setMembers(membersResult);
      setTrackerQuantity(trackerResult);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  dispatch(setLocalMembers(members));

  const filterMembersByRole = (roleName: string) => {
    return members.filter((member) =>
      member.roles.some((role) => role.name === roleName)
    );
  };

  const managers = filterMembersByRole('Manager');
  const developers = filterMembersByRole('Developer');

  const trackerCount = trackerQuantity.reduce<Record<string, number>>(
    (acc, issue) => {
      const trackerName = issue.tracker.name;
      if (acc[trackerName]) {
        acc[trackerName]++;
      } else {
        acc[trackerName] = 1;
      }
      return acc;
    },
    {}
  );

  return (
    <div>
      <h2 className="text-[#555] text-lg text-5 font-semibold">Overview</h2>
      {loading ? (
        <div className="flex justify-center items-center h-24">
          <RingLoader color="#34d2c8" speedMultiplier={2} />
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="mr-2 border border-gray-300 border-solid w-1/2">
            <div className="p-2.5">
              <div className="flex items-center">
                <Image className="pr-1.5" src={images.ticket} alt="ticket" />
                <h3 className="text-primary-text font-medium">
                  Issue tracking
                </h3>
              </div>
              <ul className="text-xs pl-10 pt-2.5 list-disc">
                {Object.entries(trackerCount).map(([trackerName, count]) => (
                  <li key={trackerName} className="">
                    <a
                      className="text-primary cursor-pointer pr-1.5 hover:underline hover:text-[#b2290f]"
                      rel="noreferrer noopener"
                    >
                      {trackerName}
                    </a>
                    {` ${count} open / ${count}`}
                  </li>
                ))}
              </ul>
              <div className="text-xs flex pt-2.5">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="pl-1 text-primary cursor-pointer hover:underline hover:text-[#b2290f]"
                    rel="noreferrer noopener"
                  >
                    {link.text}
                    {index < links.length - 1 && ' |'}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mr-2 border border-gray-300 border-solid w-1/2">
            <div className="p-2.5">
              <div className="flex pb-3 items-center">
                <Image className="pr-1.5" src={images.group} alt="group" />
                <h3 className="text-primary-text font-medium">Members</h3>
              </div>
              <div className="text-xs">
                <p className="break-words w-auhref">
                  Manager:
                  {managers.map((manager) => (
                    <Link
                      href={`/users/${manager.user.id}`}
                      className="text-primary cursor-pointer  hover:underline hover:text-[#b2290f]"
                      key={manager.id}
                      rel="noreferrer noopener"
                    >
                      {manager.user.name},{' '}
                    </Link>
                  ))}
                </p>
                <p className="break-words max-w-[550px]">
                  Developer:
                  {developers.map((developer) => (
                    <Link
                      href={`/users/${developer.user.id}`}
                      className="text-primary cursor-pointer  hover:underline hover:text-[#b2290f]"
                      key={developer.id}
                      rel="noreferrer noopener"
                    >
                      {developer.user.name},{' '}
                    </Link>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
