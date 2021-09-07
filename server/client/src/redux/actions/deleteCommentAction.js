import axios from "axios"
import { DELETE_COMMENT_FAIL, DELETE_COMMENT_SUCCESS } from "../types"

const deleteCommentAction = (id,token) => async (dispatch) => {
    try {
        const {data} = await axios.patch("/deletecomment",{id},{
            headers : {Authorization : `Bearer ${token}`}
        })
        dispatch({
            type : DELETE_COMMENT_SUCCESS,
            payload : data,
        })
    } catch (error) {
        dispatch({
            type : DELETE_COMMENT_FAIL,
            payload : error.message,
        })
    }
}

export default deleteCommentAction;