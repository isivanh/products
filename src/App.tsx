import { Grid, Typography, Container } from '@mui/material'
import './App.css'
import { ProductTable } from './components/ProductTable'
import Sidebar from './components/Sidebar'
import { useState } from 'react'
import { Filter } from './types/types'

const getDefaultFilter = ():Filter => ({ status: [] })

function App() {
  const [filters, setFilter] = useState<Filter>(getDefaultFilter)

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, bgcolor: 'background.default' }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4" component="h1" sx={{ mb: 2, color: 'secondary.main' }}>
            Retail Compass
          </Typography>
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
