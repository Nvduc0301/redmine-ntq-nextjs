import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import images from '~/assets/img';

import { RootState } from '~/store/store';
import ApplyButton from './components/ApplyButton';
import ShowBugCheckbox from './components/ShowBugCheckbox';
import ShowClosedCheckbox from './components/ShowClosedCheckbox';
import ShowTaskCheckbox from './components/ShowTaskCheckbox';

const SubRoadmap = () => {
  const [isOpenArrow, setIsOpenArrow] = useState(false);
  const projectVersions = useSelector(
    (state: RootState) => state.projectVersion.versions
  );
  const showClosed = useSelector(
    (state: RootState) => state.showClosed.showClosed
  );

  const handleToggleArrow = () => {
    setIsOpenArrow(!isOpenArrow);
  };

  const openVersions = projectVersions.filter(
    (version) => version.status === 'open'
  );
  const closedVersions = projectVersions.filter(
    (version) => version.status === 'closed'
  );

  return (
    <div className="ml-5">
      <h3 className="text-xs text-[#666] font-semibold mt-3.5 mb-2.5">
        Roadmap
      </h3>
      <div className="mt-2 text-xs">
        <ShowBugCheckbox />
        <ShowTaskCheckbox />
        <ShowClosedCheckbox />
      </div>
      <ApplyButton />
      <h3 className="text-xs text-[#666] font-semibold mt-3.5 mb-2.5">
        Versions
      </h3>
      {openVersions.map((version) => (
        <a
          key={version.id}
          rel="noreferrer noopener"
          className="text-primary hover:underline hover:text-[#b2290f] block text-xs"
        >
          {version.name}
        </a>
      ))}
      {showClosed &&
        closedVersions.map((version) => (
          <a
            key={version.id}
            rel="noreferrer noopener"
            className="text-primary hover:underline hover:text-[#b2290f] block text-xs"
          >
            {version.name}
          </a>
        ))}
      <a
        className="flex cursor-pointer mt-2.5"
        onClick={handleToggleArrow}
        rel="noreferrer noopener"
      >
        {!isOpenArrow ? (
          <Image src={images.arrow_rightgrey} alt="Arrow right" />
        ) : (
          <Image src={images.arrow_downgrey} alt="Arrow down" />
        )}
        <p className="text-xs text-[#999]">Completed versions</p>
      </a>
      {!showClosed &&
        isOpenArrow &&
        closedVersions.map((version) => (
          <a
            key={version.id}
            className="text-primary hover:underline hover:text-[#b2290f] block text-xs pt-2"
          >
            {version.name}
          </a>
        ))}
    </div>
  );
};

export default SubRoadmap;
