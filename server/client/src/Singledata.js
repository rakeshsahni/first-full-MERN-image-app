import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import { Comment, Delete, Edit, MoreHoriz, ThumbUpAltOutlined, ThumbUpAltSharp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import likeAction from "./redux/actions/likeAction";
import { useDispatch, useSelector } from "react-redux";
import deleteAction from "./redux/actions/deleteAction";
import moment from "moment";
import { blue } from "@material-ui/core/colors";

function Singledata({ dt }) {
  const dispatch = useDispatch();
  const {loger_id,token} = useSelector(state => state.genTokenReducer);
  // console.log("singleData");
  // console.log(token,id);
  // console.log("singleData");
  const index = dt.likeCount.indexOf(loger_id);
  
  return (
    <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
      <Card component={Box} m={2}>
        <CardHeader
          avatar={<Avatar>{dt.name.charAt(0)}</Avatar>}
          action={
            <IconButton
            disabled={dt.owner !== loger_id || !localStorage.getItem("isLogin")}
              color="primary"
              component={Link}
              to={`/add/${dt._id}`}
            >
              <Edit />
            </IconButton>
          }
          title={`By : ${dt.name}`}
          subheader={moment(dt.createdAt).fromNow()}
        />
        <CardMedia
          style={{
            height: "200px",
          }}
          image={dt.photo}
          title={dt.title}
        />
        <CardContent>
          <Typography 
            color="primary"
            align="center"
            variant="h6"
            noWrap={true}
            style={{color : blue[500]}}
          >
            <strong>{dt.title}</strong>
          </Typography>
          <Typography 
            noWrap={true}
          >
             <IconButton
             disabled={!localStorage.getItem("isLogin")}
              component={Link}
              color="secondary" 
              to={`/commentpage/${dt._id}`}
              edge="start"
            >
              <MoreHoriz/>
            </IconButton>
            {dt.description}
          </Typography>
         
        </CardContent>
        <CardActions style={{ justifyContent: "space-around" }}>
          <IconButton
            disabled={!localStorage.getItem("isLogin")}
            color="primary"
            onClick={() => {
              dispatch(likeAction(dt._id,token));
            }}
          >
            {/* <Like/> */}
            { index === -1 ? <ThumbUpAltOutlined/> : <ThumbUpAltSharp/>}{dt.likeCount.length}
          </IconButton>
          <Button
            disabled={!localStorage.getItem("isLogin")}
            component={Link}
            to={`/commentpage/${dt._id}`}
            startIcon={<Comment/>}
            color="primary"
          >
            {dt.jsonComment.length}
          </Button>
          <IconButton
            disabled={dt.owner !== loger_id || !localStorage.getItem("isLogin")}
            color="secondary"
            onClick={() => {
              dispatch(deleteAction(dt._id,token));
          }}
          >
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Singledata;
