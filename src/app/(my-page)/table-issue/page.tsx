import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RingLoader } from 'react-spinners';

import { AppDispatch, RootState } from '~/store/store';
import { fetchIssuesAssigned } from '~/store/slices/issues/IssuesAssignedSlice';
import { fetchIssuesReport } from '~/store/slices/issues/IssuesReportSlice';
import { fetchIssuesWatched } from '~/store/slices/issues/IssuesWatchedSlice';
import { Issue } from '~/types/Issue';
import { ZIndexContext } from '~/app/components/Modal/ModalContext';
import ModalDetail from '~/app/components/Modal/ModalDetail';

const tableHeaders = [
  { key: '#', label: '#' },
  { key: 'Project', label: 'Project' },
  { key: 'Tracker', label: 'Tracker' },
  { key: 'Subject', label: 'Subject' },
];
const tableCellClasses =
  'p-1 text-center text-xs border border-primary-border hover:underline';
const tableNames = {
  issuesAssigned: 'Issues assigned to me',
  issuesReport: 'Reported issues',
  issuesWatched: 'Watched issues',
  default: 'Issues',
};
const getTableName = (id: string): string => {
  switch (id) {
    case '1':
      return tableNames.issuesAssigned;
    case '2':
      return tableNames.issuesReport;
    case '3':
      return tableNames.issuesWatched;
    default:
      return tableNames.default;
  }
};

const TableIssue: React.FC<{ id: string }> = ({ id }) => {
  let displayedData: Issue[] = [];
  let loading = false;
  const [modals, setModals] = useState<
    { issue: Issue; mousePosition: { x: number; y: number }; zIndex: number }[]
  >([]);
  const dispatch: AppDispatch = useDispatch();
  const tableName = getTableName(id);
  const { zIndexCounter, incrementZIndex } = useContext(ZIndexContext);
  const { issuesReport, loading: loadingReport } = useSelector(
    (state: RootState) => state.issuesReport
  );
  const { issuesWatched, loading: loadingWatched } = useSelector(
    (state: RootState) => state.issuesWatched
  );
  const { issuesAssigned, loading: loadingAssigned } = useSelector(
    (state: RootState) => state.issuesAssigned
  );

  useEffect(() => {
    if (id === '1' && issuesAssigned?.length === 0) {
      dispatch(fetchIssuesAssigned());
    } else if (id === '2' && issuesReport?.length === 0) {
      dispatch(fetchIssuesReport());
    } else if (id === '3' && issuesWatched?.length === 0) {
      dispatch(fetchIssuesWatched());
    }
  }, [id]);

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

  if (id === '1') {
    displayedData = issuesAssigned || [];
    loading = loadingAssigned;
  } else if (id === '2') {
    displayedData = issuesReport || [];
    loading = loadingReport;
  } else if (id === '3') {
    displayedData = issuesWatched || [];
    loading = loadingWatched;
  }

  console.log(modals);

  return (
    <>
      <div className="text-start mb-2">
        <Link
          href="#"
          className="font-semibold text-primary-darkBlue hover:underline hover:text-primary-red"
          rel="noreferrer noopener"
        >
          {tableName} <span>{`(${displayedData?.length})`}</span>
        </Link>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <RingLoader color="#34d2c8" speedMultiplier={2} />
          </div>
        ) : (
          <table className="min-w-full divide-gray-200 border border-gray-300">
            <thead className="bg-primary-sub_bg h-7">
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  scope="col"
                  className="p-1 text-xs border border-primary-border"
                >
                  {header.label}
                </th>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 h-6">
              {displayedData?.map((issue, index: number) => {
                const rowBgColor = ['Urgent', 'Immediate'].includes(
                  issue.priority!.name
                )
                  ? 'bg-primary-pink'
                  : index % 2 === 0
                    ? 'bg-white'
                    : 'bg-gray-100';
                return (
                  <tr
                    key={issue.id}
                    className={`hover:bg-yellow-50 ${rowBgColor}`}
                    onDoubleClick={(e) => onDoubleClick(issue, e)}
                  >
                    <td className={tableCellClasses}>{issue.id}</td>
                    <td className={tableCellClasses}>{issue?.project?.name}</td>
                    <td className={tableCellClasses}>{issue?.tracker?.name}</td>
                    <td className={tableCellClasses}>{issue?.subject}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
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
      </div>
    </>
  );
};

export default TableIssue;
