import { Button, Stack, Typography, Box, Container, Grid } from "@mui/material";
import StyledCard from "../components/StyledCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteBrand, getBrands } from "../store/brands";
import BrandModal from "../components/Modals/BrandModal";
import { uiActions } from "../store/ui";

export default function Brands() {
  const dispatch = useDispatch()
  const brands = useSelector(state=> state.brands.data)
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false);
  const closeModal= ()=> {
    setOpen(false)
    setEdit(false)
  } 
  const openModal = ()=> setOpen(true)
  
  useEffect(()=>{
    dispatch(getBrands())
  }, [dispatch])


  const handleDelete = (id)=>{
    dispatch(deleteBrand(id))
  }
  const handleEdit = (brand)=>{
    setEdit(true)
    setOpen(true)
    dispatch(uiActions.setModalData(brand))
  }
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography component="h1" variant="h5" color="inherit" noWrap>
          Brands
        </Typography>
        <Button variant="contained" onClick={openModal}>New Brand</Button>
      </Stack>
      <Container maxWidth="xl">

        <Grid container spacing={5}>
          {brands.map(brand=>(
          <Grid item xs={12} md={6} xl={3}>
          <StyledCard item={brand} onDelete={handleDelete} onEdit={handleEdit}/>
          </Grid>
          ))}

        </Grid>

       
       <BrandModal closeModal={closeModal} open={open} edit={edit}/>

      </Container>
    </Box>
  );
}
