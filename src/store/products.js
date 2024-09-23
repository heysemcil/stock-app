import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const URL = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem('token')

const productSlice = createSlice({
    name:"products",
    initialState:{data:[]},
    reducers:{
        getProducts(state, action){
            state.data = action.payload;
        },
        createProduct(state, action){
            state.data.push(action.payload)
        }, 
        deleteProduct(state, action){
            state.data = state.data.filter(p=> p.id !== action.payload)
        }, 
        editProduct(state, action){
            let index = state.data.findIndex(c=> c.id ===action.payload.id)
            state.data[index]= action.payload
        }
    }
})

// Async Actions
export const getProducts=()=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/products/`, {
                headers:{Authorization:`Token ${token}`}
            })
    
            if(res.status===200)
                dispatch(productSlice.actions.getProducts(res.data))
        }catch(error){
            console.log(error);
        }

    }
}



export const createProduct=(product)=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/products/`, {
                method:"POST",
                headers:{Authorization:`Token ${token}`},
                data:product
            })
            if(res.status===201){
                toast.success('Product created successfully')
                dispatch(productSlice.actions.createProduct(res.data))

            }
        }catch(error){
            console.log(error);
            if(error.status===403)
       
                toast.error(error.response.data.detail)
        }

    }
}


export const deleteProduct = (id)=>{
    return async(dispatch)=>{
        try{
          await axios(`${URL}/stock/products/${id}/`, {
                method:"DELETE",
                headers:{Authorization:`Token ${token}`},
            })
            toast.success('Product deleted successfully')    
            dispatch(productSlice.actions.deleteProduct(id))
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }
    }
}
export const editProduct = (product)=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/products/${product.id}/`, {
                method:"PUT",
                headers:{Authorization:`Token ${token}`},
                data:product
            })
            if(res.status===200){


                toast.success('Product updated successfully')
                dispatch(productSlice.actions.editProduct(res.data))

            }
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }

    }
}



export const productsReducer = productSlice.reducer