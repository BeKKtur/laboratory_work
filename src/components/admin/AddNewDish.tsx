import {Link} from "react-router-dom";
import {useState} from "react";
import {ApiDish, DishMutation} from "../../types";
import * as React from "react";
import {useAppDispatch} from "../../app/hooks";
import {addNewDish} from "../../store/OrderThunk";

interface Props {
    onSubmit: (dish:ApiDish) => void;
    extendingDish?: DishMutation;
    isEdit?: boolean;
}

const initialState:DishMutation = {
    name: '',
    img: '',
    price: '',
}


const AddNewDish:React.FC<Props> = ({
    onSubmit,
    extendingDish = initialState,
    isEdit = false,}) => {
    const [newDish, setNewDish] = useState<DishMutation>(extendingDish)

    const dispatch = useAppDispatch()

    const onDishSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            onSubmit({
                ...newDish,
                price: parseFloat(newDish.price)
            });
        } else {
            const addDish = {
                ...newDish,
                price: parseFloat(newDish.price)
            }
            dispatch(addNewDish(addDish));
        }
    };

    const onChange = (e:React.ChangeEvent <HTMLInputElement>) => {
        e.preventDefault();
        setNewDish(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };



    return (
        <div className=''>
            <form className='form' onSubmit={onDishSubmit}>
                <h1>{isEdit? 'Edit dish' : 'Add new dish'}</h1>
                <div>
                    <input
                        type="text"
                        name='name'
                        id='name'
                        required
                        placeholder='Name'
                        value={newDish.name}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input
                        type='number'
                        name='price'
                        id='price'
                        placeholder='price'
                        value={newDish.price}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name='img'
                        id='img'
                        placeholder='image'
                        value={newDish.img}
                        onChange={onChange}
                    />
                </div>
                <div className='div'>
                <button className='button'>{isEdit? 'edit' : 'add'}</button>
                <Link to='/admin/dishes' className='button' >Back to dishes</Link>
                </div>
            </form>
        </div>
    );
};

export default AddNewDish;