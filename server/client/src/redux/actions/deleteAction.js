import axios from "axios";

const { DELETE_ERROR, DELETE_SUCCESS } = require("../types")


const deleteAction = (id,token) => async (dispatch) => {
    try {
        const {data} = await axios.delete(`/photos/delete/${id}`,{
            headers : {Authorization : `Bearer ${token}`}
        });
        // console.log(data);
        dispatch({
            type : DELETE_SUCCESS,
            payload : data,
        })
    } catch (error) {
        dispatch({
            type : DELETE_ERROR,
            payload : error.message,
        })
    }
}

export default deleteAction;