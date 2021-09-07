import {
  COMMENT_DATA_FAIL,
  COMMENT_DATA_SUCCESS,
  COMMENT_FAIL,
  COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_ERROR,
  DELETE_SUCCESS,
  GET_ERROR,
  GET_REQUEST,
  GET_SUCCESS,
  LIKE_ERROR,
  LIKE_SUCCESS,
  POST_ERROR,
  POST_SUCCESS,
  UPDATE_ERROR,
  UPDATE_SUCCESS,
} from "./../types";
const initval = {
  loading: false,
  getData: [],
  error: "",
  updateData: {},
  postMessage : "Uploading...",
  commentData : {},
  commentmsg : "",
};
const getReducer = (state = initval, action) => {
  switch (action.type) {
    case GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error : "",
        getData: action.payload,
      };
    case GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        getData: state.getData.map((dt) =>
          dt._id === action.payload._id ? action.payload : dt
        ),
      };
    case LIKE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        getData: state.getData.filter((dt) =>
          dt._id !== action.payload._id
        ),
      };
    case DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_SUCCESS:
      return{
        ...state,
        loading : false,
        postMessage : action.payload.message,// ? action.payload.message : "", 
        getData : action.payload.newPostData ? [...state.getData,action.payload.newPostData] : [...state.getData],
      }
    case POST_ERROR:
      return{
        ...state,
        loading : false,
        postMessage : action.payload,
      }
    case UPDATE_SUCCESS:
      return{
        ...state,
        loading : false,
        getData : state.getData.map(dt => dt._id !== action.payload._id ? dt : action.payload),
        updateData : action.payload,
      }
    case UPDATE_ERROR:
      return{
        ...state,
        loading : false,
        error : action.payload,
      }
    case COMMENT_DATA_SUCCESS:
      return {
        ...state,
        commentData : action.payload.sdt,
      }
    case COMMENT_DATA_FAIL:
      return {
        ...state,
        error : action.payload,
      }
      case COMMENT_SUCCESS:
        return {
          ...state,
          loading : false,
          commentData : action.payload.newComment,
          // commentData : state.commentData.jsonComment.map(cm => cm.id === action.payload.),
          commentmsg : action.payload.message,
        }
      case COMMENT_FAIL:
        return{
          ...state,
          loading : false,
          commentemsg : action.payload,
        }
      case DELETE_COMMENT_SUCCESS:
        return {
          ...state,
          loading : false,
          commentData : action.payload.newComment,
          // getData : state.getData.map(dt => dt._id !== action.payload.newComment._id ? dt : action.payload.newComment),
          commentemsg : action.payload.message,
        }
        case DELETE_COMMENT_FAIL :
          return {
            ...state,
            commentemsg : action.payload,
          }
    default:
      return state;
  }
};

export default getReducer;