'use client';

import { MenuItems, MenuItems2 } from '~/const/Menu';
// import React from "react";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Projects } from '~/const/Project';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = () => {
  const pathname = usePathname();
  // console.log(pathname.startsWith('/projects'));
  const router = useRouter();

  const excludedPaths = [
    '/projects/fresher-_-reactjs-fresher/overview',
    '/projects/fresher-_-reactjs-fresher/activity',
  ];
  const isProjectDetailPage = pathname.includes('/projects/');

  const identifier = pathname.split('/')[2];
  const slug = pathname.split('/')[3];
  // console.log(excludedPaths.includes(pathname));
  // console.log(isProjectDetailPage);

  const handleNavigation = (slug: string) => {
    router.push(`/projects/${identifier}/${slug}`);
  };

  return (
    <div className="">
      <div className=" flex items-center justify-between p-2 bg-primary-dark h-5 text-10">
        <ul className="flex text-white gap-2 font-bold ">
          {MenuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="hover:underline duration-150 list-none"
            >
              {item.label}
            </Link>
          ))}
        </ul>
        <ul className="flex text-white gap-2 font-bold">
          <li className="font-normal">
            Logged in as
            <Link href="" className="ml-1 font-bold" rel="noreferrer noopener">
              duc.nguyen14@ntq-solution.com.vn
            </Link>
          </li>
          {MenuItems2.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="hover:underline duration-150 list-none"
            >
              {item.label}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-between h-88  text-white bg-primary ">
        <div className="flex justify-between items-start pt-1 px-2 pb-5 ">
          {/* <h1 className="text-2xl font-bold">{title || "NTQ Redmine"}</h1> */}
          <h1 className="text-2xl font-bold">NTQ Redmine</h1>
          <div className="flex gap-2 text-black text-sm">
            <label className="text-white pr-2" htmlFor="search">
              Search:
            </label>
            <input id="search" className="" type="text" name="search" />
            <select className="text-black text-xs" defaultValue="*">
              <option value="*" hidden>
                Jump to a project...
              </option>
              <option value="redmine">Redmine</option>
              <option value="fresher">[Fresher]_ ReactJS Fresher</option>
            </select>
          </div>
        </div>

        {isProjectDetailPage && (
          <div className="flex gap-0.5 ml-2">
            {Projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleNavigation(project.slug)}
                className={`hover:underline text-xs duration-150 list-none px-3 py-1 font-bold ${slug === project.slug ? 'bg-primary-sub_bg text-[#555]' : 'bg-primary-light'}`}
              >
                {project.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
