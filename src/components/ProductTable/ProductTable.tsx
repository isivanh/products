import { useEffect, useState, ChangeEvent, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem'
import { useProducts } from '../../hooks/useProducts';
import { Filter, Paging } from '../../types/types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Prices } from '../../types/product';
import { formatLabel, formatPrice } from '../../helpers/helpers';

const getDefaultPaging = ():Paging => ({ page: 0, size: 20})

export const ProductTable = ({filter}: {filter: Filter}) => {
  const [paging, setPaging] = useState<Paging>(getDefaultPaging);
  const { products, pagingResponse ,getProducts, error } = useProducts(filter, paging, false );

  useEffect(() => {
    setPaging(getDefaultPaging());
  }, [filter]);
  
  useEffect(() => {
    getProducts(filter, paging);
  }, [filter, paging]);

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    setPaging(prev => ({
      ...prev,
      page: value - 1
    }));
  };
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  const calculateDiscount = (price: Prices): string => 
    (((price.normalPrice - price.lowest) / price.normalPrice) * 100).toFixed(2);

  return (
    <Fragment>
      <Pagination
          onChange={handleChange}
          count={pagingResponse?.pages}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      <TableContainer
        sx={{
          backgroundColor: 'background.default',
          borderRadius: 2,
          boxShadow: 1,
          border: '1px solid',
          borderColor: 'divider',
          mt: 2,
          mb: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: 'primary.main',
                '& .MuiTableCell-head': {
                  color: 'common.white',
                  fontWeight: 'bold',
                  fontSize: 16,
                },
              }}
            >
              <TableCell>Name</TableCell>
              <TableCell align="right">Store</TableCell>
              <TableCell align="right">Regular price</TableCell>
              <TableCell align="right">Offer price</TableCell>
              <TableCell align="right">Lowest price</TableCell>
              <TableCell align="right">Discount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow
                key={product.productId}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  textTransform: 'capitalize',
                }}
              >
                <TableCell component="th" scope="row">
                  {formatLabel(product.name)}
                </TableCell>
                <TableCell align="right">{product.storeName}</TableCell>
                <TableCell align="right">{formatPrice(product.prices.normalPrice)}</TableCell>
                <TableCell align="right">{formatPrice(product.prices.offerPrice)}</TableCell>
                <TableCell align="right">{formatPrice(product.prices.lowest)}</TableCell>
                <TableCell align="right">{calculateDiscount(product.prices)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
