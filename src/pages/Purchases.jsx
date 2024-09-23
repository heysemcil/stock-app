import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PurchaseModal from "../components/Modals/PurchaseModal";
import { deletePurchase } from "../store/purchases";
import { uiActions } from "../store/ui";



export default function Purchases() {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false);
  const closeModal= ()=> { setOpen(false) ; setEdit(false) } 
  const openModal = ()=> setOpen(true)


  // useEffect(()=>{
  //   dispatch(getProducts());
  //   dispatch(getBrands());
  //   dispatch(getCategories());

  //  }, [])

  const dispatch = useDispatch()
const purchases = useSelector(state=> state.purchases.data);
  const products = useSelector(state=> state.products.data)
  const firms = useSelector(state=> state.firms.data)
  const brands = useSelector(state=> state.brands.data)

  
  const handleDelete = (id)=>{
    dispatch(deletePurchase(id))
  }


  const handleEdit = (purchase)=>{
    setEdit(true)
    setOpen(true)
    const modalData = {

      brand_id: brands.find(b=> b.name === purchase.brand).id,
      product_id: products.find(p=> p.name===purchase.product).id,
      quantity: purchase.quantity,
      price: purchase.price, 
      firm_id: firms.find(f=> f.name===purchase.firm).id,
      id: purchase.id
    }

   dispatch(uiActions.setModalData(modalData));
  
  }


  const rows = purchases.map((purch, index)=> ({
    id: purch.id, 
    no:  index+1, 
    product: purch?.product,
    firm: purch?.firm,
    brand: purch?.brand, 
    category : purch?.category[0]?.name, 
    price: purch?.price, 
    quantity: purch?.quantity, 
    total_price: purch.price_total, 
    'Date-Time':`${purch.createds} - ${purch.time_hour}`,
    Owner: purch?.user, 

  }))
  const columns = [
    {field:"id", headerClass:"hidden-header", width:50},
    {field:"no", headerName:'#', width:50},
    {field:"product", headerName:'Product', width:120},
    {field:"firm", headerName:'Firm', width:120},
    {field:"brand", headerName:'Brand', width:120},
    {field:"category", headerName:'Category', width:120},
    {field:"price", headerName:'Price', width:120},
    {field:"quantity", headerName:'Quantity', width:120},
    {field:"total_price", headerName:'Total Price', width:120},
    {field:"Date-Time",  width:120},
    {field:"Owner", width:120},
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
          Purchases
        </Typography> 
        <Button variant="contained" onClick={openModal}>New Purchase</Button>
      </Stack>
      <Container maxWidth="xl">
          <DataGrid columns={columns}
          rows={rows}
          slots={{toolbar:GridToolbar}}
          disableRowSelectionOnClick
          sx={{bgcolor:'white', '&.MuiDataGrid-root .MuiDataGrid-cell':{outline:'none !important'}}}
          />
        </Container>
        <PurchaseModal open={open} edit={edit} closeModal={closeModal}/>
    </Box>
  )
}
