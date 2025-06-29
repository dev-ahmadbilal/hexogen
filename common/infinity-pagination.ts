import { InfinityPaginationResponseDto } from './dto/infinity-pagination-response.dto';
import { IPaginationOptions } from './types/pagination-options';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
  total?: number,
): InfinityPaginationResponseDto<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
    totalRecords: total,
  };
};
