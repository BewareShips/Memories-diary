import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./styles";
import {
  deletePost,
  likePost,
  setCurrentId,
} from "../../../store/actions/posts";
import ConfirmDialog from "../../utils/ConfirnDialog";

const noPictute =
  "https://javasea.ru/uploads/posts/2018-07/1531936259_kosmicheskiy-peyzazh.jpg";
// "https://i.pinimg.com/originals/a7/97/68/a79768ac291cbbf256d6fc66b8a51986.jpg";

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [confirmOpen, setConfirmOpen] = useState(false);

  

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile || noPictute}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            dispatch(setCurrentId(post._id));
          }}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags && post.tags.map((tag) => `# ${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title && post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message && post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() =>  dispatch(likePost(post._id))}
        >
          <ThumbUpAltIcon fontSize="small" />
          Like {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => setConfirmOpen(true)}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
        <ConfirmDialog
          title="Delete Post?"
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={() => dispatch(deletePost(post._id))}
        >
          Are you sure you want to delete this post?
        </ConfirmDialog>
      </CardActions>
    </Card>
  );
};

export default Post;
