import { createSlice } from "@reduxjs/toolkit";
let arr
let price
if(localStorage.getItem("product")!=undefined){
    arr=JSON.parse(localStorage.getItem("product"))
    if(arr.length===0){
        price=0
    }else{
        price=arr.map(item=>item.price).reduce((acc,tot)=>acc+tot)
    }
}else{
    arr=[]
}
export const cartSlice=createSlice({
    name:'cart',
    initialState:{
        count:arr.length,
        total:price
    },
    reducers:{
        increaseCart:(state)=>{
            if(localStorage.getItem("product")!=undefined){
                arr=JSON.parse(localStorage.getItem("product"))
                state.count=arr.length
                if(arr.length===0){
                    price=0
                }else{
                    price=arr.map(item=>item.price*item.quantity).reduce((acc,tot)=>acc+tot)
                }
                state.total=price
            }
        }
    }
})
export const {increaseCart}=cartSlice.actions
export default cartSlice.reducer