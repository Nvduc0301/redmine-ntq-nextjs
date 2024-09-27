import Image from 'next/image';
import React from 'react';
import Select from '~/components/common/Select/Select';
import images from '~/assets/img';
import { OPTIONS_ADD, OPTIONS_TIME } from './const';

const Report = () => {
  return (
    <div className="flex items-center text-xs gap-1 my-3 text-primary-text">
      <label>Details:</label>
      <Select
        value="selectedValue"
        className="h-6 text-xs text-black font-medium border border-primary-border rounded-none"
        onChange={() => {
          return 'selectedValue';
        }}
        options={OPTIONS_TIME}
        label="Select an option"
      />

      <label>Add:</label>
      <Select
        value="selectedValue"
        className="min-w-[210px] h-6 text-xs text-black font-medium border border-primary-border rounded-none"
        onChange={() => {
          return 'selectedValue';
        }}
        options={OPTIONS_ADD}
        label="Select an option"
      />

      <a
        className="flex items-center gap-1 text-blue-300 text-11 hover:underline hover:text-red-400"
        href="my/page_layout"
        rel="noreferrer noopener"
      >
        <Image src={images.reload} alt="reload" />
        Clear
      </a>
    </div>
  );
};

export default Report;
