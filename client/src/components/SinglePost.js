import { Fragment, useState } from "react";
import { gql } from "apollo-boost";
import { Query, useMutation } from "react-apollo";
import clsx from "clsx";
import { Card, Collapse, IconButton, Container } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import useStyles from "../util/cardStyles";
import Spinner from "./UI/Spinner";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DeleteOutline, Edit, Home } from "@material-ui/icons";

function SinglePost({ match, history }) {
  const postId = match.params.postId;
  // Accordion
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const FETCH_POST_QUERY = gql`
    query {
      post(id: "${postId}") {
        _id
        title
        content
        creator
        createdAt
        updatedAt
      }
    }
  `;
  const classes = useStyles();

  const DELETE_POST_QUERY = gql`
    mutation {
      deletePost(id: "${postId}")
    }
    `;

  const [deletePostMutateFunction, { data, loading, error }] = useMutation(
    DELETE_POST_QUERY,
    {
      onCompleted: () => history.push("/"),
      onError: () => {
        console.log(error);
        return history.push("/");
      },
    }
  );

  if (loading) return <Spinner />;
  if (error) console.log(error);

  const deleteHandler = (postId) => {
    let answer = window.confirm('This can\'t be undone. Continue ?')
    if (answer) {
      deletePostMutateFunction();
    }
  };

  return (
    <Container>
      <div className="mt-2 mb-1">
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => history.goBack()}
        >
          <ArrowBackIcon /> Go Back
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          style={{ marginLeft: "1rem" }}
          onClick={() => history.push("/")}
        >
          Go Home <Home />
        </Button>
      </div>

      <Query query={FETCH_POST_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h1>...</h1>;
          if (error) console.log(error);
          console.log(data);
          const { _id, creator, content, title, createdAt, updatedAt } =
            data.post;
          return !data ? (
            <h1>Post Cannot be found</h1>
          ) : (
            <Fragment>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textPrimary"
                    gutterBottom
                  >
                    Title: {title}
                  </Typography>

                  <Typography
                    className={classes.subtitle}
                    color="textSecondary"
                    gutterBottom
                  >
                    Created By: {creator}
                  </Typography>

                  <Typography variant="h6">
                    Created At:{" "}
                    <Moment format="YYYY-MM-DD HH:mm">{createdAt}</Moment>
                  </Typography>

                  <Typography variant="h6">
                    Last Updated At:{" "}
                    <Moment format="YYYY-MM-DD HH:mm">{updatedAt}</Moment>
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={() => history.push(`/edit/${_id}`)}
                  >
                    Edit <Edit />
                  </Button>

                  <Button
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    onClick={(_id) => deleteHandler(_id)}
                  >
                    Delete <DeleteOutline />
                  </Button>

                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Show Content"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Content:</Typography>
                    <Typography paragraph>{content}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Fragment>
          );
        }}
      </Query>
    </Container>
  );
}

export default SinglePost;
