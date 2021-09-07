import {
  Box,
  Container,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Delete, Send } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import commentDataAction from "./redux/actions/commentDataAction";
import deleteCommentAction from "./redux/actions/deleteCommentAction";
import writeCommentAction from "./redux/actions/writeCommentAction";
import moment from "moment";
import { deepPurple, purple, yellow } from "@material-ui/core/colors";
import F04page from "./F04page";
const useStyle = makeStyles((them) => ({
  paper: {
    padding: them.spacing(2),
    margin: them.spacing(1),
  },
  paperimg: {
    padding: them.spacing(2),
    margin: them.spacing(2),
    display: "flex",
    // padding : them.spacing(2),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: deepPurple[100],
  },
  fiximage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  commentbox: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  deginelikecomment: {
    margin: them.spacing(2),
  },
  commentpaperother: {
    width: "70%",
    background: purple[100],
    padding: them.spacing(2),
    margin: them.spacing(2),
  },
  commentpaperown: {
    width: "80%",
    background: yellow[200],
    padding: them.spacing(2),
    margin: them.spacing(2),
  },
  commenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deginetitle : {
    margin : them.spacing(2),
  }
}));
function Comment({ match }) {
  const id = match.params.id;
  // console.log(id);
  const dispatch = useDispatch();
  const { token, loger_id } = useSelector((state) => state.genTokenReducer);
  const [writecomment, setWritecomment] = useState("");
  const { commentData } = useSelector((state) => state.getReducer);
  // console.log("token", id, token);
  useEffect(() => {
    dispatch(commentDataAction(id, token));
  }, [dispatch, id, token]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(writeCommentAction(id, token, writecomment));
    setWritecomment("");
  };
  // console.log("commentData");
  // console.log(commentData);
  const classes = useStyle();
  return localStorage.getItem("isLogin") && commentData.jsonComment ? (
    <Container>
      <Toolbar />
      <Paper className={classes.paperimg}>
      <Typography
          variant="h5"
          align="center"
          className={classes.deginetitle}
        >
          <strong>Title of this post :</strong>
          {commentData.title}
        </Typography>
        <img
          height="100%"
          width="100%"
          src={commentData.photo}
          alt={commentData.title}
        />
        <Box className={classes.deginelikecomment}>
          <Typography variant="h6">
            Total No. of 👍
            <strong>{commentData.likeCount.length}</strong>
          </Typography>
          <Typography variant="h6">
            Total No. of ✍️
            <strong>{commentData.jsonComment.length}</strong>
          </Typography>
          <Typography variant="subtitle1" align="center">
            Image uploded ⌚ {moment(commentData.createdAt).fromNow()}
          </Typography>
        </Box>
        
        <Typography
          variant="subtitle1"
          align="justify"
          className={classes.deginedescription}
        >
          <strong>Description of this post :</strong>
          {commentData.description}
        </Typography>
      </Paper>
      <Paper className={classes.paper}>
          <Box>
            <form onSubmit={handleSubmit} className={classes.commentbox}>
              <TextField
                label="Write Comment"
                required
                multiline
                rowsMax={5}
                type="text"
                name="writecomment"
                fullWidth
                value={writecomment}
                onChange={(e) => setWritecomment(e.target.value)}
              />

              <IconButton type="submit" color="primary" name="submit">
                <Send />
              </IconButton>
            </form>
          </Box>
        </Paper>
      <Container>
        {commentData.jsonComment.map((cm, i) => (
          <Paper
            component={Box}
            className={
              cm.commentId !== loger_id
                ? classes.commentpaperother
                : classes.commentpaperown
            }
            key={i}
          >
            <Box className={classes.commenter}>
              <Typography variant="subtitle2" color="secondary">
                ✍️
                <strong style={{ color: purple[900] }}>{cm.commentName}</strong>
              </Typography>

              {cm.commentId === loger_id && (
                <IconButton
                  color="primary"
                  onClick={() => {
                    dispatch(deleteCommentAction(id, token));
                  }}
                >
                  <Delete />
                </IconButton>
              )}
            </Box>
            <Typography variant="subtitle1" align="center">
              {cm.comment}
            </Typography>
          </Paper>
        ))}
        
      </Container>
    </Container>
  ) : (
    <F04page />
  );
}

export default Comment;
