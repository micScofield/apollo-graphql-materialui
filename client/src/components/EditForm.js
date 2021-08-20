import { Fragment, useState, useRef, useEffect } from "react";

import { TextField, makeStyles, Button } from "@material-ui/core";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import Spinner from "./UI/Spinner";

const useStyles = makeStyles(() => ({
  root: {},
}));

function Edit({ postId, title, creator, content, history }) {
//   const titleref = useRef();
//   const creatorref = useRef();
//   const contentref = useRef();
//   console.log(postId, title, creator, content);
  const [newtitle, setTitle] = useState("");
  const [newcontent, setContent] = useState("");
  const [newcreator, setCreator] = useState("");

  useEffect(() => {
    setTitle(title)
    setContent(content)
    setCreator(creator)
  }, [title, content, creator])

  const UPDATE_POST_QUERY = gql`
    mutation {
      updatePost(id: "${postId}", postInput: { title: "${newtitle}", content: "${newcontent}", creator: "${newcreator}" }) {
        _id
        title
        creator
        createdAt
      }
    }
  `;

  const [updatePostMutateFunction, { data, loading, error }] = useMutation(
    UPDATE_POST_QUERY,
    {
      onCompleted: ({ updatePost }) => {
        console.log(updatePost);
        return !updatePost ? (
          <h1>Post Couldn't be updated !</h1>
        ) : (
          history.push(`/${updatePost._id}`)
        );
      },
      onError: () => console.log(error),
    }
  );

  const classes = useStyles();

  if (loading) return <Spinner />;
  if (error) console.log(error);

  const submitHandler = (e) => {
    
    e.preventDefault();

    // updatePostMutateFunction({
    //   variables: {
    //     postId,
    //     title: titleref.current.value,
    //     creator: creatorref.current.value,
    //     content: contentref.current.value,
    //   },
    // });
    
    if (newtitle.trim().length === 0) {
      alert("title too short");
    } else if (newcreator.trim().length === 0) {
      alert("creator too short");
    } else if (newcontent.trim().length === 0) {
      alert("content too short");
    } else {
      updatePostMutateFunction({
        variables: {
          postId,
          title: newtitle,
          creator: newcreator,
          content: newcontent,
        },
      });
    }
  };
  return (
    <div>
      <Fragment>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-secondary"
            label="title"
            autoFocus
            // inputRef={titleref}
            defaultValue={title}
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
            // inputRef={creatorref}
            defaultValue={creator}
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
            // inputRef={contentref}
            defaultValue={content}
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
      </Fragment>
    </div>
  );
}

export default Edit;
