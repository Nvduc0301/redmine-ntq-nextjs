import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import './ModalDetail.css';
import Image from 'next/image';
import images from '~/assets/img';
import { Issue } from '~/types/Issue';
import { formatDateMonth, getCreatedTimeAgo } from '~/utils/FormatDay';
import { OPTION_DIALOG } from '~/const/Project';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const modalWidth = 600;
const modalHeight = 650;

const customFields = [
  { label: 'Bug Type', name: 'Bug Type' },
  { label: 'Cause Category', name: 'Cause Category' },
  { label: 'Severity', name: 'Severity' },
  { label: 'Is Degrade?', name: 'Is Degrade?' },
  { label: 'QC Activity', name: 'QC Activity' },
  { label: 'Reopen counter', name: 'Reopen counter' },
];

const renderInfoItem = (label: string, value: string | JSX.Element) => (
  <div
    className="flex justify-between mt-2"
    key={label}
    style={{ position: 'relative' }}
  >
    <strong className="w-1/2 text-left">{label}:</strong>
    <span className="w-1/2 text-left flex items-center">
      {label === '% Done' && (
        <div className="relative w-1/2 h-2 me-1 bg-gray-300 rounded">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 rounded"
            style={{ width: `${value}` }}
          ></div>
        </div>
      )}
      {value}
    </span>
  </div>
);

const renderSection = (
  title: string,
  content: JSX.Element | string,
  isLink: boolean,
  link: string,
  onClick?: () => void
) => (
  <>
    <hr className="border-gray-550" />
    <div className="py-2 text-start">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xs">{title}</h3>
        {isLink && (
          <button
            onClick={onClick}
            className="text-blue-700 cursor-pointer text-sm hover:underline hover:text-red-500"
          >
            {content}
          </button>
        )}
      </div>
      {!isLink && <p className="text-sm py-1 text-title">{content}</p>}
    </div>
  </>
);

const renderLink = (to: string, text: string, index: number) => (
  <Link
    key={index}
    href={to}
    className="text-header font-bold text-blue-700 hover:text-red-500 hover:underline"
  >
    {' '}
    {text}{' '}
  </Link>
);

interface IDragProps {
  modal: (issue: Issue) => void;
  issue: Issue;
  mousePosition: { x: number; y: number };
  zIndex: number;
  onClick: () => void;
}

