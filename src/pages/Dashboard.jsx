import { Box, Card, CardContent, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../components/Chart";
import DashboardTable from "../components/DashboardTable";
import { getBrands } from "../store/brands";
import { getCategories } from "../store/categories";
import { getFirms } from "../store/firms";
import { getProducts } from "../store/products";
import { getPurchaes } from "../store/purchases";
import { getSales } from "../store/sales";

export default function Dashboard() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getFirms());
    dispatch(getSales())
    dispatch(getPurchaes())
  }, [dispatch]);


const purchases = useSelector(state=> state.purchases.data)
const sales = useSelector(state=> state.sales.data)

const purchasesCount = purchases.map(p=> parseFloat(p.price_total))
const purchasesTotal = purchasesCount.reduce((sum, num)=> sum+num, 0);
const salesCount = sales.map(s=> parseFloat(s.price_total))
const salesTotal = salesCount.reduce((sum, num)=> sum+num, 0);
const total = salesTotal - purchasesTotal;

const pieData = [
  { id: 0, value: purchasesTotal, label: 'Purchases' },
  { id: 1, value: salesTotal, label: 'Sales' },
]

const saleData = sales.map(sale=>({
  time: sale.time_hour, 
  price: parseInt(sale.price_total)
}))

const purchasesData = purchases.map(p=>({
  time: p.time_hour, 
  price: parseInt(p.price_total)
}))


const salesTableHeader = ['#', 'Product', 'Brand', 'Category', 'Price', 'Qty', 'Total Price']
const purchasesTableHeader = ['#', 'Product', 'Firm', 'Brand', 'Category', 'Price', 'Qty', 'Total Price']
  return (
    <Box p={5}>
      <Container maxWidth="xl">
        <Grid container spacing={5} mb={5}>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent sx={{display:'flex', justifyContent:'center'}}>
                <PieChart series={[{data:pieData}]}  width={400} height={200}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card sx={{height:'240'}}>
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}> 
                  <Typography variant="h5">Sales</Typography>
                  <Typography variant="h6" color="green">+${salesTotal}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}> 
                <Typography variant="h5">Purchases</Typography>
                <Typography variant="h6" color="error">-${purchasesTotal}</Typography>

                </Stack>
                <Divider/>
                <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}> 

                <Typography variant="h5">Total</Typography>
                <Typography variant="h6" color={total<0? "error": "green"}>
                  {total<0 ? '-': '+'}
                  ${Math.abs(total).toFixed(2)}</Typography>
                </Stack>


              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={5} mb={5}>
          <Grid item xs={12} lg={6}>
            <Chart name="Sales" data={saleData}/>
          </Grid>
          <Grid item xs={12} lg={6}>
           <DashboardTable title="Recent Sales" header={salesTableHeader} data={sales}/>
          </Grid>
        </Grid>
        <Grid container spacing={5} mb={5}>
          <Grid item xs={12} lg={6}>
            <Chart name="Purchases" data={purchasesData}/>
          </Grid>
          <Grid item xs={12} lg={6}>
          <DashboardTable title="Recent Purchases" header={purchasesTableHeader} data={purchases}/>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}
