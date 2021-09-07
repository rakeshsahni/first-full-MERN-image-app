import axios from "axios"
import { SIGN_UP_FAIL, SIGN_UP_SUCCESS } from "../types";

const signupAction = (formData) => async (dispatch) => {
    try {
        const {data} = await axios.post("/signup",formData);
        dispatch({
            type : SIGN_UP_SUCCESS,
            payload : data,
        })
    } catch (error) {
        dispatch({
            type : SIGN_UP_FAIL,
            payload : error.message,
        })
    }
} 

export default signupAction;