import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSale, editSale } from "../../store/sales";
import { uiActions } from "../../store/ui";
import style from "./style";

export default function SaleModal({ open, closeModal, edit }) {
  const dispatch = useDispatch();

  const modalData = useSelector((state) => state.ui.modalData);
  const initialValues = edit
    ? modalData
    : {  brand_id: "", product_id: "", quantity:"", price:"" };
  const products = useSelector((state) => state.products.data);
  const brands = useSelector((state) => state.brands.data);

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    if (edit) dispatch(editSale({...values, quantity: Number(values.quantity)}));
    else dispatch(createSale({...values, quantity: Number(values.quantity)}));
    actions.resetForm();
    closeModal();

  };

  const handleClose = () => {
    dispatch(uiActions.setModalData({}));
    closeModal();
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
          <FormControl sx={{ mb: 2, width: "100%" }}>
              <InputLabel>Brand</InputLabel>
              <Field as={Select} name="brand_id" label="Brand" required>
                {brands.map((brand) => (
                  <MenuItem value={brand.id} key={brand.id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>

            <FormControl sx={{ mb: 2, width: "100%" }}>
              <InputLabel>Product</InputLabel>
              <Field as={Select} name="product_id" label="Product" required>
                {products.map((prod) => (
                  <MenuItem value={prod.id} key={prod.id}>
                    {prod.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            
            <Field
              as={TextField}
              type="text"
              name="quantity"
              variant="outlined"
              label="Quantity"
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <Field
              as={TextField}
              type="text"
              name="price"
              variant="outlined"
              label="Price"
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            
            

            <Stack direction="row" justifyContent="space-between">
              <Button type="submit" variant="contained" size="large">
                {edit ? "Update Sale" : "Add new Sale"}
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={handleClose}
              >
       
                Cancel
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
}
