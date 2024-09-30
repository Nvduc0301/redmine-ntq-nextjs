import { useEffect, useState, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RingLoader } from 'react-spinners';

import { AppDispatch, RootState } from '~/store/store';
import { fetchIssuesAssigned } from '~/store/slices/issues/IssuesAssignedSlice';
import { fetchIssuesReport } from '~/store/slices/issues/IssuesReportSlice';
import { fetchIssuesWatched } from '~/store/slices/issues/IssuesWatchedSlice';
import { Issue } from '~/types/Issue';
import { ZIndexContext } from '~/components/common/Modal/ModalContext';
import ModalDetail from '~/components/common/Modal/ModalDetail';
import { tableHeaders, tableNames } from '~/utils/MetaData';
import { ISSUETABLE } from './const';
import { ModalState } from './type';

// Type definition for the modal state

// Utility function to get the table name based on the ID
const getTableName = (id: string): string => {
  switch (id) {
    case ISSUETABLE.ASSIGNED:
      return tableNames.issuesAssigned;
    case ISSUETABLE.REPORT:
      return tableNames.issuesReport;
    case ISSUETABLE.WATCHED:
      return tableNames.issuesWatched;
    default:
      return tableNames.default;
  }
};

// Main component
const TableIssue: React.FC<{ id: string }> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch();
  const { zIndexCounter, incrementZIndex } = useContext(ZIndexContext);

  // State for managing open modals

  // Redux state selectors
  const { issuesReport, loading: loadingReport } = useSelector(
    (state: RootState) => state.issuesReport
  );
  const { issuesWatched, loading: loadingWatched } = useSelector(
    (state: RootState) => state.issuesWatched
  );
  const { issuesAssigned, loading: loadingAssigned } = useSelector(
    (state: RootState) => state.issuesAssigned
  );

  const [modals, setModals] = useState<ModalState[]>([]);

  // Memoized table name
  const tableName = useMemo(() => getTableName(id), [id]);

  // Fetch data when the component mounts or when `id` changes
  useEffect(() => {
    if (id === ISSUETABLE.ASSIGNED && issuesAssigned?.length === 0) {
      dispatch(fetchIssuesAssigned());
    } else if (id === ISSUETABLE.REPORT && issuesReport?.length === 0) {
      dispatch(fetchIssuesReport());
    } else if (id === ISSUETABLE.WATCHED && issuesWatched?.length === 0) {
      dispatch(fetchIssuesWatched());
    }
  }, [id, issuesAssigned, issuesReport, issuesWatched, dispatch]);

  // Utility function to determine which data to display
  const getDisplayedData = (id: string) => {
    switch (id) {
      case ISSUETABLE.ASSIGNED:
        return { data: issuesAssigned || [], loading: loadingAssigned };
      case ISSUETABLE.REPORT:
        return { data: issuesReport || [], loading: loadingReport };
      case ISSUETABLE.WATCHED:
        return { data: issuesWatched || [], loading: loadingWatched };
      default:
        return { data: [], loading: false };
    }
  };

  const { data: displayedData, loading } = getDisplayedData(id);

  // Handle double-click event to open a modal
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

  // Bring modal to the front by incrementing zIndex
  const bringToFront = (id: number) => {
    incrementZIndex();
    setModals((prevModals) => {
      const updatedModals = prevModals.map((modal) =>
        modal.issue.id === id ? { ...modal, zIndex: zIndexCounter } : modal
      );
      return updatedModals;
    });
  };

  // Close the modal by removing it from the state
  const closeModal = (issueToClose: Issue) => {
    setModals((prevModals) =>
      prevModals.filter((modal) => modal.issue.id !== issueToClose.id)
    );
  };

  return (
    <>
      <div className="text-start mb-2">
        <Link
          href="#"
          className="font-semibold text-blue-500 hover:underline hover:text-red-500"
          rel="noreferrer noopener"
        >
          {tableName} <span>{`(${displayedData.length})`}</span>
        </Link>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <RingLoader color="#34d2c8" speedMultiplier={2} />
          </div>
        ) : (
          <table className="min-w-full divide-gray-200 border border-gray-300">
            <thead className="bg-gray-200 h-7">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header.key}
                    scope="col"
                    className="p-1 text-xs border border-gray-300"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 h-6">
              {displayedData.map((issue, index) => {
                const rowBgColor = ['Urgent', 'Immediate'].includes(
                  issue.priority!.name
                )
                  ? 'bg-red-100'
                  : index % 2 === 0
                    ? 'bg-white'
                    : 'bg-gray-100';
                return (
                  <tr
                    key={issue.id}
                    className={`hover:bg-yellow-50 ${rowBgColor}`}
                    onDoubleClick={(e) => onDoubleClick(issue, e)}
                  >
                    <td className="p-1 text-center text-xs border border-gray-300 hover:underline">
                      {issue.id}
                    </td>
                    <td className="p-1 text-center text-xs border border-gray-300 hover:underline">
                      {issue.project?.name}
                    </td>
                    <td className="p-1 text-center text-xs border border-gray-300 hover:underline">
                      {issue.tracker?.name}
                    </td>
                    <td className="p-1 text-center text-xs border border-gray-300 hover:underline">
                      {issue.subject}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {modals.map((modalData) => (
          <ModalDetail
            key={modalData.issue.id}
            modal={() => closeModal(modalData.issue)}
            issue={modalData.issue}
            mousePosition={modalData.mousePosition}
            zIndex={modalData.zIndex}
            onClick={() => bringToFront(modalData.issue.id)}
          />
        ))}
      </div>
    </>
  );
};

export default TableIssue;
