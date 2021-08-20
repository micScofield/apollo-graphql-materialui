import { useState } from 'react'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from 'react-moment'
import useStyles from "../util/cardStyles";

function FeedItem({ post, history }) {
    console.log(post)
    const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Title:{" "}{post.title}
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            Created At: <Moment format="YYYY-MM-DD HH:mm">{post.createdAt}</Moment>
          </Typography>

          <Typography
            className={classes.subtitle}
            color="textSecondary"
            gutterBottom
          >
            Created By:{" "}{post.creator}
          </Typography>

        </CardContent>

        <CardActions>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={() => history.push(`/${post._id}`)}
          >
            View Full Post
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default FeedItem;
