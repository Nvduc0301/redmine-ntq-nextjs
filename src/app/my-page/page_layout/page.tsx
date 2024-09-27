'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import images from '~/assets/img';

import {
  ComponentMap,
  ItemDrag,
  ItemsState,
  Option,
} from '~/types/ItemDragAndDrop';

import { getFromLocalStorage, setToLocalStorage } from '~/utils/LocalStorage';
import Schedule from '~/components/features/my-page/schedule';
import SpentTime from '~/components/features/my-page/spent-time';
import Documents from '~/components/features/my-page/document';
import LatestNews from '~/components/features/my-page/latest-news';
import DragAndDrop from '~/components/basics/DragAndDrop/DragAndDrop';
import TableIssue from '~/components/features/my-page/table-issue';

const componentMap: { [key: string]: React.ReactNode } = {
  Schedule: <Schedule />,
  TableIssue: <TableIssue id="" />,
  SpentTime: <SpentTime />,
  Documents: <Documents />,
  LatestNews: <LatestNews />,
};

const MyPageLayoutPage = () => {
  const initialOptions: Option[] = [
    { label: 'Issues assigned to me', value: '1', componentName: 'TableIssue' },
    { label: 'Reported issues', value: '2', componentName: 'TableIssue' },
    { label: 'Watched issues', value: '3', componentName: 'TableIssue' },
    { label: 'Latest news', value: '4', componentName: 'LatestNews' },
    { label: 'Calendar', value: '5', componentName: 'Schedule' },
    { label: 'Documents', value: '6', componentName: 'Documents' },
    { label: 'Spent time', value: '7', componentName: 'SpentTime' },
  ];

  const [options, setOptions] = useState<Option[]>(initialOptions);

  const [items, setItems] = useState<ItemsState>({
    FirstSpace: [],
    SecondSpace: [],
    ThirdSpace: [],
  });
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    // Đọc danh sách options đã thêm từ localStorage
    const addedOptions = getFromLocalStorage<string[]>('addedOptions', []);
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        addedOptions.includes(option.value)
          ? { ...option, isAdded: true }
          : option
      )
    );
    // Đọc dữ liệu items từ localStorage
    const storedItems = getFromLocalStorage<ItemsState>('items', {
      FirstSpace: [],
      SecondSpace: [],
      ThirdSpace: [],
    });
    setItems(storedItems);
  }, []);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    setSelectedOption(selectedOption || null); // Lưu option được chọn vào trạng thái tạm thời
  };

  const addOption = () => {
    if (selectedOption) {
      const selectedValue = selectedOption.value;
      const componentName = selectedOption.componentName as keyof ComponentMap;
      const selectedLabel = selectedOption.label;

      try {
        if (selectedValue && componentName) {
          const newComponent = componentMap[componentName];

          if (newComponent) {
            setItems((prevItems) => {
              const newItem: ItemDrag = {
                id: selectedValue,
                componentName: componentName,
                label: selectedLabel,
              };

              // Kiểm tra nếu item đã tồn tại trong localStorage
              const storedItems = getFromLocalStorage<ItemsState>('items', {
                FirstSpace: [],
                SecondSpace: [],
                ThirdSpace: [],
              });

              const itemAlreadyExists = storedItems.FirstSpace?.some(
                (item: ItemDrag) => item.id === selectedValue
              );

              if (!itemAlreadyExists) {
                const updatedItems: ItemsState = {
                  FirstSpace: [...prevItems.FirstSpace, newItem],
                  SecondSpace: prevItems.SecondSpace,
                  ThirdSpace: prevItems.ThirdSpace,
                };

                // Cập nhật localStorage chỉ khi item chưa tồn tại
                const newStoredItems: ItemsState = {
                  FirstSpace: [...storedItems.FirstSpace, newItem],
                  SecondSpace: storedItems.SecondSpace,
                  ThirdSpace: storedItems.ThirdSpace,
                };

                localStorage.setItem('items', JSON.stringify(newStoredItems));

                return updatedItems;
              }

              return prevItems;
            });

            // Cập nhật danh sách options để loại bỏ option đã chọn
            setOptions((prevOptions) =>
              prevOptions.map((option) =>
                option.value === selectedValue
                  ? { ...option, isAdded: true }
                  : option
              )
            );

            // Lưu danh sách options đã thêm vào localStorage
            const addedOptions = getFromLocalStorage<string[]>(
              'addedOptions',
              []
            );
            if (!addedOptions.includes(selectedValue)) {
              setToLocalStorage('addedOptions', [
                ...addedOptions,
                selectedValue,
              ]);
            }

            // Xóa trạng thái tạm thời
            setSelectedOption(null);
          }
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[#555] text-lg text-5 font-semibold">My page</h2>
        <div className="flex items-center">
          <p className="pr-2 text-xs">My page block</p>
          <select
            onChange={handleOptionChange}
            className="border border-primary-border w-32 h-6 text-xs mx-2"
          >
            <option value=""></option>
            {options
              .filter((option) => !option.isAdded)
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>

          <button
            onClick={addOption}
            className="flex items-center mx-2 cursor-pointer"
            aria-label="Add Option"
          >
            <Image src={images.add} className="w-4 h-4" alt="Add" />
            <p className="text-xs hover:underline hover:text-red-400 ml-1">
              Add
            </p>
          </button>

          <Link
            href="/my-page"
            className="flex items-center mx-2"
            rel="noreferrer noopener"
          >
            <Image src={images.cancel} className="w-4 h-4" alt="Back" />
            <p className="text-xs hover:underline hover:text-red-400 ml-1">
              Back
            </p>
          </Link>
        </div>
      </div>
      <DragAndDrop
        hasBorder={true}
        items={items}
        setItems={setItems}
        setOptions={setOptions}
      />
    </div>
  );
};

export default MyPageLayoutPage;
