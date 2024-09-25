'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Select from '~/components/common/Select/Select';
import images from '~/assets/img';
import { OPTIONS_FILTER_ISSUES, OPTIONS_STATUS_1 } from '~/const/Project';

const Gantt = () => {
  const [isOptions, setIsOptions] = useState(false);
  const [isFilters, setIsFilters] = useState(false);

  const [availableColumns, setAvailableColumns] = useState([
    'product category',
    'target',
    'similar',
    'cause',
    'solution',
    'process',
    'from customer',
    'version',
    'functionId',
    'bug type',
    'severity',
    'testCaseId',
    'purpose',
    'department',
    'duplicate issue',
    'tested ok',
    'qna related',
    'difficulty',
    'test on staging ok',
    'defect origin',
    'qc activity',
    'defect type',
    'cause category',
    'main pic',
    'reviewer',
    'defect author',
    'release date',
    'merge to cr',
    'customer',
    'expected revenue ($)',
    '% success',
    'sale',
    'why not find out?',
    'next due date',
    'next action',
    'builded',
    'current state',
    'test checklist',
    'reproduce?',
    'after refactor',
    'swat',
    'test environment',
    'late release',
    'release note',
    'dev_ self tested ok?',
    'contract type',
    'project line',
    'business domain',
    'technology',
    'project size (mm)',
    'team size (mm)',
    'is degrade?',
    'cause (lost/closed/pending)',
    'new customer?',
    'reopen count',
    'new customer info',
    'customer type',
    'pic os',
    'đánh giá của am',
    'đánh giá của os',
    'market',
    'certainty',
    "opp's type",
    'service offering',
    'release ok',
  ]);
  const [selectedColumns, setSelectedColumns] = useState([
    'Status',
    'Priority',
    'Tracker',
    'Subject',
    'issues',
    'comment',
    'hours',
  ]);
  const [selectedValue, setSelectedValue] = useState<string | string[]>('');

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const toggleOption = () => {
    setIsOptions((prevState) => !prevState);
  };

  const toggleFilter = () => {
    setIsFilters((prevState) => !prevState);
  };

  const moveLeft = () => {
    setAvailableColumns((prevAvailable) => [
      ...prevAvailable,
      ...selectedColumns.filter((col) => selectedValue.includes(col)),
    ]);
    setSelectedColumns((prevSelected) =>
      prevSelected.filter((col) => !selectedValue.includes(col))
    );
    setSelectedValue([]);
  };

  const moveRight = () => {
    setSelectedColumns((prevSelected) => [
      ...prevSelected,
      ...availableColumns.filter((col) => selectedValue.includes(col)),
    ]);
    setAvailableColumns((prevAvailable) =>
      prevAvailable.filter((col) => !selectedValue.includes(col))
    );
    setSelectedValue([]);
  };

  const moveTop = () => {
    // Move the selected columns to the top of the selectedColumns array
    const newSelectedColumns = [
      ...selectedColumns.filter((col) => selectedValue.includes(col)),
      ...selectedColumns.filter((col) => !selectedValue.includes(col)),
    ];

    setSelectedColumns(newSelectedColumns);
  };

  const moveBottom = () => {
    const newSelectedColumns = [...selectedColumns];

    // Ensure selectedValue is always treated as an array
    const selectedArray = Array.isArray(selectedValue)
      ? selectedValue
      : [selectedValue];

    const columnsToMove = selectedArray.filter((value) =>
      newSelectedColumns.includes(value)
    );
    const otherColumns = newSelectedColumns.filter(
      (col) => !columnsToMove.includes(col)
    );

    setSelectedColumns([...otherColumns, ...columnsToMove]);
  };

  const moveUp = () => {
    const newSelectedColumns = [...selectedColumns];

    // Iterate through the selected values in reverse to handle swaps correctly
    for (let i = selectedValue.length - 1; i >= 0; i--) {
      const value = selectedValue[i];
      const index = newSelectedColumns.indexOf(value);

      if (index > 0) {
        // Swap with the previous item
        const temp = newSelectedColumns[index - 1];
        newSelectedColumns[index - 1] = newSelectedColumns[index];
        newSelectedColumns[index] = temp;
      }
    }

    setSelectedColumns(newSelectedColumns);
  };

  const moveDown = () => {
    const newSelectedColumns = [...selectedColumns];
    for (let i = 0; i < selectedValue.length; i++) {
      const value = selectedValue[i];
      const index = newSelectedColumns.indexOf(value);
      if (index !== -1 && index < newSelectedColumns.length - 1) {
        const temp = newSelectedColumns[index + 1];
        newSelectedColumns[index + 1] = newSelectedColumns[index];
        newSelectedColumns[index] = temp;
      }
    }
    setSelectedColumns(newSelectedColumns);
  };

  return (
    <div>
      <h1 className="text-[#555] text-xl font-semibold mb-3">Gantt</h1>
      <fieldset className="flex text-xs text-[#484848] py-2 px-3 border-t">
        <legend
          className="flex items-center cursor-pointer"
          onClick={toggleFilter}
        >
          <Image
            src={isFilters ? images.arrow_rightgrey : images.arrow_expanded}
            alt="arrow_down"
            className=""
          />
          Filters
        </legend>
        {!isFilters && (
          <>
            <table className="max-w-[60%] w-full flex flex-col gap-1">
              <thead></thead>
              <tbody>
                <tr className="flex items-center mb-1">
                  <td className="flex items-center gap-1 w-4/12">
                    <input type="checkbox" id="date" />
                    <label htmlFor="date">Status</label>
                  </td>
                  <td className="flex items-center gap-1 w-4/12">
                    <Select
                      value="selectedValue"
                      className="h-6 text-xs text-black font-medium border border-primary-border rounded-none"
                      onChange={() => {
                        return 'selectedValue';
                      }}
                      options={OPTIONS_STATUS_1}
                      label="Select an option"
                    />
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className="max-w-[40%] w-full flex justify-end items-start">
              <div className="flex items-center gap-1">
                <span className="text-nowrap">Add filter</span>
                <Select
                  value="selectedValue"
                  className="h-6 text-xs text-black max-w-[204px] w-full font-medium border border-primary-border rounded-none mr-2 min-w-[210px] "
                  onChange={() => {
                    return 'selectedValue';
                  }}
                  options={OPTIONS_FILTER_ISSUES}
                  label="Select an option"
                  placeholder=" "
                />
              </div>
            </div>
          </>
        )}
      </fieldset>
      <fieldset className="flex text-xs text-[#484848] py-2 px-3">
        <legend
          className="flex items-center cursor-pointer"
          onClick={toggleOption}
        >
          <Image
            src={isOptions ? images.arrow_expanded : images.arrow_rightgrey}
            alt="arrow_down"
            className=""
          />
          Options
        </legend>
        {isOptions && (
          <div className="flex items-center mt-1 ml-4">
            <span className="text-gray-rain text-11 mr-1">Columns</span>
            <div className="flex flex-col">
              <div className="text-gray-rain text-11 inline-block">
                Available Columns
              </div>
              <Select
                size={10}
                className="h-full w-[150px] text-13 border border-[#d7d7d7]"
                defaultValue={[]}
                multiple
                value={selectedValue}
                onChange={handleMultiSelect}
                options={availableColumns.map((option) => ({
                  value: option,
                  label: option,
                }))}
              />
            </div>
            <div className="flex flex-col gap-0.5 mx-1">
              <input
                className="bg-[#f2f2f2] text-[#222] border border-[#cccccc] w-8 py-0.5 px-1.5"
                type="button"
                value="→"
                onClick={moveRight}
              />
              <input
                className="bg-[#f2f2f2] text-[#222] border border-[#cccccc] w-8 py-0.5 px-1.5"
                type="button"
                value="←"
                onClick={moveLeft}
              />
            </div>
            <div className="flex flex-col ">
              <div className="text-gray-rain text-11 inline-block">
                Selected Columns
              </div>
              <Select
                size={10}
                className="h-full w-[150px] text-13 border border-[#d7d7d7]"
                multiple
                value={selectedValue}
                defaultValue={[]}
                onChange={handleMultiSelect}
                options={selectedColumns.map((option) => ({
                  value: option,
                  label: option,
                }))}
              />
            </div>
            <div className="flex flex-col gap-0.5 ml-1">
              <input
                className="bg-[#f2f2f2] text-[#222] border border-[#cccccc] w-8 px-1.5 py-0.5"
                type="button"
                value="⇈"
                onClick={moveTop}
              />
              <input
                className="bg-[#f2f2f2] text-[#222] border border-[#cccccc] w-8 px-1.5 py-0.5"
                type="button"
                value="↑"
                onClick={moveUp}
              />

              <input
                className="bg-[#f2f2f2] text-[#222] border border-[#cccccc] w-8 px-1.5 py-0.5"
                type="button"
                value="↓"
                onClick={moveDown}
              />
              <input
                className="bg-[#f2f2f2] text-[#222] border border-[#cccccc] w-8 px-1.5 py-0.5"
                type="button"
                value="⇊"
                onClick={moveBottom}
              />
            </div>
          </div>
        )}
      </fieldset>
      <div className="flex items-center gap-1 my-4 ">
        <span className="flex items-center gap-1 text-xs text-[#169] hover:underline hover:text-[#c61a1a] cursor-pointer text-primaryText hover:text-hoverText ">
          <Image src={images.check} alt="check" />
          <span>Apply</span>
        </span>
        <span className="flex items-center gap-1 text-xs text-[#169] hover:underline hover:text-[#c61a1a] cursor-pointer text-primaryText hover:text-hoverText ">
          <Image src={images.reload} alt="reload" />
          <span>Clear</span>
        </span>
        <span className="flex items-center gap-1 text-xs text-[#169] hover:underline hover:text-[#c61a1a] cursor-pointer text-primaryText hover:text-hoverText ">
          <Image src={images.save} alt="reload" />
          <span>Save</span>
        </span>
      </div>

      <div className="flex items-center justify-between text-11">
        <span className="text-[#169] hover:underline hover:text-[#c61a1a]">
          « Previous
        </span>
        <span className="text-[#169] hover:underline hover:text-[#c61a1a]">
          Next »
        </span>
      </div>
      <div className="flex items-center gap-1 justify-end text-11 mb-2">
        <span>Also available in:</span>
        <a
          href=""
          className="text-[#169]  text-11 hover:underline hover:text-[#c61a1a]"
        >
          PDF
        </a>
        <span>|</span>
        <a
          href=""
          className="text-[#169]  text-11 hover:underline hover:text-[#c61a1a]"
        >
          PNG
        </a>
      </div>
    </div>
  );
};

export default Gantt;
