export function getPagination(page = 1, pageSize = 10) {
  const safePage = page > 0 ? page : 1;
  const safePageSize = pageSize > 0 && pageSize <= 100 ? pageSize : 10;
  const skip = (safePage - 1) * safePageSize;
  const limit = safePageSize;
  return { skip, limit, page: safePage, pageSize: safePageSize };
}
