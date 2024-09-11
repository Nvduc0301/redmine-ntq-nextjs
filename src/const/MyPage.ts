export const HeaderTotalData = [
  { id: 1, label: "Date" },
  { id: 2, label: "Activity" },
  { id: 3, label: "Project" },
  { id: 4, label: "Comment" },
  { id: 5, label: "Hours" },
];

export const HeaderDetailData = [
  { id: 1, label: "Project" },
  { id: 2, label: "Date" },
  { id: 3, label: "User" },
  { id: 4, label: "Activity" },
  { id: 5, label: "Issue" },
  { id: 6, label: "Comment" },
  { id: 7, label: "Hours" },
];

// Const Calender

export const DaysOfWeek = [
  { id: 1, label: "Monday" },
  { id: 2, label: "Tuesday" },
  { id: 3, label: "Wednesday" },
  { id: 4, label: "Thursday" },
  { id: 5, label: "Friday" },
  { id: 6, label: "Saturday" },
  { id: 7, label: "Sunday" },
];

// Const SpentTimeDetail

export const OPTIONS_DATE = [
  { value: "any", label: "any" },
  { value: "is", label: "is" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
  { value: "between", label: "between" },
  { value: "lessday", label: "less than days ago" },
  { value: "moreday", label: "more than days ago" },
  { value: "past", label: "in the past" },
  { value: "daysago", label: "days ago" },
  { value: "today", label: "today" },
  { value: "yesterday", label: "yesterday" },
  { value: "thisweek", label: "this week" },
  { value: "lastwweek", label: "last week" },
  { value: "last2week", label: "last 2 weeks" },
  { value: "thismonth", label: "this month" },
  { value: "lastmhont", label: "last month" },
  { value: "thisyear", label: "this year" },
  { value: "none", label: "none" },
];

export const OPTIONS_USER_1 = [
  { value: "is", label: "is" },
  { value: "not", label: "is not" },
  { value: "none", label: "none" },
  { value: "any", label: "any" },
];

export const OPTIONS_USER_2 = [
  { value: "me", label: "<<me>>" },
  { value: "ducnm", label: "Duc (Internship) Nguyen Minh" },
  { value: "ducnv", label: "Duc 2 (Internship) Nguyen Van" },
  { value: "dungna", label: "Dung Nguyen An  (Internship)" },
  { value: "dungnv", label: "Dung Nguyen Van 6  (Internship)" },
  { value: "hainn", label: "Hai Nguyen Ngoc 1  (Internship)" },
  { value: "hunglv", label: "Hung Le Van  (NSD.SDC6)" },
  { value: "Dunnh", label: "Huy Dung  (Internship)" },
  { value: "khanhvd", label: "Khanh Vu Duy" },
  { value: "quyetnv", label: "Quyet Nguyen Van  (Internship)" },
  { value: "sonnhh", label: "Son (internship) Nguyen Hoang Huu" },
  { value: "thanhpv", label: "Thanh Pham Van 1  (NJP.NJP.DLD)" },
  { value: "vietnv", label: "Viet (Internship) Nguyen Van" },
];

export const OPTIONS_FILTER = [
  { value: "date", label: "Date" },
  { value: "user", label: "User" },
  { value: "activity", label: "Activity" },
  { value: "comment", label: "Comment" },
  { value: "hours", label: "Hours" },
  { value: "productcategory", label: "Product Category" },
  { value: "market", label: "Issue's Market" },
  { value: "target", label: "Issue's Target" },
  { value: "degrade", label: "Issue's Degrade" },
  { value: "contract", label: "Issue's Contract Type" },
  { value: "similar", label: "Issue's Similar" },
  { value: "cause", label: "Issue's Cause" },
  { value: "solution", label: "Issue's Solution" },
  { value: "process", label: "Issue's Process" },
  { value: "customer", label: "Issue's From Customer" },
  { value: "version", label: "Issue's Version" },
  { value: "functionid", label: "Issue's FunctionID" },
  { value: "Bug Type", label: "Issue's Bug Type" },
  { value: "Severity", label: "Issue's Severity" },
  { value: "Department", label: "Issue's Department" },
  { value: "Duplicate", label: "Issue's Duplicate issue" },
  { value: "Tested", label: "Issue's Tested OK" },
  { value: "QnA", label: "Issue's QnA Related" },
  { value: "difficulty", label: "Issue's Difficulty" },
  { value: "testonstaging", label: "Issue's Test on staging OK" },
  { value: "defectorigin", label: "Issue's Defect Origin" },
  { value: "QCActivity", label: "Issue's QC Activity" },
  { value: "defecttype", label: "Issue's Defect Type" },
  { value: "causecategory", label: "Issue's Cause Category" },
  { value: "customer", label: "Issue's Customer" },
  { value: "mainPIC", label: "Issue's Main PIC" },
  { value: "sale", label: "Issue's Sale" },
  { value: "reviewer", label: "Issue's Reviewer" },
  { value: "defectauthor", label: "Issue's Defect Author" },
  { value: "releasedate", label: "Issue's Release Date" },
  { value: "mergetoCR", label: "Issue's Merge to CR" },
  { value: "%Success", label: "Issue's % Success" },
  { value: "expectedrevenue", label: "Issue's Expected Revenue ($)" },
  { value: "currentstate", label: "Issue's Current State" },
  { value: "nextaction", label: "Issue's Next Action" },
  { value: "nextduedate", label: "Issue's Next Due Date" },
  { value: "builded", label: "Issue's Builded" },
  { value: "testchecklist", label: "Issue's Test checklist" },
  { value: "reproduce", label: "Issue's Reproduce?" },
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

// const Report in SpentRime

export const OPTIONS_TIME = [
  { value: "year", label: "Year", hidden: true },
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "days", label: "Days" },
];

export const OPTIONS_ADD = [
  { value: "project", label: "Project" },
  { value: "status", label: "Status" },
  { value: "version", label: "Version" },
  { value: "category", label: "Category" },
];

// const Logtime

export const OPTION_PROJECTS = [
  { value: "project1", label: "Project 1" },
  { value: "project2", label: "Project 2" },
];

export const OPTION_ACTIVITY = [
  { value: "development", label: "Development" },
  { value: "testing", label: "Testing" },
];

export const OPTION_CATEGORY = [
  { value: "category1", label: "Category 1" },
  { value: "category2", label: "Category 2" },
];
