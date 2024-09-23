import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

const URL = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem('token')

const brandsSlice = createSlice({
    name:"brands",
    initialState:{data:[]},
    reducers:{
        getBrands(state, action){
            state.data = action.payload
        },
        createBrand(state, action){
            state.data.push(action.payload)
        },
        deleteBrand(state, action){
            state.data = state.data.filter(c=> c.id !== action.payload)

        }, 
        editBrand(state, action){
            let index = state.data.findIndex(c=> c.id ===action.payload.id)
            state.data[index]= action.payload
        }
    }
})


// Async Actions
// CRUD
export const getBrands=()=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/brands/`, {
                headers:{Authorization:`Token ${token}`}
            })
    
            if(res.status===200)
                dispatch(brandsSlice.actions.getBrands(res.data))
        }catch(error){
            console.log(error);
        }

    }
}
export const createBrand=(brand)=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/brands/`, {
                method:"POST",
                headers:{Authorization:`Token ${token}`},
                data:brand
            })
            if(res.status===201)
                toast.success('Brand created successfully')
                dispatch(brandsSlice.actions.createBrand(res.data))
        }catch(error){
            console.log(error);
            if(error.status===403)
       
                toast.error(error.response.data.detail)
        }

    }
}


export const deleteBrand = (id)=>{
    return async(dispatch)=>{
        try{
          await axios(`${URL}/stock/brands/${id}/`, {
                method:"DELETE",
                headers:{Authorization:`Token ${token}`},
            })
            toast.success('Brand deleted successfully')    
            dispatch(brandsSlice.actions.deleteBrand(id))
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }

    }
}
export const editBrand = (brand)=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/brands/${brand.id}/`, {
                method:"PUT",
                headers:{Authorization:`Token ${token}`},
                data:brand
            })
            if(res.status===200)
                toast.success('Brand updated successfully')
                dispatch(brandsSlice.actions.editBrand(brand))
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }

    }
}


export const brandReducer = brandsSlice.reducer 