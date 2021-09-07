import axios from "axios"
import { COMMENT_FAIL, COMMENT_SUCCESS } from "../types"

const writeCommentAction = (id,token,comment) => async (dispatch) => {
    try {
        const {data} = await axios.patch("/writecomment",{id,comment},{
            headers : {Authorization : `Bearer ${token}`}
        })
        dispatch({
            type : COMMENT_SUCCESS,
            payload : data,
        })
    } catch (error) {
        dispatch({
            type : COMMENT_FAIL,
            payload : error.message,
        })
    }
}

export default writeCommentAction;