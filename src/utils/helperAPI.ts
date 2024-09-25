import { axiosInstance } from '~/services/api';
const retry = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay);
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchAPIGet = async (
  endpoint: string,
  ...args: string[]
): Promise<any> => {
  const query = args.join('&');
  return retry(async () => {
    const response = await axiosInstance.get(`${endpoint}?${query}`);
    return response.data;
  });
};
