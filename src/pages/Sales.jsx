import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SaleModal from "../components/Modals/SaleModal";
import { deleteSale, getSales } from "../store/sales";
import { uiActions } from "../store/ui";
import { getProducts } from "../store/products";
import { getBrands } from "../store/brands";
import { getCategories } from "../store/categories";
import { getFirms } from "../store/firms";
import { getPurchaes } from "../store/purchases";



export default function Sales() {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false);
  const closeModal= ()=> { setOpen(false) ; setEdit(false) } 
  const openModal = ()=> setOpen(true)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getFirms());
    dispatch(getSales())
    dispatch(getPurchaes())
  }, [dispatch]);


const sales = useSelector(state=> state.sales.data);
  const products = useSelector(state=> state.products.data)
  const brands = useSelector(state=> state.brands.data)


  console.log(sales)

  const rows = sales.map((sale, index)=> ({
    id: sale.id, 
    no:  index+1, 
    product: sale?.product,
    brand: sale?.brand, 
    category : sale?.category[0]?.name, 
    price: sale?.price, 
    quantity: sale?.quantity, 
    total_price: sale.price_total, 
    'Date-Time':`${sale.createds} - ${sale.time_hour}`,
    Owner: sale?.user, 

  }))

  
  const handleDelete = (id)=>{
    dispatch(deleteSale(id))
  }


  const handleEdit = (sale)=>{
    setEdit(true)
    setOpen(true)
    const modalData = {

      brand_id: brands.find(b=> b.name === sale.brand).id,
      product_id: products.find(p=> p.name===sale.product).id,
      quantity: sale.quantity,
      price: sale.price, 
      id: sale.id
    }

   dispatch(uiActions.setModalData(modalData));
   

  }

  const columns = [
    {field:"id", headerClass:"hidden-header", width:50},
    {field:"no", headerName:'#', width:50},
    {field:"product", headerName:'Product', width:150},
    {field:"brand", headerName:'Brand', width:150},
    {field:"category", headerName:'Category', width:150},
    {field:"price", headerName:'Price', width:150},
    {field:"quantity", headerName:'Quantity', width:150},
    {field:"total_price", headerName:'Total Price', width:150},
    {field:"Date-Time",  width:150},
    {field:"Owner", width:150},
    {field: "actions", headerName:"Actions", 
      renderCell:({row})=>{
       
        return (
          <Stack direction="row" spacing={2} mt={1} alignItems="center">
            <IconButton onClick={()=> handleEdit(row)}>
              <EditIcon sx={{color:'orange'}}/>
            </IconButton>
            <IconButton onClick={()=> handleDelete(row.id)}>
              <DeleteOutlineIcon sx={{color:'red'}}/>
            </IconButton>
          </Stack>
        )
      }
    }
  ]
  return (

    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography variant="h5" component="h1" color="inherit" noWrap>
          Sales
        </Typography> 
        <Button variant="contained" onClick={openModal}>New Sale</Button>
      </Stack>
      <Container maxWidth="xl">
          <DataGrid columns={columns}
          rows={rows}
          slots={{toolbar:GridToolbar}}
          disableRowSelectionOnClick
          sx={{bgcolor:'white', '&.MuiDataGrid-root .MuiDataGrid-cell':{outline:'none !important'}}}
          />
        </Container>
        <SaleModal open={open} edit={edit} closeModal={closeModal}/>
    </Box>
  )
}
