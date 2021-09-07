import axios from "axios"
import { LOGOUT ,LOGOUT_ERROR} from "../types";


const logoutAction = (history) => async (dispatch) => {
    try {
        const {data} = await axios.get("/logout");
        dispatch({
            type : LOGOUT,
            payload : data,
        })
        history.push("/");
    } catch (error) {
        dispatch({
            type : LOGOUT_ERROR,
            payload : error.message,
        })
    }
}

export default logoutAction;