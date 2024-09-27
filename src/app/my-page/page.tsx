'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ItemsState } from '~/types/ItemDragAndDrop';
import { getFromLocalStorage } from '~/utils/LocalStorage';
import DragAndDropMyPage from '~/components/basics/DragAndDrop/DragAndDropMyPage';

const MyPage = () => {
  const [items, setItems] = useState<ItemsState>({ A: [], B: [], C: [] });
  const [hasItems, setHasItems] = useState(false);

  useEffect(() => {
    const parsedItems = getFromLocalStorage<ItemsState>('items', {
      A: [],
      B: [],
      C: [],
    });

    setItems(parsedItems);

    const hasContent =
      (parsedItems.A && parsedItems.A.length > 0) ||
      (parsedItems.B && parsedItems.B.length > 0) ||
      (parsedItems.C && parsedItems.C.length > 0);

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
              className="text-primary text-11 hover:underline hover:text-red-400"
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
            className="text-primary text-11 hover:underline hover:text-red-400"
          >
            Personalize this page
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPage;
