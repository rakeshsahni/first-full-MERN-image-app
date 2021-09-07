import axios from "axios"

import {COMMENT_DATA_SUCCESS,COMMENT_DATA_FAIL} from "./../types";
const commentDataAction = (id,token) => async(dispatch) => {
    try {
        // console.log("idtoken",id,token);
        const {data} = await axios.get(`/commentdata/${id}`,{
            headers : {Authorization : `Bearer ${token}`}
        })
        // console.log("CD");
        // console.log(data);
        // console.log("CD");
        dispatch({
            type : COMMENT_DATA_SUCCESS,
            payload : data,
        })
    } catch (error) {
        dispatch({
            type : COMMENT_DATA_FAIL,
            payload : error.message,
        })
    }
}

export default commentDataAction;