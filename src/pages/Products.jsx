import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductModal from "../components/Modals/productModal";
import { deleteProduct } from "../store/products";
import { uiActions } from "../store/ui";



export default function Products() {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false);
  const closeModal= ()=> { setOpen(false) ; setEdit(false) } 
  const openModal = ()=> setOpen(true)
  
  const dispatch = useDispatch()
  const products = useSelector(state=> state.products.data)
  const categories = useSelector(state=> state.categories.data)
  const brands = useSelector(state=> state.brands.data)


  const rows = products.map((prod)=> ({
    id: prod.id, 
    name: prod.name, 
    category: prod.category,
    brand: prod.brand, 
    stock : prod.stock
  }))
  

  
  const handleDelete = (id)=>{
    dispatch(deleteProduct(id))
    }

    console.log(products)


  const handleEdit = (product)=>{
    setEdit(true)
    setOpen(true)
    const modalData = {

      brand_id: brands.find(b=> b.name === product.brand).id,
      category_id: categories.find(c=> c.name ===product.category).id,
      name: product.name, 
      id: product.id
    }

   dispatch(uiActions.setModalData(modalData));
   

  }

  const columns = [
    {field:"id", headerName:"#", width:100},
    {field:"name", headerName:'Name', width:250},
    {field:"category", headerName:'Category', width:250},
    {field:"brand", headerName:'Brand', width:250},
    {field:"stock", headerName:'Stock', width:250},
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
          Products
        </Typography> 
        <Button variant="contained" onClick={openModal}>New Product</Button>
      </Stack>

      <Container maxWidth="xl">
        <DataGrid 
        
         columns={columns}
         rows={rows}
         slots={{ toolbar: GridToolbar }}  
         disableRowSelectionOnClick 
         sx={{bgcolor:'white',  
         '&.MuiDataGrid-root .MuiDataGrid-cell':{ outline: 'none !important'}
         }}
 
        />
      </Container>
        <ProductModal open={open} edit={edit} closeModal={closeModal}/>
    </Box>
  )
}
