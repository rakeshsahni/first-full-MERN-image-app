import axios from "axios";
import { LIKE_ERROR, LIKE_SUCCESS } from "../types";

const likeAction = (id, token) => async (dispatch) => {
  // dispatch({type : LIKE_REQUEST});
  try {
    
    const { data } = await axios.patch(
      `/photos/like/${id}`,
      "patch method me second arg necessary",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(data);
    dispatch({
      type: LIKE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIKE_ERROR,
      payload: error.message,
    });
    // console.error(error);
  }
};

export default likeAction;