const ModalDetail: React.FC<IDragProps> = ({
  modal,
  issue,
  mousePosition,
  zIndex,
  onClick,
}) => {
  const [showRelatedIssueForm, setShowRelatedIssueForm] = useState(false);
  const pathname = usePathname();

  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleRelatedIssueForm = () => {
    setShowRelatedIssueForm((prev) => !prev);
  };

  const identifier = pathname.split('/')[2];

  const infoItems = [
    { label: 'Status', value: issue.status?.name ?? '-' },
    { label: 'Start date', value: formatDateMonth(issue?.start_date) ?? '-' },
    { label: 'Priority', value: issue.priority?.name ?? '-' },
    { label: 'Due date', value: formatDateMonth(issue?.due_date) ?? '-' },
    { label: 'Category', value: '-' },
    {
      label: 'Estimated time',
      value: `${issue?.estimated_hours ? issue?.estimated_hours + ' hours' : '-'} `,
    },
    { label: 'Spent time', value: '-' },
    { label: '% Done', value: `${issue.done_ratio ?? 0}%` },
  ];

  const sections = [
    {
      title: 'Description',
      content: issue.description ? (
        issue.description
      ) : (
        <span className="italic">description is empty</span>
      ),
      isLink: false,
      link: '',
    },
    {
      title: 'Subtasks',
      content: 'Add',
      isLink: true,
      link: `/projects/${identifier}/newissue`,
    },
    {
      title: 'Related issues',
      content: 'Add',
      isLink: true,
      link: '',
      onClick: () => toggleRelatedIssueForm(),
    },
  ];

  const buttons = [
    {
      label: 'details',
      onClick: () => router.push(`/issues/${issue.id}`), // Navigate to the detail view
    },
    {
      label: 'edits',
      onClick: () => {
        // Implement edit functionality here
        // For example, navigate to an edit page or open an edit modal
      },
    },
    {
      label: 'close',
      onClick: () => modal(issue), // Close the modal
    },
  ];

  const links = [
    {
      to: '#',
      text: issue.author?.name ?? 'Unknown',
    },
    {
      to: '#',
      text: getCreatedTimeAgo(issue.created_on),
    },
  ];

  const calculatePosition = () => {
    const viewportHeight = window.innerHeight;
    let left = mousePosition.x - modalWidth;
    let top = mousePosition.y - modalHeight / 2;

    if (left < 0) {
      left = mousePosition.x;
    }
    if (top < 0) {
      top = 0;
    }
    if (top + modalHeight > viewportHeight) {
      top = viewportHeight - modalHeight;
    }

    return { left, top };
  };

  const { left, top } = calculatePosition();
  const modalStylePosition = {
    left: `${left}px`,
    top: `${top}px`,
    width: `${modalWidth}px`,
    height: `${modalHeight}px`,
    zIndex: zIndex,
  };

  const getFieldValue = (
    fields:
      | { id: number; name: string; value: string; multiple?: boolean }[]
      | undefined,
    fieldName: string
  ) => {
    if (!fields) return '-';
    const field = fields.find((field) => field.name === fieldName);
    return field ? field.value : '-';
  };

  return (
    <Draggable onMouseDown={() => onClick()}>
      <div
        className="bg-white fixed border rounded"
        ref={modalRef}
        style={modalStylePosition}
      >
        <div className="flex justify-between items-center m-1 bg-blue-100">
          <h2
            style={{ marginRight: 'auto' }}
            className={`text-xs p-2 text-white font-bold`}
          >
            Quick View - #{issue.id} {issue.subject}
          </h2>
          <button
            onClick={() => modal(issue)}
            className="icon bg-white w-5 h-5 rounded-sm me-1"
          >
            <Image src={images.close} alt="avatar" className="w-full h-full" />
          </button>
        </div>
        <div className="detail overflow-auto h-[600px]">
          <div className="bg-yellow-50 border p-2 m-2">
            <div className="flex items-center">
              <div className="border p-1 bg-white">
                <Image src={images.avatar} alt="avatar" className="w-16 h-16" />
              </div>
              <div className="ps-2">
                <h3 className="font-bold text-start text-sm">
                  {issue.subject}
                </h3>
                <p className="text-xs">
                  Added by
                  {links.map((link, index) =>
                    renderLink(link.to, link.text, index)
                  )}
                </p>
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-x-2 text-xs m-1`}>
              {infoItems.map((item) => renderInfoItem(item.label, item.value))}
              {customFields.map((field, index) => (
                <div className="flex justify-between mt-2" key={index}>
                  <strong className="w-1/2 text-left">{field.label}:</strong>
                  <span className="w-1/2 text-left">
                    {getFieldValue(issue.custom_fields, field.name)}
                  </span>
                </div>
              ))}
            </div>
            {sections.map((section) =>
              renderSection(
                section.title,
                section.content,
                section.isLink,
                section.link,
                section.onClick
              )
            )}
            {showRelatedIssueForm && (
              <form className="flex items-center text-13 gap-1 mt-2">
                <select
                  className="border border-solid border-gray-350 p-1 rounded"
                  aria-label="Category"
                >
                  {OPTION_DIALOG.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Input text"
                  className="w-full border border-solid border-gray-350 p-1 rounded"
                />
                <button
                  className="bg-gray-200 p-1 border-1 border-solid border-gray-700"
                  type="submit"
                  name="submitAndRedirect"
                >
                  Add
                </button>
                <Link
                  href=""
                  onClick={toggleRelatedIssueForm}
                  className="text-blue-800 hover:text-red-500 hover:underline"
                >
                  Cancel
                </Link>
              </form>
            )}
          </div>
        </div>
        <div className="bg-gray-200 flex justify-end items-center gap-2 p-2">
          {buttons.map((button, index) => (
            <button
              key={index}
              className="bg-white p-2 border-2 rounded text-blue-300 font-bold text-xs hover:border-blue-100"
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </Draggable>
  );
};

export default ModalDetail;
