'use client';

import React, { useEffect, useState, useContext } from 'react';
import { RingLoader } from 'react-spinners';
import Image from 'next/image';
import images from '~/assets/img';

import { OPTIONS_FILTER_ISSUES, OPTIONS_STATUS_1 } from '~/const/Project';
import { getIssueSchedule } from '~/services/IssueService';
import { Issue } from '~/types/Issue';
import { formatDateTime } from '~/utils/FormatDay';

import Select from '~/components/common/Select/Select';
import { ZIndexContext } from '~/components/common/Modal/ModalContext';
import ModalDetail from '~/components/common/Modal/ModalDetail';
import {
  AVAILABLE_COLUMNS,
  HEADER_TABLE_ISSUE,
  SELECTED_COLUMNS,
  SORT_ORDER,
} from './const';
import TableIssue from './TableIssue';

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [sortOrder, setSortOrder] = useState<string>(SORT_ORDER.INCREASE);
  const [isOptions, setIsOptions] = useState<boolean>(false);
  const [isFilters, setIsFilters] = useState<boolean>(false);
  const [availableColumns, setAvailableColumns] =
    useState<string[]>(AVAILABLE_COLUMNS);
  const [selectedColumns, setSelectedColumns] =
    useState<string[]>(SELECTED_COLUMNS);
  const [columnsDetail, setColumnsDetail] = useState<string[]>(selectedColumns); //
  const [selectedValue, setSelectedValue] = useState<string | string[]>(''); // Lưu trữ
  const [loading, setLoading] = useState<boolean>(true); //  loading

  const [modals, setModals] = useState<
    { issue: Issue; mousePosition: { x: number; y: number }; zIndex: number }[]
  >([]);
  const { zIndexCounter, incrementZIndex } = useContext(ZIndexContext);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const result = await getIssueSchedule();
      setIssues(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // handle option

  const handleSort = () => {
    const sortedIssues = [...issues];
    sortedIssues.sort((a, b) => {
      if (sortOrder === SORT_ORDER.INCREASE) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setIssues(sortedIssues);
    setSortOrder(
      sortOrder === SORT_ORDER.INCREASE
        ? SORT_ORDER.DECREASE
        : SORT_ORDER.INCREASE
    );
  };

  const toggleState = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prevState) => !prevState);
  };

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
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

  const handleApply = () => {
    setColumnsDetail(selectedColumns);
  };

  //

  const convertColumn = (list: string[]) => {
    return list.map((item, index) => ({
      id: index + 1,
      label: item,
    }));
  };

  const MENU_HEADER_TABLE = convertColumn(columnsDetail);

  const renderCellContent = (item: Issue, column: string) => {
    switch (column) {
      case HEADER_TABLE_ISSUE.INIT:
        return item.id;
      case HEADER_TABLE_ISSUE.STATUS:
        return item.status?.name;
      case HEADER_TABLE_ISSUE.PRIORITY:
        return item.priority?.name;
      case HEADER_TABLE_ISSUE.TRACKER:
        return item.tracker.name;
      case HEADER_TABLE_ISSUE.SUBJECT:
        return item.subject;
      case HEADER_TABLE_ISSUE.ASSIGNEE:
        return item.assigned_to?.name;
      case HEADER_TABLE_ISSUE.UPDATED:
        return formatDateTime(item.updated_on ?? '');
      case HEADER_TABLE_ISSUE.AUTHOR:
        return item.author?.name;
      default:
        return '';
    }
  };

  // handle dialog
  const onDoubleClick = (
    issue: Issue,
    event: React.MouseEvent<HTMLTableRowElement>
  ) => {
    const { clientX, clientY } = event;
    const isIssueAlreadyOpen = modals.some(
      (modal) => modal.issue.id === issue.id
    );
    if (!isIssueAlreadyOpen) {
      incrementZIndex();
      const newModal = {
        issue,
        mousePosition: { x: clientX, y: clientY },
        zIndex: zIndexCounter,
      };
      setModals((prevModals) => [...prevModals, newModal]);
    }
  };

  const bringToFront = (id: number) => {
    incrementZIndex();
    setModals((prevModals) => {
      const updatedModals = prevModals.map((modal) =>
        modal.issue.id === id ? { ...modal, zIndex: zIndexCounter } : modal
      );
      return updatedModals;
    });
  };

  const closeModal = (issueToClose: Issue) => {
    setModals((prevModals) =>
      prevModals.filter((modal) => modal.issue.id !== issueToClose.id)
    );
  };

  return (
    <div>
      <h1 className="text-[#555] text-xl font-semibold mb-3">Issues</h1>
      {loading ? (
        <div className="flex justify-center items-center my-4">
          <RingLoader color="#34d2c8" />
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
                      <td className="flex items-center gap-1 w-4/12">
                        <input type="checkbox" id="date" />
                        <label htmlFor="date">Date</label>
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
                      className="h-6 text-xs text-black max-w-52 w-full font-medium border border-primary-border rounded-none mr-2 min-w-[210px] "
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
              onClick={() => toggleState(setIsOptions)}
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
          <div className="flex items-center gap-1 my-4 ">
            <span
              onClick={handleApply}
              className="flex items-center gap-1 text-xs text-[#169] hover:underline hover:text-[#c61a1a] cursor-pointer text-primaryText hover:text-hoverText "
            >
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

          <TableIssue
            issues={issues}
            sortOrder={sortOrder}
            handleSort={handleSort}
            onDoubleClick={onDoubleClick}
            renderCellContent={renderCellContent}
            MENU_HEADER_TABLE={MENU_HEADER_TABLE}
          />
          {modals.map((modalData, index) => (
            <ModalDetail
              key={index}
              modal={() => closeModal(modalData.issue)}
              issue={modalData.issue}
              mousePosition={modalData.mousePosition}
              zIndex={modalData.zIndex}
              onClick={() => bringToFront(modalData.issue.id)}
            />
          ))}
          <div className="text-11 text-[#484848] my-2">
            (1-{issues.length})/{issues.length}
          </div>

          <div className="flex items-center gap-1 justify-end text-11 mb-2">
            <span>Also available in: CSV</span>
            <a
              className="flex items-center gap-1 text-blue-300 hover:underline hover:text-red-400"
              href=""
              rel="noreferrer noopener"
            >
              <Image src={images.feed} alt="feed" />
              Atom
            </a>
            <span>|</span>
            <a
              href=""
              className="text-blue-300  text-11 hover:underline hover:text-red-400"
            >
              CSV
            </a>
            <span>|</span>
            <a
              href=""
              className="text-blue-300  text-11 hover:underline hover:text-red-400"
            >
              PDF
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default IssuesPage;
