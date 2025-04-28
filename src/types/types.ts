export interface ChipData {
  key: string;
  label: string;
  type: FilterTypes;
}

export enum FilterTypes {
  STATUS,
  BRAND,
}

export interface FilterMap {
  [label: string]: boolean;
}

export interface Filter {
  status: string[];
  brand?: string;
}
export interface Paging {
  page: number;
  size: number;
}

export interface PagingResponse {
  pages: number;
  currentPage: number;
  size: number;
  total: number;
}

export interface SearchProductsParams {
  filters: Filter;
  paging: Paging;
}
