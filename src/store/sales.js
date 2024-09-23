import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const URL = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem('token')

const salesSlice = createSlice({
    name:"sales",
    initialState:{data:[]},
    reducers:{
        getSales(state, action){
            state.data = action.payload;
        },
        createSale(state, action){
            state.data.push(action.payload)
        }, 
        deleteSale(state, action){
            state.data = state.data.filter(p=> p.id !== action.payload)
        }, 
        editSale(state, action){
            let index = state.data.findIndex(c=> c.id ===action.payload.id)
            state.data[index]= action.payload
        }
    }
})

// Async Actions
export const getSales=()=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/sales/`, {
                headers:{Authorization:`Token ${token}`}
            })
    
            if(res.status===200)
                dispatch(salesSlice.actions.getSales(res.data))
        }catch(error){
            console.log(error);
        }

    }
}



export const createSale=(sale)=>{
    return async(dispatch)=>{
  
        try{
            const res = await axios(`${URL}/stock/sales/`, {
                method:"POST",
                headers:{Authorization:`Token ${token}`},
                data:sale
            })
            if(res.status===201){
                toast.success('Sale created successfully')
                dispatch(salesSlice.actions.createSale(res.data))

            }
        }catch(error){
            console.log(error)
            if(error.response.status===400)
                toast.error(error.response.data.message)
            if(error.status===403)
                toast.error(error.response.data.detail)
        }

    }
}


export const deleteSale = (id)=>{
    return async(dispatch)=>{
        console.log(id)
        try{
          await axios(`${URL}/stock/sales/${id}/`, {
                method:"DELETE",
                headers:{Authorization:`Token ${token}`},
            })
            toast.success('Sale deleted successfully')    
            dispatch(salesSlice.actions.deleteSale(id))
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }
    }
}
export const editSale = (sale)=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/sales/${sale.id}/`, {
                method:"PUT",
                headers:{Authorization:`Token ${token}`},
                data:sale
            })
            if(res.status===200){


                toast.success('Sale updated successfully')
                dispatch(salesSlice.actions.editSale(res.data))

            }
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }

    }
}



export const saleReducer = salesSlice.reducer