import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { useProducts } from '../hooks/useProducts';
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function ProductTable() {
  const { products, loading, getProducts } = useProducts("", false )

  useEffect(() => {
    getProducts('');
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name </TableCell>
            <TableCell align="right">Store</TableCell>
            <TableCell align="right">Normal price</TableCell>
            <TableCell align="right">Sale price</TableCell>
            <TableCell align="right">lowest price</TableCell>
            <TableCell align="right">price -</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <TableRow
              key={product.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.storeName}</TableCell>
              <TableCell align="right">{product.prices.normalPrice}</TableCell>
              <TableCell align="right">{product.prices.offerPrice}</TableCell>
              <TableCell align="right">{product.prices.lowest}</TableCell>
              <TableCell align="right">{product.sku}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ProductTable;