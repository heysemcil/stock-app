import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

const URL = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem('token')

const firmsSlice = createSlice({
    name:"firms",
    initialState:{data:[]},
    reducers:{
        getFirms(state, action){
            state.data = action.payload
        },
        createFirm(state, action){
            state.data.push(action.payload)
        },
        deleteFirm(state, action){
            state.data = state.data.filter(c=> c.id !== action.payload)

        }, 
        editFirm(state, action){
            let index = state.data.findIndex(c=> c.id ===action.payload.id)
            state.data[index]= action.payload
        }
    }
})


// Async Actions
// CRUD
export const getFirms=()=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/firms/`, {
                headers:{Authorization:`Token ${token}`}
            })
    
            if(res.status===200)
                dispatch(firmsSlice.actions.getFirms(res.data))
        }catch(error){
            console.log(error);
        }

    }
}



export const createFirm=(firm)=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/firms/`, {
                method:"POST",
                headers:{Authorization:`Token ${token}`},
                data:firm
            })
            if(res.status===201)
                toast.success('Firm created successfully')
                dispatch(firmsSlice.actions.createFirm(res.data))
        }catch(error){
            console.log(error);
            if(error.status===403)
       
                toast.error(error.response.data.detail)
        }

    }
}


export const deleteFirm = (id)=>{
    return async(dispatch)=>{
        try{
          await axios(`${URL}/stock/firms/${id}/`, {
                method:"DELETE",
                headers:{Authorization:`Token ${token}`},
            })
            toast.success('Firm deleted successfully')    
            dispatch(firmsSlice.actions.deleteFirm(id))
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }

    }
}
export const editFirm = (firm)=>{
    return async(dispatch)=>{
        try{
            const res = await axios(`${URL}/stock/firms/${firm.id}/`, {
                method:"PUT",
                headers:{Authorization:`Token ${token}`},
                data:firm
            })
            if(res.status===200)
                toast.success('Firm updated successfully')
                dispatch(firmsSlice.actions.editFirm(firm))
        }catch(error){
            console.log(error);
            if(error.status===403)
                toast.error(error.response.data.detail)
        }

    }
}


export const firmsReducer = firmsSlice.reducer 