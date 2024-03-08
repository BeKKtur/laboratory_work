import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {orderTotal, ordersArray, removeTotal} from "../../store/OrderSlice";
import {useEffect, useState} from "react";
import {addOrder, fetchOneOrder, fetchDishes} from "../../store/OrderThunk";
import Spinner from "../spinner/Spinner";

const Dish = () => {
    const [modal, setModal] = useState(false)
    const total = useAppSelector(state => state.order.total);
    const orders = useAppSelector( state => state.order.cardDishes);
    const loading = useAppSelector(state => state.order.loading);
    let sendOrder = useAppSelector(state => state.order.sendAnOrder);
    const dispatch = useAppDispatch();

    const onClickModal = () => {
        setModal(!modal);
    }

    const onClickOrder = async (id:string) => {
        await dispatch(fetchOneOrder(id));
    }

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    const onClick = () => {
        dispatch(addOrder(sendOrder));
        setModal(false);
        dispatch(ordersArray());
        dispatch(removeTotal());
    }

    console.log(sendOrder);


    return loading ? <Spinner/> : (
        <>
            <div className='container-fluid'>
                {orders.map(order => (
                    <div className='cards_blocks' key={order.id} onClick={() => onClickOrder(order.id)}>
                        <div className='cards_block' onClick={() => dispatch(orderTotal(order.price))}>
                            <img
                                src={order.img}
                                alt="photo" className='image'/>
                            <div>
                                <p>{order.name}</p>
                                <p>{order.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='position'>
                    <p>Order total: {total}</p>
                    <button className='btn btn-check' onClick={onClickModal}>checkout</button>
                </div>
                {modal && (
                    <div className='modal'>
                        <div className='modal_box'>
                            {sendOrder.map(order => (
                                <div key={order.price} className='div'>
                                    <p>{order.name}</p>
                                    <p>{order.amount}</p>
                                    <p>{order.price}</p>
                                </div>
                            ))}
                            <div className='total'>
                                <p>Delivery: 150</p>
                                <span>Total {total + 150}</span>
                            </div>
                            <div className='div'>
                                <button onClick={onClickModal}>Cancel</button>
                                <button onClick={onClick}>Order</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dish;