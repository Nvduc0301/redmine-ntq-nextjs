'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { MENU_ITEM_1, MENU_ITEM_2 } from '~/const/Menu';
import { PROJECT_TAB } from '~/const/Project';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isProjectDetailPage = pathname.includes('/projects/');
  const identifier = pathname.split('/')[2];
  const slug = pathname.split('/')[3];

  const handleNavigation = (slug: string) => {
    router.push(`/projects/${identifier}/${slug}`);
  };

  return (
    <div className="">
      <div className=" flex items-center justify-between p-2 bg-blue-400 h-5 text-10">
        <ul className="flex text-white gap-2 font-bold ">
          {MENU_ITEM_1.map((item) => (
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
          {MENU_ITEM_2.map((item) => (
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

      <div className="flex flex-col justify-between h-88  text-white bg-blue-300 ">
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
            {PROJECT_TAB.map((project) => (
              <button
                key={project.id}
                onClick={() => handleNavigation(project.slug)}
                className={`hover:underline text-xs duration-150 list-none px-3 py-1 font-bold ${slug === project.slug ? 'bg-primary-sub_bg text-[#555]' : 'bg-blue-200'}`}
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
