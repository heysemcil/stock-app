import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const URL = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem('token')

const purchaesSlice = createSlice({
    name:"purchases",
    initialState:{data:[]},
    reducers:{
        getPurchaes(state, action){
            state.data = action.payload;
        },
        createPurchase(state, action){
            state.data.push(action.payload)
        }, 
        deletePurchase(state, action){
            state.data = state.data.filter(p=> p.id !== action.payload)
        }, 
        editPurchase(state, action){
            let index = state.data.findIndex(c=> c.id ===action.payload.id)
            state.data[index]= action.payload
        }
    }
})

// Async Actions
export const getPurchaes=()=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/purchases/`, {
                headers:{Authorization:`Token ${token}`}
            })
    
        
            if(res.status===200)
                dispatch(purchaesSlice.actions.getPurchaes(res.data))
        }catch(error){
            console.log(error);
        }

    }
}



export const createPurchase=(purchase)=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/purchases/`, {
                method:"POST",
                headers:{Authorization:`Token ${token}`},
                data:purchase
            })
            if(res.status===201){
                toast.success('Purchase created successfully')
                dispatch(purchaesSlice.actions.createPurchase(res.data))

            }
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }

    }
}


export const deletePurchase = (id)=>{
    return async(dispatch)=>{
        try{
          await axios(`${URL}/stock/purchases/${id}/`, {
                method:"DELETE",
                headers:{Authorization:`Token ${token}`},
            })
            toast.success('Purchase deleted successfully')    
            dispatch(purchaesSlice.actions.deletePurchase(id))
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }
    }
}
export const editPurchase = (purchase)=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/purchases/${purchase.id}/`, {
                method:"PUT",
                headers:{Authorization:`Token ${token}`},
                data:purchase
            })
            if(res.status===200){


                toast.success('Purchase updated successfully')
                dispatch(purchaesSlice.actions.editPurchase(res.data))

            }
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }

    }
}



export const PurchaseReducer = purchaesSlice.reducer