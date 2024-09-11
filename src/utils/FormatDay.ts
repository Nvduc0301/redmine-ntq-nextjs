import moment from "moment";
import "moment-timezone";
const timezone = "Asia/Ho_Chi_Minh";

moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});

// format date
export const formatDate = (date: string, showTodayAsDate: boolean = false): string => {
  const formattedDate = moment(date).format("MM/DD/YYYY");
  const today = moment().format("YYYY-MM-DD");

  if (today === moment(date).format("YYYY-MM-DD")) {
    return showTodayAsDate ? formattedDate : "Today";
  }

  return formattedDate;
};
export const getCurrentTime = () => moment().tz(timezone);
export const getStartOfWeek = () => moment().tz(timezone).startOf("week");
export const getEndOfWeek = () => moment().tz(timezone).endOf("week");
export const getStartOfMonth = () => moment().tz(timezone).startOf("month");
export const getEndOfMonth = () => moment().tz(timezone).endOf("month");
export const getLastWeekOfPreviousMonth = () => {
  // Lấy ngày đầu của tháng hiện tại và trừ đi 1 ngày để có ngày cuối cùng của tháng trước
  const endOfPreviousMonth = moment().tz(timezone).startOf("month").subtract(1, "day");
  // Lấy tuần cuối cùng của tháng trước
  return moment(endOfPreviousMonth).tz(timezone).startOf("week");
};
export const getCreatedTimeAgo = (date?: string): string => {
  return moment(date).fromNow();
};
export const getLastWeekOfCurrentMonth = () => {
  // Lấy ngày cuối cùng của tháng hiện tại
  const endOfCurrentMonth = moment().tz(timezone).endOf("month");
  // Lấy tuần cuối cùng của tháng hiện tại
  return moment(endOfCurrentMonth).tz(timezone).startOf("week");
};
export const formatTime = (date: string) => {
  const vietnamTime = moment.utc(date).add(7, "hours").format("h:mm A");
  return vietnamTime;
};

export const isToday = (date: moment.Moment): boolean => {
  return date.isSame(getCurrentTime(), "day");
};

export const isThisWeek = (date: moment.Moment): boolean => {
  return date.isBetween(getStartOfWeek(), getEndOfWeek(), "day", "[]");
};

export const isThisMonth = (date: moment.Moment): boolean => {
  return date.isBetween(getStartOfMonth(), getEndOfMonth(), "day", "[]");
};
export const getDaysInMonth = (): number => {
  // Lấy ngày đầu tiên của tháng hiện tại
  const startOfMonth = moment().startOf("month");

  // Lấy số ngày trong tháng hiện tại
  return startOfMonth.daysInMonth();
};
// Hàm xác định ngày bắt đầu và kết thúc của tuần và tháng
export const getWeekAndMonthDates = () => {
  const startOfWeek = getStartOfWeek();
  const endOfWeek = getEndOfWeek();
  const startOfMonth = getStartOfMonth();
  const endOfMonth = getEndOfMonth();
  const LastWeekOfPreviousMonth = getLastWeekOfPreviousMonth();
  const LastWeekOfCurrentMonth = getLastWeekOfCurrentMonth();
  return { startOfWeek, endOfWeek, startOfMonth, endOfMonth, LastWeekOfPreviousMonth, LastWeekOfCurrentMonth };
};

export default moment;

export const formatDateTime = (datetime: string | undefined) => {
  const formattedDateTime = moment(datetime).format("MM/DD/YYYY hh:mm A");
  return formattedDateTime;
};
export const formatDateMonth = (datetime?: string) => {
  const formatDateMonth = moment(datetime).format("MM/DD/YYYY");
  return formatDateMonth;
};

// const originalDateTime = '2024-08-04T10:03:31Z';
// const formattedDateTime = formatDateTime(originalDateTime);
