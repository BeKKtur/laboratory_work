import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {deleteOrder, fetchOrders} from "../../store/OrderThunk";

const Orders = () => {
        const orders = useAppSelector(state => state.order.cardOrders);
        const dispatch = useAppDispatch();

    const removeDish = async (id:string) => {
        await dispatch(deleteOrder(id));
        await dispatch(fetchOrders());
    }

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch]);
    return (
        <>
            {Object.entries(orders).map(([key,value]) => (
                <div key={key} className='cards_blocks'>
                    {Object.entries(value).map(([dish, dishData]) => (
                        <div key={dish} className='orders_card'>
                            <h3>{dishData.name}</h3>
                            <h4>{dishData.price}</h4>
                            <p>{dishData.amount}</p>
                            <p>{dishData.total}</p>
                        </div>
                    ))}
                    <button onClick={() => removeDish(value.id)} className='button'>Complete order</button>
                </div>
            ))}
        </>
    );
};

export default Orders;