import axios from "axios"
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../types";

const loginAction = (formData,history) => async (dispatch) => {
    try {
        const {data} = await axios.post("/login",formData);
        // console.log(data.message);
        dispatch({
            type : LOGIN_SUCCESS,
            payload : data,
        })
        if(data.message === "login successfully..."){
            history.push("/");
            
        }
    } catch (error) {
        dispatch({
            type : LOGIN_FAIL,
            payload : error.message,
        })
    }
} 

export default loginAction;