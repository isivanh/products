import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function Sidebar(){
  const [chipData, setChipData] = React.useState<ChipData[]>([
    { key: 0, label: 'test' },
  ]);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const [statusChecked, setStatusChecked] = React.useState<{ [label: string]: boolean }>({
    AVAILABLE: false,
    OUT_OF_STOCK: false,
  });
  
  const handleStatusChange = (label: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusChecked({
      ...statusChecked,
      [label]: event.target.checked,
    });
    setChipData((chips) => {
      // Si se selecciona, agregar el chip si no existe
      if (event.target.checked) {
        if (!chips.some(chip => chip.label === label)) {
          return [...chips, { key: Date.now(), label }];
        }
        return chips;
      }
      // Si se deselecciona, eliminar el chip
      return chips.filter(chip => chip.label !== label);
    });
  };


  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <div>
      {chipData.map((data) => {
        let icon;
        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
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
          <FormGroup>
            <FormControlLabel control={
              <Checkbox 
                checked={statusChecked['AVAILABLE']}
                onChange={handleStatusChange('AVAILABLE')}
              />
              } 
              label="Available" 
            />
            <FormControlLabel control={<Checkbox 
              checked={statusChecked['OUT_OF_STOCK']}
              onChange={handleStatusChange('OUT_OF_STOCK')}
              />
              }
              label="Out of stock" 
            />
          </FormGroup>
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
        </AccordionDetails>
      </Accordion>
    </div>
    </div>
  );
}
export default Sidebar;