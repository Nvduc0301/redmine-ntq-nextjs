'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RingLoader } from 'react-spinners';

import { AppDispatch, RootState } from '~/store/store';
import { fetchTimeSpent } from '~/store/slices/issues/TimeSpentSlice';
import Link from 'next/link';
import images from '~/assets/img';
import Image from 'next/image';
import Select from '~/components/common/Select/Select';
import Detail from './Detail';
import Report from './Report';
import {
  AVAILABLE_COLUMNS,
  OPTIONS_DATE,
  OPTIONS_FILTER,
  OPTIONS_USER_1,
  OPTIONS_USER_2,
  SELECTED_COLUMNS,
} from './const';

const SpentTimeDetail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { timeSpent, loading: loadingSpent } = useSelector(
    (state: RootState) => state.timeSpent
  );
  const [tabPage, setTabPage] = useState<number>(0);
  const [isOptions, setIsOptions] = useState<boolean>(false);
  const [isFilters, setIsFilters] = useState<boolean>(false);

  const [availableColumns, setAvailableColumns] =
    useState<string[]>(AVAILABLE_COLUMNS);
  const [selectedColumns, setSelectedColumns] =
    useState<string[]>(SELECTED_COLUMNS);
  const [columnsDetail, setColumnsDetail] = useState<string[]>(selectedColumns);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  useEffect(() => {
    if (timeSpent?.length === 0) {
      dispatch(fetchTimeSpent()); // Update action
    }
  }, [dispatch]);

  const toggleState = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prevState) => !prevState);
  };

  // column mangement
  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const moveLeft = () => {
    setAvailableColumns((prevAvailable) => [
      ...prevAvailable,
      ...selectedValue,
    ]);
    setSelectedColumns((prevSelected) =>
      prevSelected.filter((col) => !selectedValue.includes(col))
    );
    setSelectedValue([]);
  };

  const moveRight = () => {
    setSelectedColumns((prevSelected) => [...prevSelected, ...selectedValue]);
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
    const newSelectedColumns = [
      ...selectedColumns.filter((col) => !selectedValue.includes(col)),
      ...selectedColumns.filter((col) => selectedValue.includes(col)),
    ];

    setSelectedColumns(newSelectedColumns);
  };

  const moveUp = () => {
    const newSelectedColumns = [...selectedColumns];

    // Iterate through the selected values in reverse to handle swaps correctly
    for (let i = selectedValue.length - 1; i >= 0; i--) {
      const value = selectedValue[i];
      const index = newSelectedColumns.indexOf(value);

      if (index > 0) {
        [newSelectedColumns[index - 1], newSelectedColumns[index]] = [
          newSelectedColumns[index],
          newSelectedColumns[index - 1],
        ];
      }
    }

    setSelectedColumns(newSelectedColumns);
  };

  const moveDown = () => {
    const newSelectedColumns = [...selectedColumns];

    // Iterate through the selected values in order to handle swaps correctly
    for (let i = 0; i < selectedValue.length; i++) {
      const value = selectedValue[i];
      const index = newSelectedColumns.indexOf(value);

      if (index !== -1 && index < newSelectedColumns.length - 1) {
        // Swap with the next item
        [newSelectedColumns[index], newSelectedColumns[index + 1]] = [
          newSelectedColumns[index + 1],
          newSelectedColumns[index],
        ];
      }
    }

    setSelectedColumns(newSelectedColumns);
  };

  const handleApply = () => {
    setColumnsDetail(selectedColumns);
  };

  return (
    <div>
      <div className="flex justify-between my-1">
        <Link
          className="text-blue-300 text-11 hover:underline hover:text-red-400"
          href="my-page/page_layout"
          rel="noreferrer noopener"
        >
          All projects »
        </Link>
        <Link
          href="/log-time"
          className="flex items-center gap-1 text-blue-300 text-11 hover:underline hover:text-red-400"
          rel="noreferrer noopener"
        >
          <Image src={images.logtime} alt="add" />
          <span>Log time</span>
        </Link>
      </div>
      <h1 className="text-[#555] text-xl font-semibold mb-3">Spent time</h1>
      {loadingSpent ? (
        <div className="flex justify-center items-center h-24">
          <RingLoader color="#34d2c8" speedMultiplier={2} />
        </div>
      ) : (
        <>
          <fieldset className="flex text-xs text-[#484848] py-2 px-3 border-t">
            <legend
              className="flex items-center cursor-pointer"
              onClick={() => toggleState(setIsFilters)}
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
                      <td className="flex items-center gap-1 w-1/6">
                        <input type="checkbox" id="date" />
                        <label htmlFor="date">Date</label>
                      </td>
                      <td className="flex items-center gap-1 w-1/6">
                        <Select
                          value="selectedValue"
                          className="h-6 text-xs text-black font-medium border border-primary-border rounded-none"
                          onChange={() => {
                            return 'selectedValue';
                          }}
                          options={OPTIONS_DATE}
                          label="Select an option"
                        />
                      </td>
                      <td></td>
                    </tr>
                    <tr className="flex items-center mb-1">
                      <td className="flex items-center gap-1 w-1/6">
                        <input type="checkbox" id="user" />
                        <label htmlFor="user">User</label>
                      </td>
                      <td className="flex items-center gap-1 w-1/4">
                        <Select
                          value="selectedValue"
                          className="h-6 text-xs text-black font-medium border border-primary-border rounded-none"
                          onChange={() => {
                            return 'selectedValue';
                          }}
                          options={OPTIONS_USER_1}
                          label="Select an option"
                        />
                      </td>
                      <td className="flex items-center gap-1 w-5/12">
                        <Select
                          value="selectedValue"
                          className="h-6 text-xs text-black font-medium border border-primary-border rounded-none w-full"
                          onChange={() => {
                            return 'selectedValue';
                          }}
                          options={OPTIONS_USER_2}
                          label="Select an option"
                        />
                      </td>
                      <td>
                        <Image src={images.bullet} alt="bullet" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="max-w-[40%] w-full flex justify-end items-start">
                  <div className="flex items-center gap-1">
                    <span className="text-nowrap">Add filter</span>
                    <Select
                      value="selectedValue"
                      className="h-6 text-xs text-black max-w-[204px] w-full font-medium border border-primary-border rounded-none mr-2 "
                      onChange={() => {
                        return 'selectedValue';
                      }}
                      options={OPTIONS_FILTER}
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
              onClick={() => toggleState(setIsOptions)}
            >
              <Image
                src={isOptions ? images.arrow_expanded : images.arrow_rightgrey}
                alt="arrow_down"
              />
              Options
            </legend>
            {isOptions && (
              <div className="flex items-center mt-1 ml-4">
                <span className="text-11 mr-1">Columns</span>
                <div className="flex flex-col">
                  <div className="text-gray-rain text-11 inline-block">
                    Available Columns
                  </div>
                  <Select
                    size={10}
                    className="h-full w-[150px] text-13 border border-[#d7d7d7]"
                    multiple
                    value={Array.isArray(selectedValue) ? selectedValue : []}
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
                    value={Array.isArray(selectedValue) ? selectedValue : []}
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

          <div className="flex items-center gap-1 my-4">
            <span
              onClick={handleApply}
              className="flex items-center gap-1 text-xs cursor-pointer text-primaryText hover:text-hoverText hover:underline"
            >
              <Image src={images.check} alt="check" />
              <span className="text-[#169] hover:underline hover:text-[#c61a1a]">
                Apply
              </span>
            </span>
            <span className="flex items-center gap-1 text-xs cursor-pointer text-primaryText hover:text-hoverText hover:underline">
              <Image src={images.reload} alt="reload" />
              <span className="text-[#169] hover:underline hover:text-[#c61a1a]">
                Clear
              </span>
            </span>
          </div>
          <ul className="flex items-center gap-2 text-xs font-semibold text-[#484848] px-2 border-b">
            <li
              onClick={() => setTabPage(0)}
              className={`relative top-[0.5px] border-t-1 border-x-1  rounded-tl-md rounded-tr-md p-1 z-100 cursor-pointer ${tabPage === 0 ? 'bg-[#fff]' : 'bg-[#f6f6f6] text-[#999] hover:bg-[#ffffdd]'}`}
            >
              Detail
            </li>
            <li
              onClick={() => setTabPage(1)}
              className={`relative top-[0.5px] border-t-1 border-x-1  rounded-tl-md rounded-tr-md p-1 z-100 cursor-pointer ${tabPage === 1 ? 'bg-[#fff]' : 'bg-[#f6f6f6] text-[#999] hover:bg-[#ffffdd]'}`}
            >
              Report
            </li>
          </ul>
          <div>
            {tabPage === 0 ? (
              <Detail selectedColumns={columnsDetail} data={timeSpent} />
            ) : (
              <Report />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SpentTimeDetail;
