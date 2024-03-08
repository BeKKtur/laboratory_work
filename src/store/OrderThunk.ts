import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ApiDish, ApiDishes, SendAnOrder, Dish, Order, ApiOrders, UpdateDishParams, ApiOrder} from "../types";

export const fetchDishes = createAsyncThunk<Dish[]>(
    'dishes/fetchDish',
    async () => {
        const {data: dish} = await axiosApi.get<ApiDishes | null>('/dishes.json');
        if (dish === null){
            return []
        }
        return Object.keys(dish).map(id => ({
            id,
            ...dish[id]
        }));

    }
);

export const fetchOneOrder = createAsyncThunk<ApiOrder, string>(
    'dishes/fetchOne',
    async (dishId) => {
        const {data: order} = await axiosApi.get(`/dishes/${dishId}.json`);
        if (order === null) {
            throw new Error('Not found');
        }
        return order;
    }
);

export const addOrder = createAsyncThunk<void , SendAnOrder[]>(
    'dishes/addOrder',
    async (addOrder) => {
        await axiosApi.post('/order.json', addOrder);
    }
);

export const deleteDish = createAsyncThunk<void, string>(
    'dishes/deleteDish',
    async (id:string) => {
        await axiosApi.delete(`/dishes/${id}.json`);
    }
);

export const fetchOrders = createAsyncThunk<Order[]>(
    'dishes/fetchOrder',
    async () => {
        const {data: order} = await axiosApi.get<ApiOrders | null>('/order.json');
        if (order === null){
            return [];
        }
        return Object.keys(order).map(id => ({
            id,
            ...order[id]
        }));

    }
);

export const addNewDish = createAsyncThunk<void, ApiDish>(
    'dishes/addNewDish',
    async (addDish) => {
        await axiosApi.post(`/dishes.json`, addDish);
    }
);

export const fetchOneDish = createAsyncThunk<ApiDish, string>(
    'dishes/fetchOneDish',
    async (dishId, thunkAPI) => {
            const {data: dish} = await axiosApi.get<ApiDish | null>(`/dishes/${dishId}.json`);
            if (dish === null) {
                return thunkAPI.rejectWithValue({code: 'not_found'});
            }
            return dish;
    },
);

export const updateDish = createAsyncThunk<void, UpdateDishParams>(
    'dishes/update',
    async ({dishId, apiDish}) => {
        await axiosApi.put(`/dishes/${dishId}.json`, apiDish);
    },
);

export const deleteOrder = createAsyncThunk<void, string>(
    'dishes/deleteOrder',
    async (id:string) => {
        await axiosApi.delete(`/order/${id}.json`);
    }
);