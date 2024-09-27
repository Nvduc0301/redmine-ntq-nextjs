'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ItemsState } from '~/types/ItemDragAndDrop';
import { getFromLocalStorage } from '~/utils/LocalStorage';
import DragAndDropMyPage from '~/components/basics/DragAndDrop/DragAndDropMyPage';

const MyPage = () => {
  const [items, setItems] = useState<ItemsState>({
    FirstSpace: [],
    SecondSpace: [],
    ThirdSpace: [],
  });
  const [hasItems, setHasItems] = useState(false);

  useEffect(() => {
    const parsedItems = getFromLocalStorage<ItemsState>('items', {
      FirstSpace: [],
      SecondSpace: [],
      ThirdSpace: [],
    });

    setItems(parsedItems);

    const hasContent =
      (parsedItems.FirstSpace && parsedItems.FirstSpace.length > 0) ||
      (parsedItems.SecondSpace && parsedItems.SecondSpace.length > 0) ||
      (parsedItems.ThirdSpace && parsedItems.ThirdSpace.length > 0);

    setHasItems(hasContent);
  }, []);

  return (
    <div>
      {hasItems ? (
        <div>
          <div className="flex justify-between mb-2.5">
            <h2 className="text-[#555] text-xl font-semibold ">My page</h2>
            <Link
              href={'/my-page/page_layout'}
              className="text-blue-300 text-11 hover:underline hover:text-red-400"
            >
              Personalize this page
            </Link>
          </div>
          <DragAndDropMyPage items={items} hasBorder={false} />
        </div>
      ) : (
        <div className="flex justify-between">
          <h2 className="text-[#555] text-xl text-5 font-semibold">My page</h2>
          <Link
            href={'/my-page/page_layout'}
            className="text-blue-300 text-11 hover:underline hover:text-red-400"
          >
            Personalize this page
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPage;
