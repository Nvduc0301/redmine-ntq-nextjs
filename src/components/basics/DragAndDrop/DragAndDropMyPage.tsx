'use client';

import Documents from '~/components/features/my-page/document';
import LatestNews from '~/components/features/my-page/latest-news';
import LogTime from '~/components/features/my-page/log-time';
import Schedule from '~/components/features/my-page/schedule';
import SpentTime from '~/components/features/my-page/spent-time/page';
import TableIssue from '~/components/features/my-page/table-issue/page';
import TotalTime from '~/components/features/my-page/total-time/page';
import { ItemDrag, ItemsState } from '~/types/ItemDragAndDrop';

import './DragAndDrop.css';

interface DragAndDropProps {
  items: ItemsState;
  hasBorder: boolean;
}

const componentsMap = {
  LogTime,
  Schedule,
  TableIssue,
  TotalTime,
  SpentTime,
  LatestNews,
  Documents,
};

const DragAndDrop: React.FC<DragAndDropProps> = ({ items, hasBorder }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderItems = (items: ItemDrag[] | [], targetList: 'A' | 'B' | 'C') => {
    return items.map((item) => {
      const Component =
        componentsMap[item.componentName as keyof typeof componentsMap];
      return (
        <div key={item.id} className="item">
          {Component ? <Component id={item.id} /> : null}

          {/*  */}
        </div>
      );
    });
  };

  return (
    <div className="App">
      {items.A.length > 0 && (
        <div
          className={`table_primary ${hasBorder ? 'with-border' : ''}`}
          id="table-A"
        >
          {renderItems(items.A, 'A')}
        </div>
      )}
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
  );
};

export default DragAndDrop;
