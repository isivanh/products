import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import {FilterTypes, FilterMap} from '../types/types'

const getStatus = (): Array<string> => ['AVAILABLE','OUT_OF_STOCK'];

const getBrands = (): Array<string> => ['Samsung','LG','Sony','MARQUIS'];

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

interface FilterBoxProps {
  filterType: FilterTypes;
  checkedMap: FilterMap;
  onChange?: (checkedMap: FilterMap) => void;
}

const FilterBox = (props : FilterBoxProps) => {
  const {filterType, checkedMap, onChange} = props;
  const handleChange = (label: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedMap = {
      ...checkedMap,
      [label]: event.target.checked,
    };
    if (onChange) {
      onChange(newCheckedMap);
    }
  };

  const handleRadio = (label: string) => (_: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const newCheckedMap = Object.keys(checkedMap).reduce((acc, key) => {
        acc[key] = key === label;
        return acc;
      }, {} as FilterMap);
      onChange(newCheckedMap);
    }
  };

  const mappedCheckboxGroup = Object.keys(checkedMap).map((label) => (
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

  const mappedRadioGroup = Object.keys(checkedMap).map((label) => (
    <FormControlLabel
      key={label}
      control={
        <Radio
          checked={checkedMap[label]}
          onChange={handleRadio(label)}
        />
      }
      label={label.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
    />
  ))

  const getForm = () => {
    switch(filterType){
      case FilterTypes.STATUS : return mappedCheckboxGroup;
      case FilterTypes.BRAND : return mappedRadioGroup;
    }
      
  }
  
  return (
    <FormGroup>
      {
        getForm()
      }
    </FormGroup>
  );
}
export default FilterBox;