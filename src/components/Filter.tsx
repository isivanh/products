import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function getStatus(): Array<string>{
  return [
    'AVAILABLE',
    'OUT_OF_STOCK',
  ];
}

function getBrands(): Array<string>{
  return [
    'Samsung',
    'LG',
    'Sony',
    'MARQUIS'
  ];
}

export enum FilterTypes{
  STATUS,
  BRAND
}

export interface FilterMap{
  [label: string]: boolean,
}

export function getFilters(type: FilterTypes): FilterMap{
  switch(type){
    case FilterTypes.STATUS: 
      return getStatus().reduce((acc, value) => {
        acc[value] = false;
        return acc;
      }, {} as FilterMap);
    case FilterTypes.BRAND:
      return getBrands().reduce((acc, value) => {
        acc[value] = false;
        return acc;
      }, {} as FilterMap);
  }  
}

interface FilterProps {
  type: FilterTypes;
  checkedMap: FilterMap;
  onChange?: (checkedMap: FilterMap) => void;
}

function Filter({ type, checkedMap, onChange }: FilterProps){
  const handleChange = (label: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedMap = {
      ...checkedMap,
      [label]: event.target.checked,
    };
    if (onChange) {
      onChange(newCheckedMap);
    }
  };
  
  return (
    <FormGroup>
      {
        Object.keys(checkedMap).map((label) => (
          <FormControlLabel
            key={label}
            control={
              <Checkbox
              checked={checkedMap[label]}
              onChange={handleChange(label)}
            />
            }
            label={label.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
          />
        ))
      }
    </FormGroup>
  );
}
export default Filter;