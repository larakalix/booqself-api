export const appendQueryParams = (
  url: string,
  queryParams: Record<string, any>,
): string => {
  const urlObj = new URL(url);

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '')
      urlObj.searchParams.append(key, String(value));
  });

  return urlObj.toString();
};
