const axios= require("axios")
const { GEN_TOKEN , ERROR_TOKEN} = require("../types")

const genTokenAction = () => async (dispatch) => {
    try {
        const {data} = await axios.post("/gentoken");
        // console.log("genTokenAction");
        // console.log(data.access_token);
        dispatch({
            type : GEN_TOKEN,
            payload : data,
        })
    } catch (error) {
        dispatch({
            type : ERROR_TOKEN,
            payload : error.message,
        })
    }
}

export default genTokenAction;