import Image from 'next/image';
import React from 'react';
import images from '~/assets/img';
import { Issue } from '~/types/Issue';
const linkStyle = 'text-primary-blue hover:text-red-500 hover:underline';
const CustomTooltip: React.FC<Issue> = (issue) => {
  return (
    <div>
      <div className="flex pb-5 items-center">
        <Image src={images.add} alt="" />
        <a href="#" className={linkStyle} rel="noreferrer noopener">
          {issue?.tracker.name} #{issue.id}
        </a>
        : {issue?.subject}
      </div>
      <div className="flex items-center gap-1">
        <span className="font-bold">Project:</span>
        <Image src={images.add} alt="" />
        <a href="#" className={linkStyle} rel="noreferrer noopener">
          {issue?.project.name}
        </a>
      </div>
      <div className="flex gap-1">
        <span className="font-bold">Status:</span>
        <span>{issue?.status?.name}</span>
      </div>
      <div className="flex gap-1">
        <span className="font-bold">Start date:</span>
        <span>{issue?.start_date}</span>
      </div>
      <div className="flex gap-1">
        <span className="font-bold">Due date:</span>
        <span>{issue?.due_date}</span>
      </div>
      <div className="flex gap-1">
        <span className="font-bold">Assignee:</span>
        <span>{issue?.assigned_to?.name}</span>
      </div>
      <div className="flex gap-1">
        <span className="font-bold">Priority:</span>
        <span>{issue?.priority?.name}</span>
      </div>
    </div>
  );
};

export default CustomTooltip;
