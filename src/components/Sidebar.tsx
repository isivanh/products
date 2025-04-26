import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Filter from './Filter';
import { FilterTypes, FilterMap, getFilters } from './Filter';


interface ChipData {
  key: string;
  label: string;
  type: FilterTypes;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function Sidebar(){
  const [chipData, setChipData] = React.useState<ChipData[]>([]);
  const [statusMap, setStatusMap] = React.useState<FilterMap>(getFilters(FilterTypes.STATUS));
  const [brandMap, setBrandMap] = React.useState<FilterMap>(getFilters(FilterTypes.BRAND));
  const [expanded, setExpanded] = React.useState<string | false>(false);
  
  const syncChipsWithFilters = (status: FilterMap, brand: FilterMap) => {
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

    setChipData([...statusChips, ...brandChips]);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleDelete = (chipToDelete: ChipData) => () => {
    if (chipToDelete.type === FilterTypes.STATUS) {
      const newStatusMap = { ...statusMap, [chipToDelete.label]: false };
      setStatusMap(newStatusMap);
      syncChipsWithFilters(newStatusMap, brandMap);
    } else if (chipToDelete.type === FilterTypes.BRAND) {
      const newBrandMap = { ...brandMap, [chipToDelete.label]: false };
      setBrandMap(newBrandMap);
      syncChipsWithFilters(statusMap, newBrandMap);
    }
  };
  const handleStatusFilterChange = (checkedMap: FilterMap) => {
    setStatusMap(checkedMap);
    syncChipsWithFilters(checkedMap, brandMap);
  };
  const handleBrandFilterChange = (checkedMap: FilterMap) => {
    setBrandMap(checkedMap);
    syncChipsWithFilters(statusMap, checkedMap);
  };

  return (
    <div>
      {chipData.map((data) => {
        return (
          <ListItem key={data.key}>
            <Chip
              label={data.label.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
              onDelete={ handleDelete(data)}
            />
          </ListItem>
        );
      })}
      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
              Status
            </Typography>
            <Typography component="span" sx={{ color: 'text.secondary' }}>
              Available, un-available...
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Filter type={FilterTypes.STATUS} onChange={handleStatusFilterChange} checkedMap={statusMap}/>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
              Brands
            </Typography>
            <Typography component="span" sx={{ color: 'text.secondary' }}>
              Samsung, LG, Sony, MARQUIS...
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Filter type={FilterTypes.BRAND} onChange={handleBrandFilterChange} checkedMap={brandMap}/>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
export default Sidebar;