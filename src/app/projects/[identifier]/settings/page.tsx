'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import images from '~/assets/img';
import { getVersions } from '~/services/ProjectService';
import { formatDate } from '~/utils/FormatDay';
import Link from 'next/link';

interface SettingsProps {
  identifier: string;
}

interface Settings {
  id: number;
  version: string;
  name: string;
  sharing: string;
  status: string;
  date: string;
  description: string;
  updated_on: string;
  created_on: string;
  due_date: string;
  project: { id: number; name: string };
}

const Settings: React.FC<SettingsProps> = ({ identifier }) => {
  const [versions, setVersions] = useState<Settings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await getVersions(identifier);
        setVersions(response);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchVersions();
  }, [identifier]);

  console.log(versions, loading);
  return (
    <div>
      <h2 className="text-xl text-[#555] mb-2.5 font-medium">Settings</h2>
      <ul className="flex items-center gap-2 text-xs font-semibold text-[#484848] px-2 border-b mb-4">
        <li className="bg-[#fff] relative top-[0.5px] border-t-1 border-x-1  rounded-tl-md rounded-tr-md p-1 z-100 cursor-pointer ">
          Versions
        </li>
      </ul>
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-[#eee]">
            <th className="border border-[#d7d7d7]">Version</th>
            <th className="border border-[#d7d7d7]">Date</th>
            <th className="border border-[#d7d7d7]">Description</th>
            <th className="border border-[#d7d7d7]">Status</th>
            <th className="border border-[#d7d7d7]">Sharing</th>
            <th className="border border-[#d7d7d7]">Wiki page</th>
            <th className="border border-[#d7d7d7]"></th>
          </tr>
        </thead>
        <tbody>
          {versions.map((version: Settings) => (
            <tr key={version.id}>
              <td className="text-[#169] hover:underline hover:text-[#b2290f] border border-[#d7d7d7] text-center">
                <Link href={`/versions/${version.id}`} title={version.name}>
                  {version.name}
                </Link>
              </td>
              <td className="border border-[#d7d7d7] text-center">
                {formatDate(version.due_date, true)}
              </td>
              <td className="border border-[#d7d7d7] text-center">
                {version.description}
              </td>
              <td className="border border-[#d7d7d7] text-center">
                {version.status}
              </td>
              <td className="border border-[#d7d7d7] text-center">
                {version.sharing}
              </td>
              <td className="text-[#169] hover:underline hover:text-[#b2290f] border border-[#d7d7d7] text-center">
                <Link href={`/versions/${version.id}`} title={version.name}>
                  {version.description}
                </Link>
              </td>
              <td className="flex items-center gap-1.5 justify-center border border-[#d7d7d7]">
                <Link
                  href="/attachments/43995"
                  className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
                  rel="nofollow"
                >
                  <Image alt="Edit" src={images.edit} />
                  <span>Edit</span>
                </Link>
                <Link
                  href="/attachments/43995"
                  className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
                  rel="nofollow"
                >
                  <Image alt="Delete" src={images.remove} />
                  <span>Delete</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between text-xs my-3">
        <Link
          href={`/projects/${identifier}/new_versions`}
          className="flex items-center gap-1"
        >
          <Image src={images.add} alt="add" />
          <span className="text-[#169] hover:underline hover:text-[#b2290f]">
            New version
          </span>
        </Link>
        <Link
          href=""
          className="text-[#169] hover:underline hover:text-[#b2290f]"
        >
          Close completed versions
        </Link>
      </div>
    </div>
  );
};

export default Settings;
