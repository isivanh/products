import { Grid, Container } from '@mui/material'
import { ProductTable } from './components/ProductTable/ProductTable'
import Sidebar from './components/Sidebar/Sidebar'
import { useState } from 'react'
import { Filter } from './types/types'
import Logo from './assets/logo.svg';

const getDefaultFilter = ():Filter => ({ status: [] })

function App() {
  const [filters, setFilter] = useState<Filter>(getDefaultFilter)

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, bgcolor: 'background.default' }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <img src={Logo} alt="" height="48"/>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Sidebar setFilter={setFilter} />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }} sx={{ mb: 2, bgcolor: 'background.default' }}>
          <ProductTable filter={filters}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App
