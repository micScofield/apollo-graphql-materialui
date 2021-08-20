import { useState } from "react";

import { TextField, makeStyles, Container, Button } from "@material-ui/core";
import { ArrowBack, Home } from "@material-ui/icons";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import Spinner from "./UI/Spinner";

const useStyles = makeStyles(() => ({
  root: {},
}));

function CreatePost({ history }) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creator, setCreator] = useState("");

  const CREATE_POST_QUERY = gql`
    mutation {
      createPost(postInput: { title: "${title}", content: "${content}", creator: "${creator}" }) {
        _id
        title
        creator
        createdAt
      }
    }
  `;

  const [createPostMutateFunction, { data, loading, error }] = useMutation(
    CREATE_POST_QUERY,
    {
      onCompleted: ({ createPost }) => {
        console.log(createPost);
        return !createPost ? (
          <h1>Post Couldn't be created !</h1>
        ) : (
          // history.push({
          //   pathname: '/',
          //   state: { createPost }
          // })
          history.push(`/${createPost._id}`)
        );
      },
      onError: (error) => console.log(error),
    }
  );

  if (loading) return <Spinner />;
  if (error) console.log(error);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim().length < 2) {
      alert("title too short");
    } else if (creator.trim().length < 2) {
      alert("creator too short");
    } else if (content.trim().length < 5) {
      alert("content too short");
    } else {
      // proceed with Query
      console.log(title, creator, content);
      createPostMutateFunction({ variables: { title, content, creator } });
      setTitle("");
      setCreator("");
      setContent("");
    }
  };

  return (
    <div>
      <Container>
        <div className="mt-2">
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => history.goBack()}
          >
            <ArrowBack /> Go Back
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => history.push("/")}
          >
            Go Home <Home />
          </Button>
        </div>

        <h1>Create a new post...</h1>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-secondary"
            label="title"
            autoFocus
            fullWidth
            variant="outlined"
            color="secondary"
            margin="normal"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            id="creator"
            label="creator"
            fullWidth
            variant="outlined"
            color="secondary"
            margin="normal"
            onChange={(e) => setCreator(e.target.value)}
          />
          <br />
          <TextField
            id="content"
            label="content"
            multiline
            fullWidth
            minRows="3"
            variant="outlined"
            color="secondary"
            margin="normal"
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => submitHandler(e)}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default CreatePost;
