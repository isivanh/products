import {FilterTypes, ChipData, FilterMap, Filter} from '../types/types'
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import {syncChipsWithFilters, getFilterFromFilterMap} from '../helpers/helpers'
import {Dispatch, SetStateAction} from 'react'

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
  display: 'inline-block',
  listStyle: 'none',
  padding: 0,
}));

interface ListChipProps {
  chipData: ChipData[];
  setProductStatus: Dispatch<SetStateAction<FilterMap>>;
  setProductBrand: Dispatch<SetStateAction<FilterMap>>;
  setChipData: Dispatch<SetStateAction<ChipData[]>>;
  productStatus: FilterMap;
  productBrand: FilterMap;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export const ListChip = ({chipData, setProductStatus, setProductBrand, setChipData, productStatus, productBrand, setFilter}: ListChipProps) => {
  const handleDelete = (chipToDelete: ChipData) => () => {
    if (chipToDelete.type === FilterTypes.STATUS) {
      const newProductStatus = { ...productStatus, [chipToDelete.label]: false };
      setProductStatus(newProductStatus);
      setChipData(syncChipsWithFilters(newProductStatus, productBrand));
      setFilter(getFilterFromFilterMap(newProductStatus, productBrand))
    } else if (chipToDelete.type === FilterTypes.BRAND) {
      const newProductBrand = { ...productBrand, [chipToDelete.label]: false };
      setProductBrand(newProductBrand);
      setChipData(syncChipsWithFilters(productStatus, newProductBrand));
      setFilter(getFilterFromFilterMap(productStatus, newProductBrand))
    }
  };

  const mappedChipItems = chipData?.map((data) => 
    <ListItem key={data.key}>
      <Chip
        label={data.label.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
        onDelete={ handleDelete(data)}
      />
    </ListItem>
  )
  return (
    <ul style={{ padding: 0, margin: 0 }}>
      {mappedChipItems}
    </ul>
  );
}