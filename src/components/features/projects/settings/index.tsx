'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import images from '~/assets/img';
import { getVersions } from '~/services/ProjectService';
import { formatDate } from '~/utils/FormatDay';
import { Settings } from './types';
import { HEADER_SETTINGS } from './const';

interface SettingsPageProps {
  identifier: string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ identifier }) => {
  const [versions, setVersions] = useState<Settings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(identifier);
  useEffect(() => {
    fetchVersions();
  }, [identifier]);

  const fetchVersions = async () => {
    try {
      const response = await getVersions(identifier);
      setVersions(response);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl text-gray-500 mb-2.5 font-medium">Settings</h2>
      <ul className="flex items-center gap-2 text-xs font-semibold text-black-500 px-2 border-b mb-4">
        <li className="bg-white relative top-[0.5px] border-t-1 border-x-1  rounded-tl-md rounded-tr-md p-1 z-100 cursor-pointer ">
          Versions
        </li>
      </ul>
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-gray-200">
            {HEADER_SETTINGS.map((setting) => (
              <th className="border border-gray-350">{setting.label}</th>
            ))}
            <th className="border border-gray-350"></th>
          </tr>
        </thead>
        <tbody>
          {versions.map((version: Settings) => (
            <tr key={version.id}>
              <td className="text-blue-800 hover:underline hover:text-red-600 border border-gray-350 text-center">
                <Link href={`/versions/${version.id}`} title={version.name}>
                  {version.name}
                </Link>
              </td>
              <td className="border border-gray-350 text-center">
                {formatDate(version.due_date, true)}
              </td>
              <td className="border border-gray-350 text-center">
                {version.description}
              </td>
              <td className="border border-gray-350 text-center">
                {version.status}
              </td>
              <td className="border border-gray-350 text-center">
                {version.sharing}
              </td>
              <td className="text-blue-800 hover:underline hover:text-red-600 border border-gray-350 text-center">
                <Link href={`/versions/${version.id}`} title={version.name}>
                  {version.description}
                </Link>
              </td>
              <td className="flex items-center gap-1.5 justify-center border border-gray-350">
                <Link
                  href="/attachments/43995"
                  className="flex items-center gap-1 text-blue-800 hover:underline hover:text-red-600"
                  rel="nofollow"
                >
                  <Image alt="Edit" src={images.edit} />
                  <span>Edit</span>
                </Link>
                <Link
                  href="/attachments/43995"
                  className="flex items-center gap-1 text-blue-800 hover:underline hover:text-red-600"
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
          <span className="text-blue-800 hover:underline hover:text-red-600">
            New version
          </span>
        </Link>
        <Link
          href=""
          className="text-blue-800 hover:underline hover:text-red-600"
        >
          Close completed versions
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
