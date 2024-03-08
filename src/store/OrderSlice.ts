import {SendAnOrder, Dish, Order, ApiDish} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addOrder,
    deleteDish,
    fetchOneOrder,
    fetchDishes,
    fetchOrders,
    addNewDish,
    fetchOneDish,
    updateDish, deleteOrder
} from "./OrderThunk";

interface State {
    cardDishes: Dish[];
    sendAnOrder: SendAnOrder[];
    fetchOneLoading: boolean;
    delete: boolean | string;
    total: number;
    loading: boolean;
    addLoading: boolean;
    cardOrders: Order[];
    orderLoading: boolean;
    oneDish: ApiDish | boolean;
    addDishLoading: boolean;
    updateLoading: boolean;
    dishOne: ApiDish | null;
}

const initialState:State = {
    cardDishes: [],
    sendAnOrder: [],
    fetchOneLoading: false,
    delete: false,
    total: 0,
    loading: false,
    addLoading: false,
    cardOrders: [],
    orderLoading: false,
    oneDish: false,
    addDishLoading: false,
    updateLoading: false,
    dishOne: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{
        orderTotal: (state, action: PayloadAction<number>) => {
            state.total += action.payload;
        },

        ordersArray: (state) => {
            state.sendAnOrder = [];
        },

        removeTotal: (state) => {
            state.total = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDishes.pending, (state) => {
            state.loading = true;
        }).addCase(fetchDishes.fulfilled, (state, {payload: dish}) => {
            state.loading = false;
            state.cardDishes = dish
        }).addCase(fetchDishes.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(fetchOneOrder.pending, (state) => {
            state.fetchOneLoading = true;
        }).addCase(fetchOneOrder.fulfilled, (state, {payload: oneOrder}) => {
            state.fetchOneLoading = false;
            const order = state.sendAnOrder.find(order => order.name === oneOrder.name);

            if(order) {
                order.amount++
            } else {
                state.sendAnOrder.push({...oneOrder, amount: 1},);
            }

        }).addCase(fetchOneOrder.rejected, (state) => {
            state.fetchOneLoading = false;
        });

        builder.addCase(addOrder.pending, (state) => {
            state.addLoading = true;
        }).addCase(addOrder.fulfilled, (state) => {
            state.addLoading = false;
        }).addCase(addOrder.rejected, (state) => {
            state.addLoading = false;
        });

        builder.addCase(deleteDish.pending, (state, action) => {
            state.delete = action.meta.arg
        }).addCase(deleteDish.fulfilled, (state) => {
            state.delete = false;
        }).addCase(deleteDish.rejected, (state) => {
            state.delete = false;
        });

        builder.addCase(fetchOrders.pending, (state) => {
            state.orderLoading = true;
        }).addCase(fetchOrders.fulfilled, (state,{payload: order}) => {
            state.orderLoading = false;
            state.cardOrders = order;
        }).addCase(fetchOrders.rejected, (state) => {
            state.orderLoading = false;
        });

        builder.addCase(addNewDish.pending, state => {
            state.addDishLoading = true
        }).addCase(addNewDish.fulfilled, state => {
            state.addDishLoading = false
        }).addCase(addNewDish.rejected, state => {
            state.addDishLoading = false
        });

        builder.addCase(fetchOneDish.pending, (state) => {
            state.fetchOneLoading = true;
        }).addCase(fetchOneDish.fulfilled, (state, {payload: oneDish}) => {
            state.oneDish = oneDish;
            state.fetchOneLoading = false;
        }).addCase(fetchOneDish.rejected, (state) => {
            state.fetchOneLoading = false;
        });

        builder.addCase(updateDish.pending, (state) => {
            state.updateLoading = true;
        }).addCase(updateDish.fulfilled, (state) => {
            state.updateLoading = false;
        }).addCase(updateDish.rejected, (state) => {
            state.updateLoading = false;
        });

        builder.addCase(deleteOrder.pending, (state, action) => {
            state.delete = action.meta.arg
        }).addCase(deleteOrder.fulfilled, (state) => {
            state.delete = false;
        }).addCase(deleteOrder.rejected, (state) => {
            state.delete = false;
        });
    }
});
export const orderReducer = orderSlice.reducer;
export const {orderTotal,ordersArray,removeTotal} = orderSlice.actions;

