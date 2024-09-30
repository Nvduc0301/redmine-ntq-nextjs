import Image from 'next/image';
import images from '~/assets/img';
import { Issue } from '~/types/Issue';
import { SORT_ORDER } from './const';
// Adjust the import

interface TableProps {
  issues: Issue[]; // Define or import your Issue type
  sortOrder: string; // Type based on your SORT_ORDER type
  handleSort: () => void;
  onDoubleClick: (
    item: Issue,
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
  renderCellContent: (item: Issue, columnLabel: string) => React.ReactNode;
  MENU_HEADER_TABLE: { id: number; label: string }[];
}

const TableIssue: React.FC<TableProps> = ({
  issues,
  sortOrder,
  handleSort,
  onDoubleClick,
  renderCellContent,
  MENU_HEADER_TABLE,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className=" p-1 text-xs border border-gray-300">
            <Image src={images.check} alt="check" />
          </th>
          {MENU_HEADER_TABLE.map((header) => (
            <th
              key={header.id}
              className="text-blue-800 hover:underline hover:text-red-500 p-1 text-xs border border-gray-300 cursor-pointer"
              onClick={header.label === '#' ? handleSort : undefined}
            >
              {header.label}
              {header.label === '#' && (
                <Image
                  src={
                    sortOrder === SORT_ORDER.INCREASE
                      ? images.arrow_up
                      : images.arrow_down
                  }
                  alt={
                    sortOrder === SORT_ORDER.INCREASE ? 'Sort up' : 'Sort down'
                  }
                  className="inline ml-1"
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 h-6">
        {issues.map((item, index) => {
          const isEven = index % 2 === 0;
          const isUrgent = item.priority?.name === 'Urgent';
          const bgColor = isUrgent
            ? isEven
              ? 'bg-red-100'
              : 'bg-red-150'
            : isEven
              ? 'bg-gray-150'
              : 'bg-white';
          return (
            <tr
              className={`${bgColor}  hover:bg-yellow-100`}
              key={item.id}
              onDoubleClick={(e) => onDoubleClick(item, e)}
            >
              <td className="p-1 text-left text-xs border border-gray-300">
                <input type="checkbox" />
              </td>
              {MENU_HEADER_TABLE.map((column) => (
                <td
                  key={column.id}
                  className="p-1 text-center text-xs border border-gray-300"
                >
                  {renderCellContent(item, column.label)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableIssue;
