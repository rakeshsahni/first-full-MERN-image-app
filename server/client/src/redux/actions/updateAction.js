import axios from "axios";
import { UPDATE_ERROR, UPDATE_SUCCESS } from "../types";


const updateAction = (id,updateData,token,history) => async (dispatch) => {
    // dispatch({type : UPDATE_REQUEST});
    try {
        const {data} = await axios.patch(`/photos/update/${id}`,updateData,{
            headers : {Authorization : `Bearer ${token}`}
        });
        // console.log(data);
        dispatch({
            type : UPDATE_SUCCESS,
            payload : data, 
        })
        history.goBack();
    } catch (error) {
        dispatch({
            type : UPDATE_ERROR,
            payload : error.message,
        });
    }
}

export default updateAction;