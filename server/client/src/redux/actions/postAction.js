import axios from "axios";
import { POST_ERROR, POST_SUCCESS } from "../types";


const postAction = (sendData,token) => async (dispatch) => {
    // dispatch({type : POST_REQUEST});
    try {
        const {data} = await axios.post("/photos",sendData,{
            headers : {Authorization : `Bearer ${token}`}
        });
        // console.log(data);
        dispatch({
            type : POST_SUCCESS,
            payload : data, 
        })
    } catch (error) {
        dispatch({
            type : POST_ERROR,
            payload : error.message,
        });
    }
}

export default postAction;