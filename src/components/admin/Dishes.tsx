import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {deleteDish, fetchDishes} from "../../store/OrderThunk";
import {orderTotal} from "../../store/OrderSlice";
import {Link} from "react-router-dom";

const Dishes = () => {

    const dishes = useAppSelector(state => state.order.cardDishes);
    const dispatch = useAppDispatch();

    const removeDish = async (id:string) => {
        await dispatch(deleteDish(id));
        await dispatch(fetchDishes());
    };

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    return (
        <>
            <div>
                <div>
                    <div className='div dishes'>
                        <h1>Dishes</h1>
                        <Link to='new-dish' className='button' >Add new dish</Link>
                    </div>
                </div>
            </div>
            {dishes.map(dish => (
                <div className='cards_blocks' key={dish.id}>
                    <div className='cards_block' onClick={() => dispatch(orderTotal(dish.price))}>
                        <img
                            src={dish.img}
                            alt="photo" className='image'/>
                        <div>
                        <p>{dish.name}</p>
                            <p>{dish.price}</p>
                        </div>
                        <div>
                            <Link to={'/edit-dish/' + dish.id} className="button" >Edit</Link>
                            <button onClick={() =>removeDish(dish.id)} className='button'>
                                delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Dishes;