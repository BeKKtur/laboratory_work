import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {ApiDish} from "../../types";
import {addNewDish} from "../../store/OrderThunk";
import AddNewDish from "../admin/AddNewDish";


const CreateDish = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (apiDish: ApiDish) => {
        await dispatch(addNewDish(apiDish));
        navigate('/');
    }

    return (
        <div>
            <AddNewDish onSubmit={onSubmit}/>
        </div>
    );
};

export default CreateDish;