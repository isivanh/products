import {Fragment, useState, SyntheticEvent, Dispatch, SetStateAction } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import FilterBox from './FilterBox';
import { getFilters } from './FilterBox';
import {FilterTypes, ChipData, FilterMap, Filter} from '../types/types'
import {getFilterFromFilterMap, syncChipsWithFilters} from '../helpers/helpers'
import { ListChip } from './ListChip';

interface SidebarProps {
  setFilter: Dispatch<SetStateAction<Filter>>;
}

const Sidebar = ({setFilter}: SidebarProps) => {
  const [chipData, setChipData] = useState<ChipData[]>([]);
  const [productStatus, setProductStatus] = useState<FilterMap>(getFilters(FilterTypes.STATUS));
  const [productBrand, setProductBrand] = useState<FilterMap>(getFilters(FilterTypes.BRAND));
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleStatusFilterChange = (checkedMap: FilterMap) => {
    setProductStatus(checkedMap);
    setChipData(syncChipsWithFilters(checkedMap, productBrand));
    setFilter(getFilterFromFilterMap(checkedMap, productBrand))
  };

  const handleBrandFilterChange = (checkedMap: FilterMap) => {
    setProductBrand(checkedMap);
    setChipData(syncChipsWithFilters(productStatus, checkedMap));
    setFilter(getFilterFromFilterMap(productStatus, checkedMap))
  };

  return (
    <Fragment>
      <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
        Filters
      </Typography>
      <ListChip
        chipData={chipData}
        setProductStatus={setProductStatus}
        setProductBrand={setProductBrand}
        setChipData={setChipData}
        productStatus={productStatus}
        productBrand={productBrand}
        setFilter={setFilter}
      />
      <Accordion 
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{
          backgroundColor: 'background.default',
          borderRadius: 2,
          mb: 2,
          boxShadow: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <AccordionSummary
          sx={{
            fontWeight: 500,
            color: 'primary.main',
            backgroundColor: 'grey.100',
            borderRadius: '8px 8px 0 0',
            minHeight: 48,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Status
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterBox filterType={FilterTypes.STATUS} onChange={handleStatusFilterChange} checkedMap={productStatus}/>
        </AccordionDetails>
      </Accordion>
      <Accordion 
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        sx={{
          backgroundColor: 'background.default',
          borderRadius: 2,
          mb: 2,
          boxShadow: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <AccordionSummary
          sx={{
            fontWeight: 500,
            color: 'primary.main',
            backgroundColor: 'grey.100',
            borderRadius: '8px 8px 0 0',
            minHeight: 48,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Brands
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterBox filterType={FilterTypes.BRAND} onChange={handleBrandFilterChange} checkedMap={productBrand}/>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}
export default Sidebar;