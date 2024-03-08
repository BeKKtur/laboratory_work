import {useParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {ApiDish} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {fetchOneDish, updateDish} from "../../store/OrderThunk";
import AddNewDish from "../admin/AddNewDish";

const EditDish =  () => {
        const {id} = useParams();
        const dispatch = useAppDispatch();

        const fetchDish = useCallback(async () => {
            dispatch(fetchOneDish(id || ''));
        }, [dispatch, id]);

    useEffect(() => {
        void fetchDish()
    }, [fetchDish]);

    const onSubmit = async (apiDish: ApiDish) => {
        if (id) {
            await dispatch(updateDish({dishId: id, apiDish}));
        }
    };

    return (
        <div>
                <AddNewDish
                    isEdit
                    onSubmit={onSubmit}
                />
        </div>
    );
};

export default EditDish;