import { createSlice } from "@reduxjs/toolkit";
const loadCartFromLocalStorage = () => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error loading from localStorage", error);
      return [];
    }
  }
  const saveCartToLocalStorage = (cart) => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:loadCartFromLocalStorage(),
        totalPrice:0
    },
    reducers:{
        addItem:(state,action)=>{
            state.items.push({...action.payload,quantity:1})
            saveCartToLocalStorage(state.items)
        },
        incrementQuantity:(state,action)=>{
            let updatedItems=state.items.map((el)=>el.id===action.payload?{...el,quantity:el.quantity+1}:el)
            state.items=updatedItems
            saveCartToLocalStorage(state.items)
        },
        decrementQuantity:(state,action)=>{
            let findItem=state.items.find((el)=>el.id===action.payload)
            if(findItem.quantity<=1){
                state.items=state.items.filter((el)=>el.id!==action.payload)
            }else{
                let updatedItems=state.items.map((el)=>el.id===action.payload?{...el,quantity:el.quantity-1}:el)
                state.items=updatedItems
            }
            saveCartToLocalStorage(state.items)
        },
        removeItem:(state,action)=>{
            state.items=state.items.filter((el)=>el.id!==action.payload)
            saveCartToLocalStorage(state.items)
        }
    }

})

export const {addItem,incrementQuantity,decrementQuantity,removeItem}=cartSlice.actions

export default cartSlice.reducer