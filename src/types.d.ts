export interface ApiDish {
    img:string;
    name: string;
    price: number;
}

export interface Dish extends ApiDish {
    [id:string];
}

export interface ApiDishes {
    [id:string]: ApiDish;
}

export interface DishMutation {
    name: string;
    img: string;
    price: string;
}

export interface ApiOrder {
    img:string;
    name: string;
    price: number;
    amount: number;
    total: number;
}

export interface Order extends ApiOrder {
    [id:string];
}

export interface ApiOrders {
    [id:string]: ApiOrder;
}

export interface SendAnOrder extends ApiOrder {
    [id:string];
}

export interface UpdateDishParams {
    dishId: string;
    apiDish: ApiDish;
}