import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
  data: T[];
  hasNextPage: boolean;
  totalRecords: number;
  pageNumber: number;
  pageLimit: number;
  to: number;
  from: number;
}

export function PaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiProperty({ type: [classReference] })
    data!: T[];

    @ApiProperty({
      type: Boolean,
      example: true,
    })
    hasNextPage: boolean;

    @ApiProperty({
      type: Number,
      example: 10,
    })
    totalRecords: number;

    @ApiProperty({
      type: Number,
      example: 1,
    })
    pageNumber: number;

    @ApiProperty({
      type: Number,
      example: 10,
    })
    pageLimit: number;

    @ApiProperty({
      type: Number,
      example: 1,
    })
    from: number;

    @ApiProperty({
      type: Number,
      example: 10,
    })
    to: number;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `Pagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
