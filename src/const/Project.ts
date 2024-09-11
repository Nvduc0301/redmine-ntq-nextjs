export const Projects = [
  { id: 1, name: "Overview", slug: "overview" },
  { id: 2, name: "Activity", slug: "activity" },
  { id: 3, name: "Roadmap", slug: "roadmap" },
  { id: 4, name: "Issues", slug: "issues" },
  { id: 5, name: "New issue", slug: "newissue" },
  { id: 6, name: "Gantt", slug: "gantt" },
  { id: 7, name: "Calendar", slug: "calendar" },
  { id: 8, name: "Documents", slug: "documents" },
  { id: 9, name: "Wiki", slug: "wiki" },
  { id: 10, name: "Files", slug: "files" },
  { id: 11, name: "Settings", slug: "settings" },
];

export const OPTIONS_STATUS_1 = [
  { value: "open", label: "open" },
  { value: "is", label: "is" },
  { value: "not", label: "is not" },
  { value: "closed", label: "closed" },
  { value: "any", label: "any" },
];

export const activityItems = [
  { id: "show_issues", name: "showIssues", label: "Issues" },
  { id: "show_changesets", name: "showChangesets", label: "Changesets" },
  { id: "show_documents", name: "showDocuments", label: "Documents" },
  { id: "show_files", name: "showFiles", label: "Files" },
  { id: "show_wiki_edits", name: "showWikiEdits", label: "Wiki edits" },
  { id: "show_time_entries", name: "showTimeEntries", label: "Spent time" },
] as const;

export const OPTIONS_FILTER_ISSUES = [
  { value: "status", label: "Status" },
  { value: "tracker", label: "Tracker" },
  { value: "priority", label: "Priority" },
  { value: "author", label: "Author" },
  { value: "assignee", label: "Assignee" },
  { value: "productcategory", label: "Product Category" },
  { value: "market", label: "Issue's Market" },
  { value: "target", label: "Issue's Target" },
  { value: "degrade", label: "Issue's Degrade" },
  { value: "contract", label: "Issue's Contract Type" },
  { value: "similar", label: "Issue's Similar" },
  { value: "cause", label: "Issue" },
  { value: "afterrefactor", label: "Issue's After Refactor " },
  { value: "swat", label: "Issue's Swat " },
  { value: "testenvironment", label: "Issue's Test Environment" },
  { value: "laterelease", label: "Issue's Late Release " },
  { value: "releasenote", label: "Issue's Release Note" },
  { value: "projectline", label: "Issue's Project Line" },
  { value: "businessdomain", label: "Issue's Business Domain" },
  { value: "technology", label: "Issue's Technology" },
  { value: "project Size ", label: "Issue's Project Size (MM)" },
  { value: "teamsize(MM)", label: "Issue's Team size (MM)" },
  { value: "degrade?", label: "Issue's Is Degrade?" },
  { value: "reopencounter", label: "Issue's Reopen counter" },
  { value: "newcustomer?", label: "Issue's New customer?" },
  { value: "customertype", label: "Issue's Customer Type" },
  { value: "pic", label: "Issue's PIC OS" },
  { value: "rrelease", label: "Issue's Release OK " },
];

// export const HeaderIssuesData = [
//   { id: 1, label: "#" },
//   { id: 2, label: "Tracker" },
//   { id: 3, label: "Status" },
//   { id: 4, label: "Priority" },
//   { id: 5, label: "Subject" },
//   { id: 6, label: "Assignee" },
//   { id: 7, label: "Updated" },
//   { id: 8, label: "author" },
// ];

export const OPTION_DIALOG = [
  { label: "Related to", value: "related to" },
  { label: "Duplicates", value: "duplicates" },
  { label: "Duplicated by", value: "duplicated" },
  { label: "Blocks", value: "blocks" },
  { label: "Blocked by", value: "blocked" },
  { label: "Precedes", value: "precedes" },
  { label: "Follows", value: "follows" },
  { label: "Copied to", value: "copied_to" },
  { label: "Copied from", value: "copied_from" },
  // Add more options as needed
];
