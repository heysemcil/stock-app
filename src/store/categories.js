import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

const URL = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem('token')

const categoriesSlice = createSlice({
    name:"categories",
    initialState:{data:[]},
    reducers:{
        getCategories(state, action){
            state.data = action.payload
        },
        createCategory(state, action){
            state.data.push(action.payload)
        },
        deleteCategory(state, action){
            state.data = state.data.filter(c=> c.id !== action.payload)

        }, 
        editCategry(state, action){
            let index = state.data.findIndex(c=> c.id ===action.payload.id)
            state.data[index]= action.payload
        }
    }
})


// Async Actions
// CRUD
export const getCategories=()=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/categories/`, {
                headers:{Authorization:`Token ${token}`}
            })
    
            if(res.status===200)
                dispatch(categoriesSlice.actions.getCategories(res.data))
        }catch(error){
            console.log(error);
        }

    }
}
export const createCategory=(category)=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/categories/`, {
                method:"POST",
                headers:{Authorization:`Token ${token}`},
                data:category
            })
            if(res.status===201)
                toast.success('Category created successfully')
                dispatch(categoriesSlice.actions.createCategory(res.data))
        }catch(error){
            console.log(error);
            if(error.status===403)
       
                toast.error(error.response.data.detail)
        }

    }
}


export const deleteCategory = (id)=>{
    return async(dispatch)=>{
        try{
          await axios(`${URL}/stock/categories/${id}/`, {
                method:"DELETE",
                headers:{Authorization:`Token ${token}`},
            })
            toast.success('Category deleted successfully')    
            dispatch(categoriesSlice.actions.deleteCategory(id))
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }

    }
}
export const editCategry = (category)=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/categories/${category.id}/`, {
                method:"PUT",
                headers:{Authorization:`Token ${token}`},
                data:category
            })
            if(res.status===200)
                toast.success('Category updated successfully')
                dispatch(categoriesSlice.actions.editCategry(category))
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }

    }
}


export const categoriesReducer = categoriesSlice.reducer 