import axios from "axios";
import { GET_ERROR, GET_REQUEST, GET_SUCCESS } from "../types";


const getAction = () => async (dispatch) => {
    dispatch({type : GET_REQUEST});
    try {
        const {data} = await axios.get("/photos");
        // console.log(data);
        dispatch({
            type : GET_SUCCESS,
            payload : data, 
        })
    } catch (error) {
        dispatch({
            type : GET_ERROR,
            payload : error.message,
        });
    }
}

export default getAction;