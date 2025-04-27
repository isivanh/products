import {FilterTypes, FilterMap, Filter, ChipData} from '../types/types'

export const syncChipsWithFilters = (status: FilterMap, brand: FilterMap): Array<ChipData> => {
    const statusChips = Object.entries(status)
      .filter(([_, checked]) => checked)
      .map(([label]) => ({
        key: `status-${label}`,
        label,
        type: FilterTypes.STATUS,
      }));

    const brandChips = Object.entries(brand)
      .filter(([_, checked]) => checked)
      .map(([label]) => ({
        key: `brand-${label}`,
        label,
        type: FilterTypes.BRAND,
      }));

    return([...statusChips, ...brandChips]);
  };

export const getFilterFromFilterMap = (status: FilterMap, brand: FilterMap): Filter => {
  const statusFilter = Object.entries(status)
    .filter(([_, checked]) => checked)
    .map(([label]) => label);

  const brandFilter = Object.entries(brand)
    .filter(([_, checked]) => checked)
    .map(([label]) => label)[0] ?? '';
  
  return {status: statusFilter, brand: brandFilter }
}