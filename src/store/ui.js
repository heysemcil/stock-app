import {createSlice} from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name:'ui',
    initialState:{sidebarOpen:false, modalData:{}},
    reducers:{
        toggleMenu(state){
            state.sidebarOpen = !state.sidebarOpen;
        }, 
        setModalData(state, action){
            state.modalData = action.payload
        }
    }
})


const uiReducer = uiSlice.reducer;
const uiActions = uiSlice.actions;
export {uiActions, uiReducer} 