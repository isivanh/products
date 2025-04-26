import { Box, Grid } from '@mui/material'
import './App.css'
import ProductTable from './components/ProductTable'
import Sidebar from './components/Sidebar'



function App() {
  console.log('App component rendered')

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <h1>Products</h1>
        </Grid>
        <Grid size={{xs: 12, md: 4}}>
          <Sidebar/>
        </Grid>
        <Grid size={{xs: 12, md: 8}}>
          <ProductTable/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
