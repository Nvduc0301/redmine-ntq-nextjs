// IssueTable.tsx
import React from 'react';
import { Issue } from '~/types/Project';

interface IssueTableProps {
  issues: Issue[];
  showBug: boolean;
  showTask: boolean;
}

const RelatedIssues: React.FC<IssueTableProps> = ({
  issues,
  showBug,
  showTask,
}) => {
  // Hàm để lọc và ánh xạ các issue
  const filteredIssues = issues.filter((issue) => {
    const isBug = issue.tracker.name === 'Bug';
    const isTask = issue.tracker.name === 'Task';
    return (showBug || !isBug) && (showTask || !isTask);
  });

  return (
    <table className="mt-3 w-full">
      <caption className="text-xs text-left text-black-500 mb-2">
        Related Issues
      </caption>
      <tbody>
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <tr key={issue.id}>
              <td className="flex items-center border border-gray-700 max-w-full">
                <a className="text-blue-300 hover:underline hover:text-red-600 text-xs">
                  {issue.tracker.name} #{issue.id}
                </a>
                <div className="text-xs text-black-500">: {issue.subject}</div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-xs text-black-500 text-center" colSpan={2}>
              No issues available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RelatedIssues;
