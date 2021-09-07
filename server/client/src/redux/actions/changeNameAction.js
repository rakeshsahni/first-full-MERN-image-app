import axios from "axios"
import { CHANGE_NAME, CHANGE_NAME_ERROR } from "../types"

const changeNameAction = (name,token) => async (dispatch) => {
    try {
        // console.log(name);
        const {data} = await axios.patch("/change_name",{name},{
            headers : {Authorization : `Bearer ${token}`}
        });
        dispatch({
            type : CHANGE_NAME,
            payload : data,
        })
    } catch (error) {
        dispatch({
            type : CHANGE_NAME_ERROR,
            payload : error.message,
        })
    }
}

export default changeNameAction;