'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import SubProject from './SubProject/SubProject';
import SubOverview from './components/SubOverview';
import SubActivity from './components/SubActivity';
import SubRoadmap from './components/SubRoadmap';
import SubIssues from './components/SubIssues';
import SubDocuments from './components/SubDocuments';
import SubWiki from './components/SubWiki';

const SubMain = () => {
  const pathname = usePathname();
  console.log(pathname);

  const renderContent = () => {
    // Xử lý logic render dựa trên `pathname`
    if (pathname === '/projects') {
      return <SubProject />;
    }

    // Kiểm tra pathname để render các component tương ứng
    if (pathname.endsWith('/overview')) {
      return <SubOverview />;
    } else if (pathname.endsWith('/activity')) {
      return <SubActivity />;
    } else if (pathname.endsWith('/roadmap')) {
      return <SubRoadmap />;
    } else if (
      pathname.endsWith('/issues') ||
      pathname.endsWith('/calendar') ||
      pathname.endsWith('/gantt')
    ) {
      return <SubIssues />;
    } else if (pathname.endsWith('/documents')) {
      return <SubDocuments />;
    } else if (pathname.endsWith('/wiki')) {
      return <SubWiki />;
    } else {
      return <div>Unknown section</div>;
    }
  };

  return <div className="w-1/4 pl-3">{renderContent()}</div>;
};

export default SubMain;
