import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import images from '~/assets/img';

import './DragAndDrop.css';
import {
  componentMap,
  ItemDrag,
  ItemsState,
  Option,
  SpecificTypeName,
} from '~/types/ItemDragAndDrop';
import { getFromLocalStorage, setToLocalStorage } from '~/utils/LocalStorage';
import { LOCAL_STORAGE_ITEMS_KEY } from '~/const/MagicConstant';

type DragAndDropProps = {
  hasBorder: boolean;
  items: ItemsState;
  setItems: React.Dispatch<React.SetStateAction<ItemsState>>;
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
};

const DragAndDrop: React.FC<DragAndDropProps> = (props: DragAndDropProps) => {
  const { hasBorder, items, setItems, setOptions } = props;

  const [draggingItem, setDraggingItem] = useState<ItemDrag | null>(null);
  const [draggingStyle, setDraggingStyle] = useState<React.CSSProperties>({});
  const [isDragging, setIsDragging] = useState<Boolean>(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef<Boolean>(false);
  const [itemSources, setItemSources] = useState<{
    [itemId: string]: SpecificTypeName;
  }>({});
  const [currentList, setCurrentList] = useState<SpecificTypeName>('A');

  // Sử dụng useEffect để load dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const defaultItems: ItemsState = {
      A: [],
      B: [],
      C: [],
    };

    // Lấy dữ liệu từ localStorage và merge với defaultItems
    const storedItems = getFromLocalStorage<Record<string, ItemDrag[]>>(
      LOCAL_STORAGE_ITEMS_KEY,
      {}
    );
    const mergedItems: ItemsState = { ...defaultItems, ...storedItems };

    setItems(mergedItems);
  }, []);

  const onDrop = (item: ItemDrag, targetList: SpecificTypeName) => {
    const sourceList = itemSources[item.id];
    if (sourceList === targetList) {
      setDraggingItem(null);
      setDraggingStyle({});
      setIsDragging(false);
      return;
    }

    setItems((prevItems) => {
      const updatedItems = {
        ...prevItems,
        [sourceList]: prevItems[sourceList].filter((i) => i.id !== item.id),
        [targetList]: [...prevItems[targetList], item],
      };
      // Lưu vào localStorage ngay sau khi cập nhật
      setToLocalStorage(LOCAL_STORAGE_ITEMS_KEY, updatedItems);
      return updatedItems;
    });

    setDraggingItem(null);
    setDraggingStyle({});
    setIsDragging(false);

    setItemSources((prevSources) => {
      const updatedSources = { ...prevSources };
      delete updatedSources[item.id];
      return updatedSources;
    });
  };

  const onDragStart = (
    e: React.MouseEvent,
    item: ItemDrag,
    list: SpecificTypeName
  ) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    setDraggingItem(item);
    setItemSources((prevSources) => ({
      ...prevSources,
      [item.id]: list,
    }));
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDraggingStyle({
      position: 'absolute',
      top: rect.top - containerRef.current!.getBoundingClientRect().top,
      left: rect.left - containerRef.current!.getBoundingClientRect().left,
      zIndex: 1000,
      width: rect.width,
      height: rect.height,
    });
    isMouseDownRef.current = true;
    setCurrentList(list);
  };

  const onDrag = (e: React.MouseEvent) => {
    if (isDragging && draggingItem) {
      setDraggingStyle((prevStyle) => ({
        ...prevStyle,
        top:
          e.clientY -
          offset.y -
          containerRef.current!.getBoundingClientRect().top,
        left:
          e.clientX -
          offset.x -
          containerRef.current!.getBoundingClientRect().left,
      }));
    }
  };

  const getCurrentDropTarget = (
    x: number,
    y: number
  ): SpecificTypeName | null => {
    const targets: SpecificTypeName[] = ['A', 'B', 'C'];
    for (const target of targets) {
      if (checkDropTarget(x, y, target)) {
        return target;
      }
    }
    return null;
  };

  const onDragEnd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (draggingItem) {
      const x = e.clientX;
      const y = e.clientY;
      const currentDropTarget = getCurrentDropTarget(x, y);

      if (currentDropTarget) {
        onDrop(draggingItem, currentDropTarget);
      } else {
        resetDragState();
      }

      if (currentList === currentDropTarget && draggingItem) {
        const itemsContainer = containerRef.current!.querySelector(
          `#table-${currentDropTarget}`
        );
        if (itemsContainer) {
          const itemElements = itemsContainer.children;
          const currentIndex = items[currentDropTarget].findIndex(
            (item) => item.id === draggingItem.id
          );
          let newIndex = 1;

          for (let i = 0; i < itemElements.length; i++) {
            const itemRect = itemElements[i].getBoundingClientRect();
            if (y >= itemRect.top && y <= itemRect.bottom) {
              const itemMiddleY = (itemRect.top + itemRect.bottom) / 2;
              if (
                y >= itemMiddleY - itemRect.height &&
                y <= itemMiddleY + itemRect.height
              ) {
                newIndex = i;
                break;
              }
            }
          }

          if (
            currentIndex >= 0 &&
            newIndex >= 0 &&
            newIndex < items[currentDropTarget].length &&
            newIndex !== currentIndex
          ) {
            const newItems = [...items[currentDropTarget]];
            const [movedItem] = newItems.splice(currentIndex, 1);
            newItems.splice(newIndex, 0, movedItem);

            setItems((prevItems) => ({
              ...prevItems,
              [currentDropTarget]: newItems,
            }));

            // Cập nhật localStorage
            setToLocalStorage(LOCAL_STORAGE_ITEMS_KEY, {
              ...items,
              [currentDropTarget]: newItems,
            });
          }
        }
      }
      resetDragState();
    }
  };

  const resetDragState = () => {
    setDraggingItem(null);
    setDraggingStyle({});
    setIsDragging(false);
    isMouseDownRef.current = false;
  };

  const checkDropTarget = (
    x: number,
    y: number,
    targetList: SpecificTypeName
  ) => {
    const targetMap: { [key: string]: HTMLElement | null } = {
      A: containerRef.current!.querySelector('#table-A'),
      B: containerRef.current!.querySelector('#table-B'),
      C: containerRef.current!.querySelector('#table-C'),
    };

    const target = targetMap[targetList];

    if (target) {
      const rect = target.getBoundingClientRect();
      return (
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      );
    }
    return false;
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      setDraggingItem(null);
      setDraggingStyle({});
    }
    isMouseDownRef.current = false;
  };

  useEffect(() => {
    const handleMouseMove = () => {
      if (isMouseDownRef.current && !isDragging) {
        setIsDragging(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleCloseItem = (itemId: string, targetList: SpecificTypeName) => {
    // Bước 1: Lấy dữ liệu từ localStorage cho ItemsState
    const storedItems = getFromLocalStorage<Record<string, ItemDrag[]>>(
      LOCAL_STORAGE_ITEMS_KEY,
      {}
    );

    // Bước 2: Cập nhật danh sách items sau khi xóa
    const updatedList = storedItems[targetList].filter(
      (item: ItemDrag) => item.id !== itemId
    );

    // Bước 3: Cập nhật lại storedItems với updatedList
    storedItems[targetList] = updatedList;

    // Lưu lại vào localStorage
    setToLocalStorage(LOCAL_STORAGE_ITEMS_KEY, storedItems);

    // Bước 4: Cập nhật lại trạng thái items trong component
    setItems((prevItems) => ({
      ...prevItems,
      [targetList]: updatedList,
    }));

    // Bước 5: Xóa itemId khỏi addedOptions
    const addedItems = getFromLocalStorage<string[]>(
      'LOCAL_STORAGE_ADDED_OPTIONS_KEY',
      []
    );
    const updatedAddedItems = addedItems.filter((itemId) => itemId !== itemId);

    // Lưu lại updatedAddedItems vào localStorage
    setToLocalStorage('LOCAL_STORAGE_ADDED_OPTIONS_KEY', updatedAddedItems);

    // Cập nhật lại trạng thái options
    setOptions((prevOptions) =>
      prevOptions.map((option) => ({
        ...option,
        isAdded: updatedAddedItems.includes(option.value)
          ? true
          : option.isAdded,
      }))
    );
  };

  const renderItems = (items: ItemDrag[], targetList: SpecificTypeName) => {
    return items.map((item) => {
      const Component =
        componentMap[item.componentName as keyof typeof componentMap];
      return (
        <div
          key={item.id}
          className="item"
          onMouseDown={(e) => onDragStart(e, item, targetList)}
          style={
            draggingItem?.id === item.id && isDragging
              ? { visibility: 'hidden' }
              : {}
          }
        >
          <div className="flex justify-end items-center">
            <a
              className="close-button mb-1"
              onClick={() => handleCloseItem(item.id, targetList)}
            >
              <Image className="close" alt="close" src={images.close} />
            </a>
          </div>
          <Component {...item} />
        </div>
      );
    });
  };

  const renderComponent = (item: ItemDrag) => {
    const Component =
      componentMap[item.componentName as keyof typeof componentMap];

    const componentProps = {
      id: item.id,
      ...item.data,
    };

    return Component ? (
      <Component
        key={item.id}
        {...componentProps} // Đảm bảo rằng id luôn được truyền
      />
    ) : null;
  };

  return (
    <div
      onMouseMove={onDrag}
      onMouseUp={onDragEnd}
      ref={containerRef}
      style={{ position: 'relative' }}
    >
      {isDragging && draggingItem && (
        <div style={draggingStyle} className="item dragging">
          {renderComponent(draggingItem)}
        </div>
      )}

      <div className="App">
        <div
          className={`table_primary ${hasBorder ? 'with-border' : ''}`}
          id="table-A"
        >
          {renderItems(items.A, 'A')}
        </div>
        <div className="table_side-wrapper">
          <div
            className={`table_side ${hasBorder ? 'with-border' : ''}`}
            id="table-B"
          >
            {renderItems(items.B, 'B')}
          </div>
          <div
            className={`table_side ${hasBorder ? 'with-border' : ''}`}
            id="table-C"
          >
            {renderItems(items.C, 'C')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
